import { Link } from 'react-router-dom';
import { Globe, AtSign, MapPin, Mail } from 'lucide-react';
import logoUneti from '../../assets/logo_uneti_fondo_negro.jpeg';

// Constantes de navegación para limpiar el JSX del Footer
const LINKS_INSTITUCION = [
  { label: 'Portal Institucional', href: 'https://www.uneti.edu.ve', external: true },
  { label: 'Campus Virtual', href: 'https://www.uneti.edu.ve/campus/', external: true },
  { label: 'Autoridades Universitarias', href: '#', external: false },
  { label: 'Calendario Académico', href: '#', external: false },
  { label: 'Reglamentos', href: '#', external: false },
];

const LINKS_SOPORTE = [
  { label: 'Preguntas Frecuentes', href: '#', external: false },
  { label: 'Manuales de Usuario', href: '#', external: false },
  { label: 'Mesa de Ayuda', href: '#', external: false },
  { label: 'Reportar Incidencia', href: '#', external: false },
  { label: 'Validar Documento QR', path: '/consulta-externa', isRouterLink: true },
];

const LEGAL_LINKS = [
  { label: 'Privacidad', href: '#' },
  { label: 'Términos de Uso', href: '#' },
  { label: 'Accesibilidad', href: '#' },
];

export default function FooterPublico() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-slate-800">

          {/* Columna Institución Principal */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src={logoUneti}
                alt="UNETI"
                className="h-16 w-auto object-contain mix-blend-screen"
              />
              <span className="text-white font-bold text-lg">UNETI</span>
            </div>
            <p className="text-xs leading-relaxed">
              Universidad Nacional Experimental de las Telecomunicaciones e Informática.
              Ecosistema digital para la formación universitaria soberana de Venezuela.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.uneti.edu.ve" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white text-center">
                <span className="text-xs font-bold leading-none">X</span>
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <AtSign className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna Institución Links */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest">Institución</h5>
            <ul className="flex flex-col gap-2 text-xs">
              {LINKS_INSTITUCION.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Soporte */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest">Soporte Técnico</h5>
            <ul className="flex flex-col gap-2 text-xs">
              {LINKS_SOPORTE.map((link, idx) => (
                <li key={idx}>
                  {link.isRouterLink ? (
                    <Link to={link.path!} className="hover:text-white transition-colors font-semibold">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Contacto */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest">Contacto</h5>
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>Caracas, Venezuela. Av. Universidad, Torre Ministerial.</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>desarrollo.uneti@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 text-center md:text-left">
            © 2026 SIS-UNETI. Todos los derechos reservados. Desarrollado por la Dirección de Tecnología e Innovación.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-[10px] text-slate-500">
            {LEGAL_LINKS.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
