import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoUneti from '../../assets/logo_uneti_fondo_blanco.jpeg';

const NAV_LINKS = [
  { path: '/', label: 'Inicio' },
  { path: '/academico', label: 'Académico' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/ayuda', label: 'Ayuda' },
];

export default function NavbarPublico() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLogin = () => {
    navigate('/auth/login');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">

        {/* Logo Institucional Oficial (Recuperado) */}
        <Link to="/" className="flex items-center gap-3 group select-none flex-shrink-0" onClick={closeMenu}>
          <img src={logoUneti} alt="UNETI Logo" className="h-10 w-auto object-contain rounded-md" />
          <h2 className="text-uneti-blue text-3xl font-black tracking-tighter hidden sm:block">UNETI</h2>
        </Link>

        {/* Menú Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-uneti-blue font-bold text-sm uppercase tracking-widest hover:text-uneti-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Action Area Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-uneti-blue font-bold text-sm hidden sm:block">Portal SIS</button>
          <button
            onClick={handleOpenLogin}
            className="px-8 py-3 bg-uneti-blue text-white font-black rounded-lg hover:bg-uneti-orange transition-all shadow-xl shadow-uneti-blue/10"
          >
            Ingresar
          </button>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            className="p-2 text-uneti-blue hover:text-uneti-orange transition-colors focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-8" /> : <Menu className="size-8" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full shadow-xl transition-all duration-300 overflow-hidden bg-white/95 backdrop-blur-md ${
          mobileOpen ? 'max-h-[400px] opacity-100 border-b border-slate-200' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="w-full px-4 py-3 text-sm font-bold text-uneti-blue uppercase hover:bg-slate-50 hover:text-uneti-orange rounded-lg transition-colors tracking-widest"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-2 flex flex-col gap-3">
            <button
              onClick={() => { closeMenu(); handleOpenLogin(); }}
              className="w-full flex items-center justify-center p-4 bg-uneti-blue text-white font-black text-sm rounded-lg shadow-md tracking-widest"
            >
              INGRESAR
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
