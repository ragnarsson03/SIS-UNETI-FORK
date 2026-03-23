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
      // Petición al API Gateway
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula: identifier, clave: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación perimetral');
      }

      const userRole = (data.rol || 'ESTUDIANTE') as Role;
      
      login({
        cedula: identifier,
        rol: userRole,
        token: data.token,
      });

      // Redirección basada en Rol
      switch (userRole) {
        case 'ESTUDIANTE': navigate('/estudiante/dashboard'); break;
        case 'DOCENTE': navigate('/docente/dashboard'); break;
        case 'COORDINADOR': navigate('/coordinador/dashboard'); break;
        case 'SECRETARIA': navigate('/secretaria/dashboard'); break;
        case 'ADMINISTRADOR': navigate('/admin/dashboard'); break;
        default: navigate('/');
      }

    } catch (err: any) {
      setError(err.message || 'Fallo de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden">
      {/* Aura decorativa */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Ícono + Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
            <span className="material-symbols-outlined text-[#0c0939] text-2xl">account_circle</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
            Acceso Institucional
          </h2>
          <p className="text-sm text-slate-500 mt-1">Bienvenido al sistema de gestión universitaria</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Identifier */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Cédula o Correo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <input
                required
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="V-24.123.456 o correo@uneti.edu.ve"
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-sky-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500/20"
              />
              <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">Recordar sesión</span>
            </label>
            <a href="/recuperar-contrasena" className="text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline underline-offset-4">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center gap-2.5 bg-[#0c0939] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/15 hover:bg-[#1a164c] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Ingresar al Sistema</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">login</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400">
            ¿Necesitas validar un documento?{' '}
            <Link to="/consulta-externa" className="font-bold text-sky-600 hover:text-sky-700 hover:underline">
              Consulta Externa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
