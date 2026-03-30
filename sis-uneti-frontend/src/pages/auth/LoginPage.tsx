import LoginForm from '../../components/auth/LoginForm';

// LoginPage: Fondo oscuro premium a pantalla completa.
// El componente LoginForm ya contiene toda la estructura y diseño visual.
export default function LoginPage() {
  return (
    <div 
      className="flex-grow flex items-center justify-center w-full py-12 px-4 bg-slate-50"
    >
      <div className="w-full max-w-5xl mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
