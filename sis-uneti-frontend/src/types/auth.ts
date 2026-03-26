export interface User {
  id: string;
  cedula: string;
  email: string;
  role: string;              // Campo principal para el frontend
  nombre_completo?: string;  // Nombre completo para mostrar
  // Campos adicionales que pueden venir del backend
  rol?: string;              // Para compatibilidad
  nombre?: string;           // Nombre simple
  nombres?: string;          // Nombres separados
  apellidos?: string;        // Apellidos
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type UserRole = 'ESTUDIANTE' | 'DOCENTE' | 'SECRETARIA' | 'COORDINADOR' | 'ADMINISTRADOR' | 'AUDITOR';