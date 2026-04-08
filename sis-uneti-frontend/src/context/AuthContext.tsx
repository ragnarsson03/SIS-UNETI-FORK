import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth.service';

// Tipos base para el usuario y roles válidos (Célula 01)
export type Role = 'ESTUDIANTE' | 'DOCENTE' | 'COORDINADOR' | 'SECRETARIO' | 'ADMINISTRADOR' | 'AUDITOR' | null;

interface UserData {
  cedula: string;
  nombre?: string;
  rol: Role;
  token?: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

// Inicialización del Contexto con valores nulos
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Diccionario de Persistencia para evitar errores tipográficos (bug del guion en consola)
const STORAGE_KEYS = {
  TOKEN: 'sis_uneti_token',
  ROL: 'sis_uneti_rol',
  CEDULA: 'sis_uneti_cedula'
};

// Inicializador síncrono de estado para evitar el efecto 'Flash'
const getInitialState = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const rawRole = localStorage.getItem(STORAGE_KEYS.ROL);
  const cedula = localStorage.getItem(STORAGE_KEYS.CEDULA);

  // ⚠️ CRÍTICO: Solo devolvemos el usuario si el TOKEN y el ROL existen
  if (token && rawRole) {
    return {
      token,
      rol: rawRole.toUpperCase().trim() as Role,
      cedula: cedula || ''
    };
  }
  return null;
};

// Hook personalizado para usar el contexto fácilmente en cualquier componente
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}

// Proveedor Global (Va en el root, envolviendo App)
export function AuthProvider({ children }: { children: ReactNode }) {
  const initialState = getInitialState();
  const [user, setUser] = useState<UserData | null>(initialState);
  
  // Si ya tenemos datos síncronos, no mostramos el loader inicial (evita el Flash)
  const [isInitializing, setIsInitializing] = useState(() => !initialState);

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.ROL);
    localStorage.removeItem(STORAGE_KEYS.CEDULA);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setIsInitializing(false);
  };

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.ROL, userData.rol || '');
    localStorage.setItem(STORAGE_KEYS.CEDULA, userData.cedula || '');
    localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token || '');
  };

  useEffect(() => {
    const verifySession = async () => {
      // Si no tenemos rol válido o sesión inicial, cancelamos verificación
      if (!user?.rol) {
        setIsInitializing(false);
        return;
      }

      try {
        // Validación asíncrona del Perfil/Token contra el Backend
        const freshUserData = await authService.getProfile(user.rol, user.cedula);
        
        // Mezclamos datos (nombre, etc) manteniendo el token original
        setUser(prev => prev ? { ...prev, ...freshUserData } : null);
      } catch (error: any) {
        // Determinar si es un error Axios/Fetch con Status y si es 401/403
        const status = error?.response?.status || error?.status;
        const isAuthError = status === 401 || status === 403;

        if (isAuthError) {
          console.warn('⚠️ [Session Monitor] Token inválido o expirado. Expulsando usuario.', error.message);
          logout();
        } else {
          console.warn('⚠️ [Servidor No Disponible] Fallo de red detectado (Ej: Redis/DB apagados). Manteniendo sesión local por resiliencia.', error.message);
          // ⚠️ No invocamos logout(). Permitimos que el usuario siga usando la app en modo local/offline.
        }
      } finally {
        setIsInitializing(false);
      }
    };

    verifySession();
  }, []); // Solo al montar la aplicación

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user, 
      isInitializing 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
