import LoginForm from '../../components/auth/LoginForm';

// LoginPage: Contenedor limpio, sin efectos decorativos.
// El fondo y el centrado son responsabilidad de este componente.
export default function LoginPage() {
  return (
    <div className="flex-grow flex items-center justify-center w-full py-12 px-4 bg-slate-100">
      <div className="w-full max-w-sm mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
