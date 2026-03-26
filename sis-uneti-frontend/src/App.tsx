import { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import LoginForm from './components/LoginForm';
import { User } from './types/auth';
import { authService } from './services/auth.service';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: any) => {
    console.log('========================================');
    console.log('🔐 [App] INICIO DE LOGIN');
    console.log('========================================');
    console.log('📝 [App] Credenciales:', {
      username: credentials.username,
      role: credentials.role,
      password: '***'
    });
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📤 [App] Llamando a authService.login...');
      const data = await authService.login(
        credentials.username, 
        credentials.password, 
        credentials.role
      );

      console.log('✅ [App] Login exitoso!');
      console.log('📦 [App] Respuesta completa:', data);
      console.log('👤 [App] Datos del usuario (raw):', data.user);
      console.log('📋 [App] Campos en user:', Object.keys(data.user));
      console.log('🎭 [App] Rol desde backend (rol):', data.user.rol);
      console.log('🎭 [App] Role desde backend (role):', data.user.role);

      // NORMALIZAR DATOS DEL USUARIO
      // El backend envía: { id, cedula, rol, nombre, email }
      // El frontend espera: { id, cedula, role, nombre_completo, email }
      const normalizedUser: User = {
        id: data.user.id,
        cedula: data.user.cedula,
        email: data.user.email,
        // Mapear rol -> role
        role: data.user.role || data.user.rol,  // 👈 CORRECCIÓN AQUÍ
        // Construir nombre_completo desde nombre o nombres+apellidos
        nombre_completo: data.user.nombre_completo || data.user.nombre || `${data.user.nombres || ''} ${data.user.apellidos || ''}`.trim() || data.user.cedula,
        // Guardar también los campos individuales por si acaso
        nombres: data.user.nombres,
        apellidos: data.user.apellidos,
        nombre: data.user.nombre,
      };

      console.log('🔄 [App] Usuario normalizado:', normalizedUser);
      console.log('🎭 [App] Role final:', normalizedUser.role);
      console.log('📛 [App] Nombre completo:', normalizedUser.nombre_completo);

      // Guardar token y usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      
      console.log('💾 [App] Datos guardados en localStorage');
      console.log('========================================');
      
    } catch (err: any) {
      console.error('❌ [App] Error en login:', err);
      console.error('❌ [App] Mensaje:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('🚪 [App] Cerrando sesión');
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    console.log('🚀 [App] Inicializando aplicación');
    const savedUser = authService.getUser();
    if (savedUser) {
      console.log('✅ [App] Sesión recuperada:', savedUser);
      console.log('🎭 [App] Rol recuperado:', savedUser.role);
      setUser(savedUser);
    } else {
      console.log('📭 [App] No hay sesión activa');
    }
  }, []);

  if (user) {
    console.log('🎨 [App] Renderizando panel de bienvenida');
    console.log('👤 [App] Usuario actual:', user);
    console.log('🎭 [App] Role mostrado:', user.role);
    console.log('📛 [App] Nombre mostrado:', user.nombre_completo);
    
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="size-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            ¡Bienvenido, {user.nombre_completo || user.nombre || user.cedula}!
          </h1>
          <p className="text-slate-600 mb-2">Has ingresado exitosamente al sistema SIS-UNETI.</p>
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
            Rol: {user.role || user.rol || 'No especificado'}
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] px-6 md:px-20 py-3 z-10">
        <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
          <div className="size-8 text-[#137fec]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight uppercase">SIS-UNETI</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Sitio Institucional</a>
            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Soporte</a>
          </div>
          <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold tracking-wide hover:bg-[#0a56a4] transition-all shadow-md shadow-[#137fec]/20">
            Mesa de Ayuda
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(#137fec 0.5px, transparent 0.5px), radial-gradient(#137fec 0.5px, #f6f7f8 0.5px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }} />
        
        <LoginForm 
          onLogin={handleLogin} 
          isLoading={isLoading} 
          error={error} 
        />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm">
        <p>© 2026 UNETI - Universidad Nacional Experimental de las Telecomunicaciones e Informática. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}