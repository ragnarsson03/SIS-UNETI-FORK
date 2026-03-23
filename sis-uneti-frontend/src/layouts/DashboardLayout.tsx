import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este colosal Layout agrupará el "Sistema Privado" (Dashboard).
// Todos los módulos de SIS-UNETI heredarán esta estructura.
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // El ROL definirá los botones dinámicos en la barra lateral en la posteridad.
  const currentRole = user?.rol || localStorage.getItem('sis_uneti_rol');

  const handleCerrarSesion = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* SUPER SIDEBAR (BARRA LATERAL IZQUIERDA) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col hidden md:flex">
        
        {/* Cabecera del Sidebar (Logo Compacto) */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700/50 bg-slate-950">
          <img 
            src="https://github.com/user-attachments/assets/8ea70b44-b464-42e8-b9cd-211a65ba37f8" 
            alt="UNETI" 
            className="h-8 w-auto mr-3 opacity-90"
          />
          <span className="font-bold text-sm tracking-widest text-sky-100">SIS-UNETI</span>
        </div>

        {/* Mínimo Indicador de Rol */}
        <div className="py-4 px-6 border-b border-slate-800 bg-slate-900">
          <p className="text-xs text-slate-400 font-semibold uppercase">Módulo Autorizado:</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            <span className="text-sm font-bold text-sky-300">{currentRole || 'DESCONOCIDO'}</span>
          </div>
        </div>

        {/* Links a expandir luego según el rol... */}
        <div className="flex-1 px-4 py-4 space-y-1">
          <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            🏠 Panel Principal
          </button>
        </div>

        {/* Footer del Sidebar (Cerrar Sesión) */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleCerrarSesion}
            className="w-full flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded-lg px-4 py-2 font-medium border border-red-500/20 hover:border-red-500 text-sm"
          >
            <span>Cerrar Sesión Oficial</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL (CONTENIDO) */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-700">Plataforma Célula 01</h2>
          <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-slate-100 flex items-center justify-center font-bold text-slate-400">
            {currentRole ? currentRole.charAt(0) : '?'}
          </div>
        </header>

        {/* En esta Zona Dinámica <Outlet/> se rendeará la vista de notas, perfil, inscripciones, etc. */}
        <div className="flex-1 overflow-auto p-8">
           <Outlet />
        </div>
      </main>

    </div>
  );
}
