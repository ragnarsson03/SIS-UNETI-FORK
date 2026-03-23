import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarPublico from '../components/publica/NavbarPublico';

// PublicLayout: Wrapper compartido para TODA la Zona Pública.
// La barra de navegación y pie de página son persistentes en / y /auth/login.
export default function PublicLayout() {
  const { isAuthenticated, user } = useAuth();

  // Si el usuario ya está autenticado, lo redirigimos a su panel.
  if (isAuthenticated && user) {
    const rolesMap: Record<string, string> = {
      'ESTUDIANTE': '/estudiante/dashboard',
      'DOCENTE': '/docente/dashboard',
      'COORDINADOR': '/coordinador/dashboard',
      'SECRETARIA': '/secretaria/dashboard',
      'ADMINISTRADOR': '/admin/dashboard',
    };
    return <Navigate to={rolesMap[user.rol!] || '/'} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar fijo: 80px de altura (h-20). El padding-top del main lo compensa. */}
      <NavbarPublico />

      {/* flex-grow asegura que este bloque ocupe TODO el espacio disponible,
          empujando el Footer siempre al fondo. */}
      <main className="flex-grow flex flex-col pt-20">
        <Outlet />
      </main>

      {/* Footer: siempre al fondo gracias al flex-grow del main arriba. */}
      <footer className="w-full py-8 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
            © 2026 UNETI — Universidad Nacional Experimental de las Telecomunicaciones e Informática
          </p>
          <div className="flex gap-6 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-sky-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Soporte</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
