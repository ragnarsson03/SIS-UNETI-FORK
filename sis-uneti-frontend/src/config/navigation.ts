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

// Objeto de configuración con llaves en MAYÚSCULAS para Match exacto con AuthContext Role
export const NAVIGATION_CONFIG: Record<string, NavItemType[]> = {
  ADMINISTRADOR: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/usuarios', label: 'Gestión de Usuarios', icon: Users },
    { to: '/admin/pnf', label: 'Gestión de PNF', icon: GraduationCap },
    { to: '/admin/auditoria', label: 'Auditoría', icon: History },
    { to: '/admin/seguridad', label: 'Roles y Permisos', icon: ShieldCheck },
  ],
  COORDINADOR: [
    { to: '/coordinador/dashboard', label: 'PNF', icon: GraduationCap },
  ],
  AUDITOR: [
    { to: '/auditor/dashboard', label: 'Auditoría', icon: History },
  ],
  ESTUDIANTE: [
    { to: '/estudiante/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/estudiante/notas', label: 'Mis Notas', icon: GraduationCap },
    { to: '/estudiante/horarios', label: 'Horarios', icon: History },
  ],
  DOCENTE: [
    { to: '/docente/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ],
};

/**
 * Devuelve un arreglo con los items de navegación dinámicos según el rol.
 */
export const getNavigationByRole = (role?: string | null): NavItemType[] => {
  if (!role) return [];

  // Normalizamos a MAYÚSCULAS para coincidir con la matriz de configuración
  const normalizedRole = role.toUpperCase().trim();

  // Búsqueda directa por llave tipada
  if (NAVIGATION_CONFIG[normalizedRole]) {
    return NAVIGATION_CONFIG[normalizedRole];
  }

  // Fallback para administradores con variaciones de string (ej: "ADMIN")
  if (normalizedRole.includes('ADMIN')) return NAVIGATION_CONFIG['ADMINISTRADOR'];

  return [];
};