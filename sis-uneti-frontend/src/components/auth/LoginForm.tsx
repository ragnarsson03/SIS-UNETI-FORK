import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, Role } from '../../context/AuthContext';
import unetiLogo from '@/assets/logo_uneti_fondo_blanco.jpeg';

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

            // === DIAGNÓSTICO (temp): Ver exactamente qué devuelve el backend ===
            console.log('[LOGIN DEBUG] Respuesta completa:', JSON.stringify(data));
            console.log('[LOGIN DEBUG] data.user?.rol =', data.user?.rol, '| data.rol =', data.rol);

            // Extraemos el rol soportando ambas estructuras de respuesta: data.user.rol y data.rol
            const rawRol = data.user?.rol ?? data.rol ?? 'ESTUDIANTE';
            const userRole = String(rawRol).trim().toUpperCase() as Role;

            console.log('[LOGIN DEBUG] userRole final =', JSON.stringify(userRole));

            // Mapeo seguro contra el API Gateway (Extrae accessToken como token, y extrae nombre)
            const validToken = data.accessToken ?? data.token;
            const validNombre = data.user?.nombre ?? data.nombre;

            login({
                cedula: identifier,
                rol: userRole,
                token: validToken,
                nombre: validNombre,
            });

            // Mapa de rutas — más robusto que switch ante cualquier inconsistencia de tipo
            const RUTAS: Record<string, string> = {
                ADMINISTRADOR: '/admin/dashboard',
                ESTUDIANTE: '/estudiante/dashboard',
                DOCENTE: '/docente/dashboard',
                COORDINADOR: '/coordinador/dashboard',
                SECRETARIO: '/secretario/dashboard',
            };
            const destino = RUTAS[String(userRole)] ?? '/estudiante/dashboard';
            console.log('[LOGIN DEBUG] Navegando a:', destino);
            navigate(destino);
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden min-h-[550px]" style={{ backgroundColor: '#161c2d' }}>

            {/* LEFT PANE - Blue Info Panel */}
            <div className="hidden lg:flex flex-col w-[45%] justify-center px-10 py-12 relative overflow-hidden" style={{ backgroundColor: '#1089f2' }}>
                <div className="relative z-10 flex flex-col h-full">
                    {/* Logo container */}
                    <div className="mb-8 w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg shadow-blue-900/20">
                        <img src={unetiLogo} alt="UNETI Logo" className="w-full object-contain" />
                    </div>

                    <h1 className="text-white text-4xl font-black tracking-tight leading-tight mb-4">
                        Gestión Académica de Vanguardia
                    </h1>

                    <p className="text-blue-100 text-[15px] leading-relaxed mb-10 max-w-sm">
                        Bienvenido al sistema integrado de la Universidad Nacional Experimental de las Telecomunicaciones e Informática.
                    </p>

                    <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border border-blue-200/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[12px]">verified_user</span>
                            </div>
                            <span className="text-blue-50 text-sm font-medium">Autenticación Institucional Segura</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border border-blue-200/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[12px]">menu_book</span>
                            </div>
                            <span className="text-blue-50 text-sm font-medium">Seguimiento Académico en Tiempo Real</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border border-blue-200/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[12px]">group</span>
                            </div>
                            <span className="text-blue-50 text-sm font-medium">Integración de Procesos Administrativos</span>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
            </div>

            {/* RIGHT PANE - Form Panel */}
            <div className="w-full lg:w-[55%] px-8 py-12 md:px-14 flex flex-col justify-center bg-white">

                <div className="mb-8">
                    <h2 className="text-slate-900 text-3xl font-bold mb-1 tracking-wide">Iniciar Sesión</h2>
                    <p className="text-slate-500 text-sm">Sistema de Gestión Académica SIS-UNETI</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start gap-2">
                        <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Cédula/Usario */}
                    <div className="space-y-2">
                        <label htmlFor="identifier" className="block text-xs font-semibold text-slate-700">
                            Usuario / Cédula Institucional
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined text-[18px]">person</span>
                            </div>
                            <input
                                id="identifier"
                                required
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Ej: V12345678"
                                autoComplete="username"
                                className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 hover:border-slate-300 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                                Contraseña
                            </label>
                            <Link to="/auth/recuperar-contrasena" className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-medium">
                                ¿Olvidó su contraseña?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined text-[18px]">lock</span>
                            </div>
                            <input
                                id="password"
                                required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full h-11 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 hover:border-slate-300 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Recordar sesión */}
                    <div className="flex items-center pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                />
                                <div className="w-4 h-4 rounded-sm border border-slate-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"></div>
                                <span className="material-symbols-outlined text-white text-[12px] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                            </div>
                            <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors font-medium">Recordar mi sesión</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 mt-4 flex items-center justify-center gap-2 bg-[#1089f2] text-white rounded-lg font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </>
                        ) : (
                            <>
                                <span>Ingresar al Sistema</span>
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer info in right pane */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-[10px] text-center text-slate-400 leading-relaxed max-w-sm mx-auto">
                        Al iniciar sesión, usted acepta los{' '}
                        <a href="#" className="underline hover:text-slate-600">Términos de Servicio</a>{' '}
                        y la{' '}
                        <a href="#" className="underline hover:text-slate-600">Política de Privacidad</a>.<br />
                        ¿Necesita ayuda? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contacte al Soporte IT UNETI</a>
                    </p>
                </div>
            </div>
        </div>
    );
}