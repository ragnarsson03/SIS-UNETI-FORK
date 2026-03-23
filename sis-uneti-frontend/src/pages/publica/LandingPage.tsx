import { Link } from 'react-router-dom';
import HeroSection from '../../components/publica/HeroSection';

export default function LandingPage() {
  return (
    <div className="bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      <main>
        {/* Sección de Bienvenida */}
        <HeroSection />

        {/* Sección de Noticias (Placeholder para Grid) */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Noticias y Anuncios</h2>
                <p className="mt-2 text-slate-500">Mantente al tanto de los hitos más importantes de nuestra comunidad.</p>
              </div>
              <button className="px-6 py-2 text-sky-600 font-bold hover:text-sky-700 transition-colors">
                Ver todas las noticias →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
                  <div className="h-48 bg-slate-200 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <img 
                      src={`https://picsum.photos/seed/uneti${i}/800/600`} 
                      alt="Noticia" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Institucional</span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      Gran Apertura de Cohorte 2026-I: Innovación Digital Garantizada
                    </h3>
                    <p className="mt-4 text-slate-500 text-sm leading-relaxed line-clamp-2">
                      La UNETI se consolida como la vanguardia en telecomunicaciones con el inicio del nuevo ciclo académico...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-12 sm:p-20 bg-gradient-to-br from-sky-600 to-blue-800 rounded-[3rem] text-center shadow-2xl overflow-hidden relative">
              {/* Círculos decorativos */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                ¿Listo para transformar <br /> tu futuro tecnológico?
              </h2>
              <p className="mt-6 text-sky-100 text-lg max-w-xl mx-auto">
                Accede a nuestro sistema de gestión académica y forma parte de la revolución informativa nacional.
              </p>
              <div className="mt-10">
                <Link 
                  to="/auth/login" 
                  className="inline-block px-12 py-4 bg-white text-sky-600 font-black rounded-2xl shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
                >
                  Empezar Ahora
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}