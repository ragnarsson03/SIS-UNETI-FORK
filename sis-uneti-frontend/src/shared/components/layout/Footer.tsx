


const institutionLinks = [
  'Misión y Visión',
  'Autoridades',
  'Reglamentos',
  'Calendario Académico',
]

const supportLinks = [
  'Preguntas Frecuentes',
  'Manual de Usuario',
  'Mesa de Ayuda',
  'Reportar una Falla',
]

const socialIcons = ['language', 'share', 'alternate_email']

export default function Footer() {
  return (
    <footer className="footer-container bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="footer-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="footer-brand-col flex flex-col gap-8">
            <div className="footer-logo flex items-center gap-3">
              <div className="footer-logo-box size-10 bg-uneti-orange rounded-xl flex items-center justify-center text-white shadow-lg shadow-uneti-orange/20">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <h2 className="footer-logo-text text-white text-2xl font-black tracking-tighter">UNETI</h2>
            </div>
            <p className="text-sm leading-relaxed">
              Universidad Nacional Experimental de las Telecomunicaciones e
              Informática. Formando los líderes tecnológicos del mañana.
            </p>
            <div className="social-links flex items-center gap-4">
              {socialIcons.map((icon) => (
                <a key={icon} href="#" className="social-btn size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-uneti-orange hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h5 className="footer-col-title text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Institución</h5>
            <ul className="footer-links flex flex-col gap-4 text-sm">
              {institutionLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link hover:text-uneti-orange transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h5 className="footer-col-title text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Soporte Técnico</h5>
            <ul className="footer-links flex flex-col gap-4 text-sm">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link hover:text-uneti-orange transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h5 className="footer-col-title text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Contacto</h5>
            <div className="contact-info flex flex-col gap-6 text-sm">
              <div className="contact-item flex gap-4">
                <span className="material-symbols-outlined contact-icon text-uneti-orange">location_on</span>
                <span>Caracas, Venezuela. Av. Universidad, Torre Ministerial.</span>
              </div>
              <div className="contact-item flex gap-4">
                <span className="material-symbols-outlined contact-icon text-uneti-orange">mail</span>
                <a href="mailto:soporte@sis.uneti.edu.ve" className="footer-link hover:text-uneti-orange transition-colors">
                  soporte@sis.uneti.edu.ve
                </a>
              </div>
            </div>
            <div className="map-placeholder mt-6 rounded-xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 h-32 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium uppercase tracking-widest">
          <p>© 2026 SIS-UNETI. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="legal-links flex gap-8">
            <a href="#" className="footer-link hover:text-uneti-orange transition-colors">Privacidad</a>
            <a href="#" className="footer-link hover:text-uneti-orange transition-colors">Términos</a>
            <a href="#" className="footer-link hover:text-uneti-orange transition-colors">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
