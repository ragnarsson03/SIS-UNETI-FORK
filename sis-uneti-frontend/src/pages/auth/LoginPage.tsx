import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    // flex-grow: ocupa TODO el espacio que el main del padre le deja.
    // items-center + justify-center: centra la tarjeta horizontal y verticalmente.
    // py-8: respiro vertical sin forzar alturas.
    <div className="flex-grow flex items-center justify-center w-full py-8 px-4 relative overflow-hidden">

      {/* Malla de puntos sutil (código.html) */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#0c0939 0.5px, transparent 0.5px), radial-gradient(#0c0939 0.5px, #f8fafc 0.5px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      ></div>

      {/* Glows ambientales */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-sky-300/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Tarjeta: w-11/12 en móvil, max-w-md en desktop */}
      <div className="w-11/12 max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}

