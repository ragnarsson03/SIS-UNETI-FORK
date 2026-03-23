import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Universidad de la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              Creatividad e Innovación
            </span>
          </h1>
          
          <p className="mt-8 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bienvenidos al Sistema Integral de Servicios (SIS-UNETI). 
            La plataforma centralizada para la gestión académica y operativa de la 
            nueva era digital universitaria.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/auth/login" 
              className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl hover:bg-black transition-all hover:scale-105"
            >
              Ingresar al Portal
            </Link>
            <Link 
              to="/consulta-externa" 
              className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              Validar Documentos QR
            </Link>
          </div>

          {/* Estadísticas / Counters Rápidos */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Estudiantes Activos', count: '12K+' },
              { label: 'Sedes Regionales', count: '08' },
              { label: 'Programas PNF', count: '15+' },
              { label: 'Alianzas Tecnológicas', count: '24' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 bg-white/50 border border-slate-100 rounded-3xl">
                <div className="text-3xl font-black text-slate-900">{stat.count}</div>
                <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
