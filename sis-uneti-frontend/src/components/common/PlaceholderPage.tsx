interface PlaceholderProps {
  titulo: string;
  desc: string;
}

export default function PlaceholderPage({ titulo, desc }: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="w-24 h-24 mb-6 rounded-3xl bg-sky-100 flex items-center justify-center shadow-inner">
        <svg className="w-12 h-12 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">{titulo}</h1>
      <p className="text-lg text-slate-500 max-w-lg">{desc}</p>
      
      <div className="mt-10 p-4 border border-orange-200 bg-orange-50 rounded-xl max-w-md w-full">
        <p className="text-sm font-semibold text-orange-800 flex items-center justify-center gap-2">
          <span>⚠️</span> 
          Fase de Desarrollo Activa
        </p>
        <p className="mt-1 text-xs text-orange-700">Este módulo será integrado en el sprint correspondiente al Site Map oficial de Célula 01.</p>
      </div>
    </div>
  );
}
