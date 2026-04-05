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
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sis_uneti_rol');
    localStorage.removeItem('sis_uneti_cedula');
  };

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('sis_uneti_rol', userData.rol || '');
    localStorage.setItem('sis_uneti_cedula', userData.cedula || '');
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedRole = localStorage.getItem('sis_uneti_rol');
        const savedCedula = localStorage.getItem('sis_uneti_cedula');

        // Si no hay rol guardado, simplemente terminamos sin tocar nada
        // (no es un error, solo no hay sesión previa)
        if (!savedRole) {
          return;
        }

        // Hay rol guardado: pedimos perfil al servicio (mock o API real)
        const userData = await authService.getProfile(savedRole, savedCedula || undefined);
        setUser(userData);
      } catch (error) {
        // Solo llegamos aquí si el servicio lanzó un error real (401, red caída, etc.)
        console.warn('Sesión inválida o expirada, limpiando...', error);
        // Limpiamos manualmente sin llamar logout() para evitar re-renders en cadena
        localStorage.removeItem('sis_uneti_rol');
        localStorage.removeItem('sis_uneti_cedula');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}
