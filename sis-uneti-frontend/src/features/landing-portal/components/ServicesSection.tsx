


const services = [
  {
    icon: 'history_edu',
    title: 'Gestión Académica',
    description: 'Inscripciones, horarios y control de notas automatizados con predicción de rendimiento mediante IA.',
    accent: 'var(--color-uneti-orange)',
  },
  {
    icon: 'fingerprint',
    title: 'Expediente Digital',
    description: 'Todo tu historial académico resguardado con tecnología blockchain para máxima seguridad.',
    accent: 'var(--color-uneti-blue)',
  },
  {
    icon: 'qr_code_2',
    title: 'Certificaciones QR',
    description: 'Genera constancias y diplomas verificables al instante en cualquier lugar del mundo.',
    accent: 'var(--color-uneti-green)',
  },
]

export default function ServicesSection() {
  return (
    <section className="services-container py-24 bg-background-soft relative overflow-hidden">
      <div className="services-header max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-20 text-center lg:text-left">
        <span className="services-badge text-uneti-orange text-xs font-black uppercase tracking-[0.3em] mb-4 block">Tecnología de Vanguardia</span>
        <h3 className="services-title text-4xl lg:text-6xl font-black text-uneti-blue mb-6 leading-tight">Servicios Institucionales</h3>
        <div className="services-underline h-2 w-32 bg-uneti-orange rounded-full lg:mx-0 mx-auto"></div>
      </div>

      <div className="services-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service) => (
          <div
            key={service.title}
            className="service-card group p-10 rounded-card bg-white border border-slate-100 hover:border-transparent transition-all duration-500 shadow-sm hover:shadow-premium flex flex-col gap-6 relative overflow-hidden cursor-pointer"
            style={{ '--accent-color': service.accent } as React.CSSProperties}
          >
            <div className="service-icon-bg size-16 rounded-2xl flex items-center justify-center transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">
                {service.icon}
              </span>
            </div>
            <div className="service-info">
              <h4 className="text-2xl font-black text-uneti-blue mb-3 dark:group-hover:text-white">{service.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
            </div>
            <a href="#" className="service-link mt-auto text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all">
              Acceder al módulo
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        ))}
      </div>

      {/* AI Assistant Special Card */}
      <div className="ai-highlight-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="ai-card relative rounded-card overflow-hidden p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-br from-uneti-purple to-uneti-blue text-white shadow-2xl">
          <div className="ai-card-content flex-1 relative z-10">
            <span className="ai-badge inline-block px-3 py-1 rounded-md bg-white/20 text-[10px] font-black uppercase tracking-widest mb-4">SIS-IA PRO</span>
            <h2 className="ai-title text-4xl lg:text-5xl font-black mb-6">Asistente SIS-IA</h2>
            <p className="ai-description text-slate-200 text-lg font-light leading-relaxed mb-8 max-w-xl">
              Resuelve tus dudas sobre trámites, requisitos o fechas importantes
              mediante nuestro asistente conversacional disponible 24/7.
              Optimizado con modelos de lenguaje específicos para la UNETI.
            </p>
            <div className="ai-actions flex flex-wrap gap-4">
              <button className="btn-ai-primary px-8 py-4 bg-white text-uneti-purple font-black rounded-button hover:scale-105 transition-all shadow-xl text-sm lg:text-base">Chatear ahora</button>
              <button className="btn-ai-secondary px-8 py-4 bg-white/10 text-white font-black rounded-button border border-white/20 hover:bg-white/20 transition-all text-sm lg:text-base">Ver tutorial</button>
            </div>
          </div>
          <div className="ai-visual flex-1 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_9yZ0r4n7uL1y0hF_fH0u1f2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0"
              alt="AI Assistant"
              className="ai-image rounded-2xl shadow-2xl shadow-black/40 border border-white/10 max-w-full"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
