import { useState, useEffect } from 'react';



export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Use multiple sources to ensure detection in all browsers/containers
      const scrollY = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setIsScrolled(scrollY > 20);
    }

    // Attach to multiple event targets for redundancy
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <header className={`header-container ${isScrolled ? 'header-scrolled py-2' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="logo-box size-10 bg-uneti-orange rounded-xl flex items-center justify-center text-white shadow-lg shadow-uneti-orange/20 transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h2 className="logo-text text-uneti-blue dark:text-white text-3xl font-black tracking-tighter">UNETI</h2>
        </div>

        {/* Global Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {['Inicio', 'Académico', 'Servicios', 'Ayuda'].map((item) => (
            <a key={item} href="#" className="nav-link text-uneti-blue dark:text-slate-300 font-bold text-sm uppercase tracking-widest hover:text-uneti-orange transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-uneti-blue dark:text-white font-bold text-sm">Portal SIS</button>
          <button className="btn-login px-8 py-3 bg-uneti-blue text-white font-black rounded-button hover:bg-uneti-orange transition-all shadow-xl shadow-uneti-blue/10">
            Ingresar
          </button>
        </div>
      </div>
    </header>
  )
}
