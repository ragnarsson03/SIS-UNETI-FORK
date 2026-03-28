import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, Role } from '../../context/AuthContext';

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula: identifier, clave: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas. Verifique e intente nuevamente.');
      }

      const userRole = (data.rol || 'ESTUDIANTE') as Role;

      login({
        cedula: identifier,
        rol: userRole,
        token: data.token,
      });

      switch (userRole) {
        case 'ESTUDIANTE': navigate('/estudiante/dashboard'); break;
        case 'DOCENTE': navigate('/docente/dashboard'); break;
        case 'COORDINADOR': navigate('/coordinador/dashboard'); break;
        case 'SECRETARIA': navigate('/secretaria/dashboard'); break;
        case 'ADMINISTRADOR': navigate('/admin/dashboard'); break;
        default: navigate('/');
      }

    } catch (err: any) {
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">

      {/* Cabecera institucional */}
      <div className="bg-[#003366] px-8 py-6 text-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="material-symbols-outlined text-[22px] text-sky-300">lock</span>
          <h1 className="text-base font-semibold tracking-wide">
            Sistema de Control de Estudios
          </h1>
        </div>
        <p className="text-xs text-blue-200 pl-9">
          UNETI — Autenticación de Usuario
        </p>
      </div>

      {/* Cuerpo del formulario */}
      <div className="px-8 py-7">

        {/* Alerta de error */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start gap-2">
            <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Campo: Cédula de Identidad */}
          <div className="space-y-1.5">
            <label
              htmlFor="identifier"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              Cédula de Identidad / Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </div>
              <input
                id="identifier"
                required
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ej: V-24123456"
                autoComplete="username"
                className="w-full h-10 pl-10 pr-4 bg-white border border-slate-300 rounded-md text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#003366] focus:border-[#003366] transition-colors"
              />
            </div>
          </div>

          {/* Campo: Contraseña */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[18px]">key</span>
              </div>
              <input
                id="password"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de acceso"
                autoComplete="current-password"
                className="w-full h-10 pl-10 pr-11 bg-white border border-slate-300 rounded-md text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#003366] focus:border-[#003366] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Opciones */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded-sm border-slate-300 text-[#003366] focus:ring-[#003366]"
              />
              <span className="text-xs text-slate-600">Mantener sesión iniciada</span>
            </label>
            <Link
              to="/auth/recuperar-contrasena"
              className="text-xs text-[#003366] hover:underline underline-offset-2"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>

          {/* Botón de Ingreso */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 flex items-center justify-center gap-2 bg-[#003366] text-white rounded-md font-semibold text-sm hover:bg-[#002a52] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Ingresar al Sistema</span>
              </>
            )}
          </button>
        </form>

        {/* Enlace a Consulta Externa */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            ¿Necesita validar un documento oficial?{' '}
            <Link to="/consulta-externa" className="text-[#003366] font-semibold hover:underline">
              Acceso de Consulta Externa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
