import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Role } from '../../context/AuthContext';

export default function Autentication() {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Traemos el motor de navegación de React Router y nuestro contexto global
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Petición al API Gateway (Microservicio Auth Célula 01)
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula, clave }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación perimetral');
      }

      // El Gateway nos dirá si es Estudiante, Admin, Docente, etc.
      const rolDelUsuario = (data.rol || 'ESTUDIANTE') as Role;
      
      console.log(`✅ [RBAC] Autenticado exitosamente - Asignando bóveda para: ${rolDelUsuario}`);
      
      // Inyectamos el usuario en el CORE del Frontend (Contexto)
      login({
        cedula: cedula,
        rol: rolDelUsuario,
        token: data.token,
      });

      // El enrutador central de App.tsx usará el Switch en las rutas. Nosotros solo ordenamos el viaje:
      switch (rolDelUsuario) {
        case 'ESTUDIANTE': navigate('/estudiante/dashboard'); break;
        case 'DOCENTE': navigate('/docente/dashboard'); break;
        case 'COORDINADOR': navigate('/coordinador/dashboard'); break;
        case 'SECRETARIA': navigate('/secretaria/dashboard'); break;
        case 'ADMINISTRADOR': navigate('/admin/dashboard'); break;
        default: throw new Error('Rol no posicionado en la matriz del ecosistema.');
      }

    } catch (err: any) {
      setError(err.message || 'Fallo de orquestación con el API Gateway local.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-sky-800 to-slate-900 py-12 sm:px-6 lg:px-8">
      {/* HEADER / LOGO */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-center">
          <img
            src="https://github.com/user-attachments/assets/8ea70b44-b464-42e8-b9cd-211a65ba37f8"
            alt="Logo UNETI Oficial"
            className="h-28 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
          Portal SIS-UNETI
        </h2>
        <p className="mt-2 text-center text-sm text-sky-200">
          Infraestructura de Roles y Microservicios
        </p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-xl py-8 px-4 shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/20 sm:rounded-3xl sm:px-10">

          {/* Mensaje de Error (Caja Roja Glass) */}
          {error && (
            <div className="bg-red-500/20 border-l-4 border-red-500 text-red-100 px-4 py-3 rounded mb-6 flex items-center shadow-lg transition-all">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Input Cédula */}
            <div>
              <label htmlFor="cedula" className="block text-sm font-semibold text-sky-100">
                Credencial Operativa (Cédula)
              </label>
              <div className="mt-2 relative">
                <input
                  id="cedula"
                  name="cedula"
                  type="text"
                  required
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-400/30 text-white placeholder-sky-200/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/10 transition-colors sm:text-sm"
                  placeholder="Ej: 24.123.456"
                />
              </div>
            </div>

            {/* Input Clave */}
            <div>
              <label htmlFor="clave" className="block text-sm font-semibold text-sky-100">
                Llave Criptográfica (Contraseña)
              </label>
              <div className="mt-2 relative">
                <input
                  id="clave"
                  name="clave"
                  type="password"
                  required
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-400/30 text-white placeholder-sky-200/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/10 transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Opciones Adicionales */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded bg-white/10"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-sky-200">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="/recuperar-contrasena" className="font-semibold text-sky-300 hover:text-white transition-colors hover:underline">
                  ¿Protocolo de Emergencia?
                </a>
              </div>
            </div>

            {/* Botón Central */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-sky-900 bg-sky-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verificando Perímetro...
                  </span>
                ) : (
                  'Ingresar al Ecosistema'
                )}
              </button>
            </div>
          </form>

          {/* Separador de Zona Pública */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-slate-300 font-medium tracking-widest uppercase text-xs">
                  Red Externa
                </span>
              </div>
            </div>

            {/* Boton Zona Externa */}
            <div className="mt-6 flex justify-center">
              <a href="/consulta-externa" className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-300/30 rounded-xl shadow-sm bg-black/20 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors">
                🔍 Validar Constancias Oficiales QR
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}