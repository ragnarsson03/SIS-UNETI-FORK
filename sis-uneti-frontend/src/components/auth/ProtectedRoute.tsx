import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, Role } from '../../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Role[];
  redirectPath?: string;
}

export default function ProtectedRoute({ allowedRoles, redirectPath = '/auth/login' }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  
  // Como estamos en fase de pruebas (y el F5 / Hot Reload de Vite purga el estado volátil del Context), 
  // permitiremos un pequeño atajo leyendo el localStorage para que no cierre sesión violentamente al recargar la página:
  const savedRole = localStorage.getItem('sis_uneti_rol') as Role;
  const currentRole = user?.rol || savedRole;
  
  // 1. ¿Está logueado o tiene rastro mágico temporal? Si no, ¡Fuera! De regreso al login.
  if (!isAuthenticated && !savedRole) {
    return <Navigate to={redirectPath} replace />;
  }

  // 2. ¿Su rol es válido para la ruta a la que intenta ingresar? Si es un estudiante tratando de entrar a Admin:
  if (!allowedRoles.includes(currentRole)) {
    // Redigirigimos forzosamente por intruso. Opcional: Mandarlo a un 403 Forbidden.
    return <Navigate to="/auth/login" replace />;
  }

  // Si sobrevive las 2 barreras, renderizamos al hijo (El Outlet es React Router diciendo "Dibuja lo que esté anidado dentro").
  return <Outlet />;
}
