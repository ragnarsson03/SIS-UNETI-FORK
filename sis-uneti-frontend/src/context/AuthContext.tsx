import { createContext, useContext, useState, ReactNode } from 'react';

// Tipos base para el usuario y roles válidos (Célula 01)
export type Role = 'ESTUDIANTE' | 'DOCENTE' | 'COORDINADOR' | 'SECRETARIA' | 'ADMINISTRADOR' | null;

interface UserData {
  cedula: string;
  rol: Role;
  token?: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
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

  const login = (userData: UserData) => {
    setUser(userData);
    // TODO: En producción, deberíamos guardar el JWT en localStorage seguro o HttpOnly Cookies.
    localStorage.setItem('sis_uneti_rol', userData.rol || '');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sis_uneti_rol');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
