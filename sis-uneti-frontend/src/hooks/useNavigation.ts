import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNavigationByRole, NavItemType } from '../config/navigation';

export const useNavigation = () => {
  // Extraemos el rol y el estado de carga desde el estado global del usuario (AuthContext)
  const { user, isInitializing } = useAuth();

  // Memoizamos el arreglo de rutas para evitar re-calculos inter-renders en el layout
  const navItems = useMemo<NavItemType[]>(() => {
    if (isInitializing) return [];
    
    // Si el rol es nulo o INVITADO, devolvemos array vacío con advertencia clara
    if (!user?.rol || user.rol === ('INVITADO' as any)) {
      console.warn("🛑 Acceso denegado: Rol no autorizado o sesión anónima.");
      return [];
    }

    return getNavigationByRole(user.rol);
  }, [user?.rol, isInitializing]);

  console.log(`[DEBUG NAV] Estado: ${isInitializing ? 'Cargando' : 'Listo'} | Rol: "${user?.rol}" | Items: ${navItems.length}`);

  return { navItems };
};
