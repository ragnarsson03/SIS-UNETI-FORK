import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900 overflow-hidden font-['Inter']">
      {/* Left Panel: Brand Side (Hidden on Mobile) */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 bg-[#0c0939] overflow-hidden">
        {/* Decorative Grid - Tailwind 4 gradient pattern simulation */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }}></div>
        
        {/* Animated Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#006a66]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center max-w-lg">
          {/* Branding Icon Container */}
          <div className="mb-10 inline-flex items-center justify-center w-28 h-28 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-sky-400/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://github.com/user-attachments/assets/8ea70b44-b464-42e8-b9cd-211a65ba37f8" 
              alt="UNETI" 
              className="w-20 h-20 brightness-200"
            />
          </div>

          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans'] leading-tight">
            SIS-UNETI <span className="text-sky-400">2026</span>
          </h1>
          <p className="text-xl text-sky-100/70 font-medium mb-12">
            Universidad de la Creatividad y la Innovación
          </p>

          {/* Value Badges */}
          <div className="flex justify-center gap-10">
            {['Excelencia', 'Visión', 'Futuro'].map((text) => (
              <div key={text} className="flex flex-col items-center gap-3">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">{text}</span>
                <div className="h-1 w-8 bg-sky-500/50 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info on Brand Side */}
        <div className="absolute bottom-10 left-12">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
            © 2026 Ecosistema Digital UNETI
          </p>
        </div>
      </section>

      {/* Right Panel: Auth Side */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-slate-50/50">
        {/* Back Button */}
        <div className="absolute top-8 right-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all group"
          >
            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="text-sm font-bold">Volver al Inicio</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {children}
          
          {/* Footer for Auth Side */}
          <div className="mt-12 flex justify-center gap-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-sky-600 transition-colors">Soporte Técnico</a>
            <span className="w-1 h-1 bg-slate-300 rounded-full mt-1.5"></span>
            <a href="#" className="hover:text-sky-600 transition-colors">Privacidad</a>
            <span className="w-1 h-1 bg-slate-300 rounded-full mt-1.5"></span>
            <a href="#" className="hover:text-sky-600 transition-colors">Reglamento</a>
          </div>
        </div>
      </section>
    </main>
  );
}
