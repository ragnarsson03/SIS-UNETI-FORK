
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoUneti from '../../assets/logo_uneti_fondo_blanco.jpeg';

// Constantes de navegación para limpieza del JSX
const NAV_LINKS = [
  { path: '/', label: 'Institución' },
  { path: '/noticias', label: 'Noticias' },
  { path: '/consulta-externa', label: 'Validación QR' },
];

export default function NavbarPublico() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo Institucional */}
        <div className="flex items-center gap-3 select-none">
          <img
            src={logoUneti}
            alt="UNETI Logo"
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col">
            <h2 className="text-primary text-xl font-extrabold leading-none tracking-tight">SIS-UNETI</h2>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
              Sistema de Control de Estudios
            </span>
          </div>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-bold text-slate-700 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/auth/login"
            className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform hover:-translate-y-0.5"
          >
            Acceder
          </Link>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="p-2 text-slate-600 hover:text-primary transition-colors focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <div className="px-4 py-6 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="w-full px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-primary rounded-xl transition-all"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-2">
            <Link
              to="/auth/login"
              className="w-full flex items-center justify-center h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20"
              onClick={closeMenu}
            >
              Acceder al Sistema
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

