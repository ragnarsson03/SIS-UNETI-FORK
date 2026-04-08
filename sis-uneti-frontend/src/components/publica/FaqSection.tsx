import { useState } from 'react'



const categories = [
  { icon: 'assignment_ind', label: 'Inscripciones 2026 Requisitos' },
  { icon: 'grade', label: 'Materias Acreditables' },
  { icon: 'description', label: 'Cursos, Diplomados y Mas' },
  { icon: 'support_agent', label: 'Mesa de Ayuda' },
]

const faqs = [
  {
    question: '¿Cómo recupero mi contraseña institucional?',
    answer: 'Puedes restablecerla ingresando a la sección de "¿Olvidó su contraseña?" en el portal de login. Requerirás acceso a tu correo personal vinculado o mediante validación por SMS.',
    defaultOpen: true,
  },
  {
    question: '¿Cuándo inicia el proceso de Inscripciones 2026-II?',
    answer: 'El proceso regular inicia el 15 de agosto de 2026. Los estudiantes de alto rendimiento tendrán acceso prioritario 48 horas antes. Asegúrate de tener tu expediente digital actualizado.',
  },
  {
    question: '¿Cómo valido un certificado con código QR?',
    answer: 'Todos los documentos emitidos por SIS-UNETI incluyen un código QR de alta seguridad. Al escanearlo, será redirigido instantáneamente al portal de verificación oficial para confirmar su autenticidad.',
  },
  {
    question: '¿Existe una app móvil para el SIS-UNETI?',
    answer: 'Sí, la aplicación "UNETI Mobile" está disponible para iOS y Android. Permite consultar notas, recibir notificaciones de clases y gestionar trámites desde tu smartphone.',
  },
]

// @ts-nocheck
function FaqItem({ question, answer, defaultOpen = false }: any) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <details className="faq-item" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="faq-trigger">
        <span>{question}</span>
        <span className={`material-symbols-outlined faq-icon`}>expand_more</span>
      </summary>
      <div className="faq-content">
        <p>{answer}</p>
      </div>
    </details>
  )
}

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="faq-container py-24 bg-white dark:bg-background-dark">
      <div className="faq-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="faq-header text-center mb-20 flex flex-col items-center gap-6">
          <span className="faq-badge text-uneti-orange text-xs font-black uppercase tracking-[0.3em]">Centro de Ayuda</span>
          <h3 className="faq-title text-4xl lg:text-6xl font-black text-uneti-blue dark:text-white">Preguntas Frecuentes</h3>
          <p className="faq-description text-slate-500 dark:text-slate-400 text-lg font-light max-w-2xl">
            Encuentre respuestas rápidas sobre los procesos académicos y tecnológicos
            de la Universidad Nacional Experimental de las Telecomunicaciones e Informática.
          </p>
        </div>

        <div className="faq-layout grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="faq-sidebar lg:col-span-4">
            <div className="faq-categories sticky top-28 p-8 rounded-card glass-card !bg-white/90 dark:!bg-slate-900/90 border-slate-100 dark:border-white/5 shadow-2xl">
              {categories.map((cat, index) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(index)}
                  className={`category-btn flex items-center gap-4 w-full p-5 rounded-xl font-black transition-all text-left mb-3 ${activeCategory === index ? 'active bg-uneti-blue text-white shadow-xl shadow-uneti-blue/20 scale-[1.02]' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'}`}
                >
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="faq-main lg:col-span-8 flex flex-col gap-6">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={faq.defaultOpen}
              />
            ))}

            <div className="support-box mt-12 p-10 rounded-card bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-center">
              <h4 className="support-title text-2xl font-black text-uneti-blue dark:text-white mb-4">¿Aún tiene dudas?</h4>
              <p className="text-slate-500 dark:text-slate-400">
                Nuestro soporte técnico está listo para asistirle en tiempo real.
              </p>
              <button className="btn-support mt-6 inline-flex items-center gap-3 px-10 py-4 bg-uneti-blue text-white font-black rounded-button hover:scale-105 transition-all shadow-xl shadow-uneti-blue/20">
                <span className="material-symbols-outlined">forum</span>
                Soporte en Vivo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
