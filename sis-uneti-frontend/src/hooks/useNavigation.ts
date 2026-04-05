import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNavigationByRole, NavItemType } from '../config/navigation';

export const useNavigation = () => {
  // Extraemos el rol y el estado de carga desde el estado global del usuario (AuthContext)
  const { user, isInitializing } = useAuth();

  // Memoizamos el arreglo de rutas para evitar re-calculos inter-renders en el layout
  const navItems = useMemo<NavItemType[]>(() => {
    // Si la sesión de F5 aún se está verificando devolvemos seguro vacío sin forzar errores.
    if (isInitializing) return [];

    return getNavigationByRole(user?.rol ?? undefined);
  }, [user?.rol, isInitializing]);

  // Log de depuración temporal para monitorear qué devuelve AuthContext
  console.log("Rol actual:", user?.rol);

  return { 
    navItems 
  };
};
