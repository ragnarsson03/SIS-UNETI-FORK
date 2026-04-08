import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Settings,
  LogOut,
  Search,
  Bell,
  Moon,
  UserCircle2,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/hooks/useNavigation';

// ─────────────────────────────────────────────────────────────────────────────
// Clases reutilizables del sidebar
// ─────────────────────────────────────────────────────────────────────────────
const navLinkBase =
  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors';
const navLinkInactive =
  `${navLinkBase} text-slate-600 hover:bg-slate-50 font-medium`;
const navLinkActive =
  `${navLinkBase} bg-blue-50 text-primary font-semibold`;

// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const { user, logout, isInitializing } = useAuth();
  const navigate = useNavigate();
  const { navItems } = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /** Logout + redirect — limpia todo el estado antes de redirigir (seguridad). */
  const handleLogout = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Pantalla de Intercepción: Evita que el usuario vea menús colapsados o el "Estudiante" por defecto en el re-render (F5)
  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface pb-20">
        <div className="flex flex-col items-center">
          <svg className="h-16 w-auto mb-6 animate-pulse" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="30" fontSize="32" fontWeight="900" fill="currentColor" className="text-primary-dark font-headline tracking-tighter">
              UNETI
            </text>
            <circle cx="102" cy="12" r="6" fill="currentColor" className="text-primary" />
          </svg>
          <div className="w-6 h-6 relative mb-3">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Verificando seguridad de sesión...</p>
        </div>
      </div>
    );
  }

  const displayName = user?.cedula ?? 'Usuario';
  const role = user?.rol ?? '';

  return (
    <div className="flex h-screen bg-surface text-on-surface overflow-hidden relative">

      {/* ══════════════════════════════════════════════
          OVERLAY (Solo móvil)
      ══════════════════════════════════════════════ */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ══════════════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════════════ */}
      <aside className={`
        h-full w-64 shrink-0 fixed lg:relative left-0 top-0 z-50 bg-white border-r border-outline flex flex-col py-6 px-4
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Logo / Marca Oficial UNETI */}
        <div className="px-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/logo_uneti_fondo_blanco.jpeg"
              alt="UNETI Logo"
              className="h-10 w-auto rounded-lg object-contain"
            />
            <span className="text-xl font-black text-primary-dark tracking-tighter">
              UNETI
            </span>
          </div>
          <button
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto">

          {/* Sección: Menú Principal */}
          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Menú Principal
            </p>
            {navItems.length === 0 && (
              <p className="px-4 py-2 text-xs text-slate-400">
                Selecciona un rol válido.
              </p>
            )}

            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLinkInactive
                }
              >
                {Icon && <Icon size={18} className="shrink-0" />}
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer del sidebar */}
        <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-2">
          {/* Ajustes — ítem pasivo por ahora */}
          <button className={`w-full text-left ${navLinkInactive}`}>
            <Settings size={18} className="shrink-0" />
            <span>Ajustes</span>
          </button>

          {/* Único Botón de Logout — requerido por Miguel Eduardo */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-dark hover:bg-opacity-90 text-white font-bold rounded-xl transition-all text-sm"
          >
            <LogOut size={16} className="shrink-0" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════
          ZONA DERECHA (Header + Contenido)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top Header — barra superior con buscador y perfil */}
        <header className="h-20 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-outline flex items-center justify-between px-4 lg:px-10 shrink-0">

          <div className="flex items-center gap-4 flex-1">
            <button
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>

            {/* Buscador */}
            <div className="relative w-full max-w-lg hidden md:block">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Buscar por nombre, email o ID..."
                className="
                  w-full pl-11 pr-4 py-2.5 text-sm rounded-xl
                  bg-slate-100/50 border border-transparent
                  placeholder:text-slate-400
                  focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                  transition-all
                "
              />
            </div>
          </div>

          {/* Controles derechos */}
          <div className="flex items-center gap-2 lg:gap-4 ml-6">
            <button
              aria-label="Notificaciones"
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
            >
              <Bell size={20} />
            </button>
            <button
              aria-label="Modo oscuro"
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
            >
              <Moon size={20} />
            </button>

            {/* Divisor */}
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            {/* Avatar + info del usuario */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-primary-dark leading-none">
                  {displayName}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <UserCircle2 size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Contenido dinámico — cada ruta renderiza aquí */}
        <main className="flex-1 overflow-auto p-4 lg:p-10">
          <Outlet />
        </main>
      </div>

    </div>
  );
}