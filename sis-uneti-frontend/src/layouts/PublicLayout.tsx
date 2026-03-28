import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarPublico from '../components/publica/NavbarPublico';
import FooterPublico from '../components/publica/FooterPublico';

// PublicLayout: Wrapper para TODA la Zona Pública.
// Navbar y Footer son persistentes en todas las rutas públicas.
export default function PublicLayout() {
  const { isAuthenticated, user } = useAuth();

  // Si el usuario ya está autenticado, redirigirlo a su panel.
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
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Navbar fijo: h-20. El padding-top en main lo compensa. */}
      <NavbarPublico />

      {/* flex-grow: ocupa el espacio restante, empuja el footer al fondo. */}
      <main className="flex-grow flex flex-col pt-20">
        <Outlet />
      </main>

      {/* Footer institucional unificado */}
      <FooterPublico />
    </div>
  );
}
