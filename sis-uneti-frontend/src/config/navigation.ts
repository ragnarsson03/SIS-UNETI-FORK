import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  GraduationCap,
  History,
  LucideIcon,
} from 'lucide-react';

export interface NavItemType {
  to: string;
  label: string;
  icon: LucideIcon;
}

// Objeto de configuración que asocia los roles a sus respectivas rutas.
export const NAVIGATION_CONFIG: Record<string, NavItemType[]> = {
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/usuarios', label: 'Gestión de Usuarios', icon: Users },
    { to: '/admin/seguridad', label: 'Roles y Permisos', icon: ShieldCheck },
  ],
  coordinador: [
    { to: '/coordinador/dashboard', label: 'PNF', icon: GraduationCap },
  ],
  auditor: [
    { to: '/auditor/dashboard', label: 'Auditoría', icon: History },
  ],
  estudiante: [
    { to: '/estudiante/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/estudiante/notas', label: 'Mis Notas', icon: GraduationCap },
    { to: '/estudiante/horarios', label: 'Horarios', icon: History },
  ],
  docente: [
    { to: '/docente/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ],
};

/**
 * Devuelve un arreglo con los items de navegación dinámicos según el rol.
 */
export const getNavigationByRole = (role?: string | null): NavItemType[] => {
  if (!role) return [];

  // Normalizamos a minúsculas y sin espacios
  const normalizedRole = role.toLowerCase().trim();

  // Búsqueda flexible: Cubre "ADMIN", "Administrador", "SuperAdmin", etc.
  if (normalizedRole.includes('admin')) return NAVIGATION_CONFIG['admin'];
  if (normalizedRole.includes('coordinador')) return NAVIGATION_CONFIG['coordinador'];
  if (normalizedRole.includes('auditor')) return NAVIGATION_CONFIG['auditor'];
  if (normalizedRole.includes('estudiante')) return NAVIGATION_CONFIG['estudiante'];
  if (normalizedRole.includes('docente')) return NAVIGATION_CONFIG['docente'];

  // Búsqueda por coincidencia exacta si se agregan roles no estandarizados
  if (NAVIGATION_CONFIG[normalizedRole]) {
    return NAVIGATION_CONFIG[normalizedRole];
  }

  // Fallback seguro: Si no coincide ninguno, se retorna un arreglo vacío (o podrías tener un menú base)
  return [];
};