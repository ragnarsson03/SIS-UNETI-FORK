export type UnetiRole = 'ADMINISTRADOR' | 'COORDINADOR' | 'SECRETARIO' | 'DOCENTE' | 'ESTUDIANTE';

interface BaseUnetiUser {
    cedula: string;
    nombre: string;
    correo: string;
    avatar: string;
    estado: 'Activo' | 'Inactivo';
    ultimaConexion: string;
}

export interface AdminUser extends BaseUnetiUser {
    rol: 'ADMINISTRADOR' | 'COORDINADOR' | 'SECRETARIO';
}

export interface TeacherUser extends BaseUnetiUser {
    rol: 'DOCENTE';
    escalafon: string;
    cargaHorariaMax: number;
}

export interface StudentUser extends BaseUnetiUser {
    rol: 'ESTUDIANTE';
    pnf: string;
    cohorte: string;
    estadoSocioeconomico: string;
}

export type UnetiUser = AdminUser | TeacherUser | StudentUser;
