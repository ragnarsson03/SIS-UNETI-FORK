import HeroSection from '../../components/publica/HeroSection';
import ServicesSection from '../../components/publica/ServicesSection';
import FaqSection from '../../components/publica/FaqSection';

// Conservamos la sección de "Noticias" original que no estaba en el diseño de Sergio
import noticiaImg from '../../assets/landing/Noticia1.jpg';

const NOTICIAS = [
  {
    img: noticiaImg,
    titulo: 'Apertura del Período Académico 2026-I: Inicio de Inscripciones',
    resumen: 'La Dirección de Control de Estudios informa a la comunidad estudiantil la apertura del proceso de inscripciones para el período 2026-I a través del portal SIS-UNETI.',
  },
  {
    img: noticiaImg,
    titulo: 'Actualización del Reglamento de Evaluación Continua',
    resumen: 'El Consejo Universitario aprobó las modificaciones al reglamento de evaluación continua, vigentes a partir del siguiente período lectivo.',
  },
  {
    img: noticiaImg,
    titulo: 'Incorporación de Nuevos Programas Nacionales de Formación',
    resumen: 'Se formalizó ante el MPPEUCT la incorporación de dos nuevos PNF en el área de ciberseguridad e inteligencia artificial para el ciclo académico 2026.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <main>
        {/* 1. Hero Clone Exacto Sergio */}
        <HeroSection />

        {/* 2. Servicios Institucionales Clone Exacto Sergio */}
        <ServicesSection />

        {/* 3. Noticias y Comunicados (Original de SIS-UNETI adaptada a padding de Sergio) */}
        <section className="py-24 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16">
              <div>
                <span className="text-uneti-orange text-xs font-black uppercase tracking-[0.3em] mb-4 block">Actualidad</span>
                <h2 className="text-4xl lg:text-5xl font-black text-uneti-blue">Noticias y Comunicados</h2>
              </div>
              <button className="text-sm font-bold text-uneti-orange hover:text-uneti-blue transition-colors self-start md:self-end mb-2 tracking-widest uppercase flex items-center gap-2">
                Ver Todo <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {NOTICIAS.map((n, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden glass-card hover:shadow-premium transition-all duration-500 group border border-white/50"
                >
                  <div className="h-56 overflow-hidden bg-slate-200">
                    <img
                      src={n.img}
                      alt={n.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-uneti-orange uppercase tracking-widest bg-uneti-orange/10 px-3 py-1 rounded-full">Institucional</span>
                    <h3 className="mt-4 text-xl font-bold text-uneti-blue group-hover:text-uneti-orange transition-colors leading-snug">
                      {n.titulo}
                    </h3>
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed line-clamp-3">{n.resumen}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Preguntas Frecuentes Clone Exacto Sergio */}
        <FaqSection />

      </main>
    </div>
  );
}