import { Link, useNavigate } from 'react-router-dom';
import heroBg from "../../assets/uneti hero/uneti_hero_bg.png";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero-container relative w-full min-h-[90vh] flex items-center overflow-hidden bg-uneti-blue">
      {/* Visual Background Layer */}
      <div className="hero-background absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="UNETI Campus"
          className="hero-bg-image w-full h-full object-cover opacity-40 mix-blend-overlay scale-110"
        />
        <div className="hero-overlay absolute inset-0 bg-gradient-to-br from-uneti-blue via-uneti-blue/80 to-transparent z-10" />
      </div>

      <div className="hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full pt-12 lg:pt-0">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content Area */}
          <div className="max-w-xl">
            <div className="hero-badge inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-uneti-orange/30 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 w-fit shadow-xl">
              <span className="hero-badge-dot relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-uneti-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-uneti-orange"></span>
              </span>
              Inscripciones Abiertas 2026
            </div>

            <h2 className="hero-headline text-white text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8">
              Tu Futuro <span className="text-uneti-orange block lg:inline">Tecnológico</span> Empieza Aquí
            </h2>

            <p className="hero-description text-slate-300 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-10">
              Formamos los líderes de la soberanía tecnológica nacional con programas de vanguardia en IA, Ciberseguridad y Telecomunicaciones.
            </p>

            <div className="hero-buttons flex flex-wrap gap-6 mb-12">
              <button onClick={() => navigate('/auth/register')} className="btn-primary flex min-w-[200px] cursor-pointer items-center justify-center rounded-button h-16 px-10 bg-uneti-orange text-white text-lg font-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-uneti-orange/40 active:scale-95">
                Pre-Inscríbete
              </button>
              <Link to="/academico" className="btn-secondary flex min-w-[200px] cursor-pointer items-center justify-center rounded-button h-16 px-10 glass-card text-white text-lg font-black transition-all hover:bg-white/20 active:scale-95">
                Ver Carreras
              </Link>
            </div>

            <div className="hero-trust flex items-center gap-10 text-slate-400 border-t border-white/10 pt-8">
              <div className="trust-item flex items-center gap-3">
                <span className="text-uneti-orange text-2xl material-symbols-outlined">verified</span>
                <span className="text-xs font-bold uppercase tracking-widest">Acreditación OPSU</span>
              </div>
              <div className="trust-item flex items-center gap-3">
                <span className="text-uneti-orange text-2xl material-symbols-outlined">groups</span>
                <span className="text-xs font-bold uppercase tracking-widest">+5k Estudiantes</span>
              </div>
            </div>
          </div>

          {/* Foreground Visual Element */}
          <div className="hero-status-card glass-card p-6 rounded-card border-white/10 hidden lg:block max-w-sm ml-auto animate-float">
            <div className="status-header flex justify-between items-center mb-4">
              <span className="status-label text-[10px] uppercase tracking-widest text-uneti-orange font-black">Próxima Clase</span>
              <div className="status-dot size-2 rounded-full bg-uneti-green animate-pulse" />
            </div>
            <h4 className="status-title text-white text-xl font-bold mb-2">Inteligencia Artificial I</h4>
            <p className="text-slate-400 text-sm mb-6"></p>
            <div className="status-progress w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="status-bar h-full bg-gradient-to-r from-uneti-orange to-uneti-yellow w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
