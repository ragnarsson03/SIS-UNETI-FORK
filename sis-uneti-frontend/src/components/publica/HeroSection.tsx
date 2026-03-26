import { Link } from 'react-router-dom';
import { ShieldCheck, Database } from 'lucide-react';
import campusHero from '../../assets/landing/Campus Hero.png';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-32 bg-slate-50 overflow-hidden">
      {/* Elementos decorativos sutiles basados en el mockup */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 size-[400px] bg-primary/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna Izquierda: Información Institucional */}
          <div className="flex flex-col gap-6 lg:gap-8 z-10">
            
            {/* Tag institucional dinámico */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-[0.15em] w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Sistema Oficial de Gestión Académica
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-slate-900 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                Bienvenido a <span className="text-primary">SIS-UNETI</span>
              </h1>
              <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
                Centralizando la gestión académica con tecnología soberana para la comunidad 
                de la Universidad Nacional Experimental de las Telecomunicaciones e Informática.
              </p>
            </div>

            {/* CTA's */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                to="/auth/login" 
                className="flex items-center justify-center min-w-[200px] h-14 px-8 bg-primary text-white text-base font-bold rounded-xl transition-all shadow-xl shadow-primary/25 hover:bg-primary-dark hover:scale-105"
              >
                Acceder al Sistema
              </Link>
              <Link 
                to="/consulta-externa" 
                className="flex items-center justify-center min-w-[200px] h-14 px-8 bg-white border border-slate-200 text-slate-800 text-base font-bold rounded-xl transition-all hover:bg-slate-50 hover:border-slate-300"
              >
                Validación de Títulos QR
              </Link>
            </div>

            {/* Certificaciones fijas en Hero */}
            <div className="flex items-center gap-8 pt-6 border-t border-slate-200 max-w-md">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-primary size-5" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Protocolo Seguro SSL</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Database className="text-primary size-5" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Infraestructura Propia</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Visualización del sistema */}
          <div className="relative group lg:block hidden">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 to-blue-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              {/* Pantalla principal del campus */}
              <img 
                src={campusHero} 
                alt="Prototipo SIS-UNETI" 
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div className="w-full">
                  <p className="text-white text-sm font-bold italic opacity-90 mb-2 leading-relaxed">
                    "Transformando la educación a través de la digitalización soberana."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
