export default function CtaSection() {
  return (
    <section className="cta-container py-24">
      <div className="cta-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="cta-banner relative rounded-[2.5rem] overflow-hidden p-12 lg:p-24 text-center shadow-2xl bg-uneti-blue">
          <div className="cta-bg absolute inset-0 z-0 opacity-30"></div>

          <div className="cta-content relative z-10 flex flex-col items-center gap-8">
            <h2 className="cta-title text-4xl lg:text-7xl font-black text-white leading-tight max-w-3xl">
              ¿Listo para dar el siguiente paso en tu <span className="text-uneti-orange">carrera digital</span>?
            </h2>
            <p className="cta-description text-slate-300 text-lg lg:text-2xl font-light max-w-2xl">
              Únete a la red académica más avanzada de la región.
              El futuro no se espera, se construye en la UNETI.
            </p>

            <div className="cta-buttons flex flex-wrap justify-center gap-6 mt-4">
              <button className="btn-cta-main px-12 py-5 bg-uneti-orange text-white font-black rounded-button text-xl hover:scale-105 transition-all shadow-xl shadow-uneti-orange/20">
                Crear Cuenta
              </button>
              <button className="btn-cta-alt px-12 py-5 glass-card text-white font-black rounded-button text-xl hover:bg-white/20 transition-all">
                Soporte Técnico
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
