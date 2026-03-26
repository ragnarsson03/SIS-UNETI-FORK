import { AuthResponse, UserRole } from '../types/auth';

export const authService = {
  async login(username: string, password: string, role: UserRole): Promise<AuthResponse> {
    console.log('📤 [AuthService] Enviando petición al servidor...');
    console.log('   - URL: /api/auth/login');
    console.log('   - Usuario:', username);
    console.log('   - Rol seleccionado (frontend):', role);
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cedula: username, clave: password }),
    });

    console.log('📥 [AuthService] Respuesta HTTP:', response.status, response.statusText);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ [AuthService] Respuesta no es JSON:', contentType);
      throw new Error('El servidor no respondió con un formato válido (JSON). Por favor, intente de nuevo.');
    }

    const data = await response.json();
    console.log('📦 [AuthService] Datos recibidos del servidor:', data);
    
    if (!response.ok) {
      console.error('❌ [AuthService] Error en respuesta:', data.message);
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    // Log detallado de los datos del usuario
    if (data.user) {
      console.log('👤 [AuthService] Datos del usuario (backend):', data.user);
      console.log('📋 [AuthService] Campos disponibles:', Object.keys(data.user));
      console.log('🎭 [AuthService] Rol (backend - campo "rol"):', data.user.rol);
      console.log('🎭 [AuthService] Role (backend - campo "role"):', data.user.role);
    }

    return data;
  },

  logout() {
    console.log('🚪 [AuthService] Cerrando sesión');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    const token = localStorage.getItem('token');
    console.log('🔑 [AuthService] Token obtenido:', token ? '✓ Existe' : '✗ No existe');
    return token;
  },

  getUser() {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser) {
      console.log('👤 [AuthService] Usuario recuperado de localStorage:', parsedUser);
      console.log('🎭 [AuthService] Role recuperado:', parsedUser.role);
    }
    return parsedUser;
  }
};