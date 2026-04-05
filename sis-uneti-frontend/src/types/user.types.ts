/**
 * Tipos del dominio de Usuarios del Sistema.
 * Diseñados para coincidir con la respuesta de la entidad Usuario de NestJS.
 */

export type UserRole = 'ADMINISTRADOR' | 'COORDINADOR' | 'DOCENTE' | 'AUDITOR' | 'ESTUDIANTE';
export type UserStatus = 'Activo' | 'Inactivo' | 'Suspendido';

export interface UserData {
    id: string;
    nombre: string;
    correo: string;
    pnf: string;
    rol: UserRole;
    estado: UserStatus;
    ultimaConexion: string;
    avatar?: string;
}
