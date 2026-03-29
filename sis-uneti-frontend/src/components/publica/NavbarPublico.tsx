import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoUneti from '../../assets/logo_uneti_fondo_blanco.jpeg';

const NAV_LINKS = [
  { path: '/', label: 'INSTITUCIÓN' },
  { path: '/noticias', label: 'NOTICIAS' },
  { path: '/soporte', label: 'SOPORTE' },
];

export default function NavbarPublico() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo Institucional (Re-creado a partir de asset importado) */}
        <Link to="/" className="flex items-center gap-3 select-none flex-shrink-0" onClick={closeMenu}>
          <img src={logoUneti} alt="UNETI Logo" className="h-10 w-auto object-contain rounded-md" />
          <div className="flex flex-col border-l border-slate-300 pl-3">
            <h2 className="text-blue-900 text-xl font-black tracking-widest leading-none">SIS-UNETI</h2>
            <span className="text-slate-500 text-[9px] uppercase tracking-widest font-bold mt-1">SISTEMA DE CONTROL DE ESTUDIOS</span>
          </div>
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors tracking-wider"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <Link
              to="/soporte/mesa-ayuda"
              className="px-5 py-2 text-blue-600 text-xs font-bold rounded-lg border border-blue-600/30 hover:bg-blue-50 transition-colors tracking-wider flex-shrink-0"
            >
              MESA DE AYUDA
            </Link>
            <Link
              to="/auth/login"
              className="px-6 py-2 bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-800 transition-colors tracking-wider flex-shrink-0"
            >
              ACCEDER
            </Link>
          </div>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="p-2 text-slate-600 hover:text-blue-700 transition-colors focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full border-b border-slate-200 shadow-xl transition-all duration-300 overflow-hidden bg-white ${
          mobileOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="w-full px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-700 rounded-lg transition-colors tracking-wider"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-2 flex flex-col gap-3">
            <Link
              to="/soporte/mesa-ayuda"
              className="w-full flex items-center justify-center p-3 text-blue-700 font-bold text-xs rounded-lg border border-blue-600/30 hover:bg-blue-50 tracking-wider"
              onClick={closeMenu}
            >
              MESA DE AYUDA
            </Link>
            <Link
              to="/auth/login"
              className="w-full flex items-center justify-center p-3 bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md tracking-wider"
              onClick={closeMenu}
            >
              ACCEDER
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
