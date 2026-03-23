import { Link } from 'react-router-dom';

export default function NavbarPublico() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="https://github.com/user-attachments/assets/8ea70b44-b464-42e8-b9cd-211a65ba37f8" 
              alt="UNETI Logo" 
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <span className="text-xl font-bold text-slate-900 block leading-tight">SIS-UNETI</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Ecosistema Institucional</span>
            </div>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Institución</Link>
            <Link to="/noticias" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Noticias</Link>
            <Link to="/consulta-externa" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Consulta Externa</Link>
            <Link 
              to="/auth/login" 
              className="px-6 py-2.5 bg-sky-600 text-white text-sm font-bold rounded-full shadow-lg shadow-sky-200 hover:bg-sky-700 hover:-translate-y-0.5 transition-all"
            >
              Acceso a Sistemas
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
