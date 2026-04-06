import { Link } from 'react-router-dom';
import { BookOpen, Fingerprint, QrCode, Headphones, ChevronDown } from 'lucide-react';
import HeroSection from '../../components/publica/HeroSection';
import noticiaImg from '../../assets/landing/Noticia1.jpg';
// ── Datos de Servicios ──────────────────────────────────────────────────────
const SERVICIOS = [
  {
    icon: BookOpen,
    titulo: 'Gestión Académica',
    desc: 'Inscripciones, control de notas y seguimiento de la trayectoria estudiantil por período.',
  },
  {
    icon: Fingerprint,
    titulo: 'Expediente Digital',
    desc: 'Acceso centralizado al expediente estudiantil, documentos digitalizados y certificados.',
  },
  {
    icon: QrCode,
    titulo: 'Validación de Documentos',
    desc: 'Verificación de autenticidad de documentos oficiales mediante código QR institucional.',
  },
  {
    icon: Headphones,
    titulo: 'Soporte y Mesa de Ayuda',
    desc: 'Canal oficial de atención a consultas técnicas y administrativas de la comunidad universitaria.',
  },
];

// ── Datos de FAQ ────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Cómo inicio mi proceso de inscripción en línea?',
    a: 'Acceda al portal con sus credenciales institucionales. Diríjase a la sección "Gestión Académica" y seleccione "Inscripciones". El sistema le guiará en la selección de unidades curriculares y carga de documentos requeridos.',
  },
  {
    q: '¿Cuáles son los requisitos para estudiantes de nuevo ingreso?',
    a: 'Los estudiantes de nuevo ingreso deben cargar en formato digital: Título de Bachiller, Notas Certificadas, Cédula de Identidad y asignación del OPSU. La documentación será verificada por Control de Estudios antes de formalizar el registro.',
  },
  {
    q: '¿En cuánto tiempo se reflejan las notas en el sistema?',
    a: 'Las notas se actualizan de forma inmediata una vez que el docente realiza el cierre del acta digital. El sistema genera una notificación automática al correo institucional del estudiante.',
  },
  {
    q: '¿Cómo se verifica la autenticidad de un certificado QR?',
    a: 'Cualquier persona puede escanear el código QR presente en el documento oficial. El enlace generado abre el portal de validación seguro de la UNETI donde se confirma la veracidad del contenido.',
  },
  {
    q: '¿Qué debo hacer si no puedo acceder con mi usuario?',
    a: 'Verifique su conexión a la red y que el Bloq Mayús esté desactivado. Si el problema persiste, utilice la opción "¿Olvidó su contraseña?" en el formulario de ingreso, o contacte a la Mesa de Ayuda.',
  },
];

// ── Noticias de muestra ────────────────────────────────────────────────────
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
    <div className="bg-slate-100 flex flex-col">
      <main>

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Servicios Institucionales */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900">Servicios Institucionales</h2>
              <p className="mt-1 text-sm text-slate-500">
                Módulos disponibles en el Sistema Integral de Servicios de la UNETI.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICIOS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{item.titulo}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Noticias y Comunicados */}
        <section className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Noticias y Comunicados</h2>
                <p className="mt-1 text-sm text-slate-500">Información oficial de la dirección universitaria.</p>
              </div>
              <button className="text-sm text-primary font-semibold hover:underline transition-colors self-start md:self-center">
                Ver todos los comunicados →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NOTICIAS.map((n, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md transition-shadow group"
                >
                  <div className="h-44 overflow-hidden bg-slate-200">
                    <img
                      src={n.img}
                      alt={n.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Institucional</span>
                    <h3 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                      {n.titulo}
                    </h3>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed line-clamp-2">{n.resumen}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Preguntas Frecuentes */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900">Preguntas Frecuentes</h2>
              <p className="mt-1 text-sm text-slate-500">
                Consultas comunes sobre los procesos académicos y administrativos.
              </p>
            </div>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 border border-slate-200 rounded-md overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none">
                    <span className="text-sm font-semibold text-slate-800">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA Acceso */}
        <section className="py-14 bg-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-lg p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Acceso al Portal Institucional</h2>
                <p className="mt-3 text-blue-200 text-sm max-w-md leading-relaxed">
                  Estudiantes, docentes, coordinadores y personal administrativo acceden con sus credenciales
                  institucionales asignadas por Control de Estudios.
                </p>
              </div>
              <Link
                to="/auth/login"
                className="flex-shrink-0 px-10 py-3 bg-white text-primary font-bold rounded-md hover:bg-slate-100 transition-colors text-sm"
              >
                Ingresar al Sistema
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}