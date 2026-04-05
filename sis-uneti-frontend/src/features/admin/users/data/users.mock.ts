/**
 * Datos de prueba para el módulo de Usuarios.
 * Deben ser reemplazados por llamadas reales a la API de NestJS.
 * Los nombres de campo coinciden con la entidad `Usuario` del backend.
 */
import { UserData } from '@/types/user.types';

export const MOCK_USERS: UserData[] = [
    {
        id: 'usr-001',
        nombre: 'Miguel Eduardo',
        correo: 'm.eduardo@uneti.edu.ve',
        pnf: 'Informática',
        rol: 'ADMINISTRADOR',
        estado: 'Activo',
        ultimaConexion: 'En línea',
        avatar: 'https://i.pravatar.cc/150?u=miguel',
    },
    {
        id: 'usr-002',
        nombre: 'Eliezer Pérez',
        correo: 'e.perez@uneti.edu.ve',
        pnf: 'Informática',
        rol: 'DOCENTE',
        estado: 'Activo',
        ultimaConexion: 'Hace 2 horas',
        avatar: 'https://i.pravatar.cc/150?u=eliezer',
    },
    {
        id: 'usr-003',
        nombre: 'Yesmir González',
        correo: 'y.gonzalez@uneti.edu.ve',
        pnf: 'Logística',
        rol: 'COORDINADOR',
        estado: 'Inactivo',
        ultimaConexion: 'Hace 3 días',
        avatar: 'https://i.pravatar.cc/150?u=yesmir',
    },
    {
        id: 'usr-004',
        nombre: 'Juan José Martínez',
        correo: 'j.martinez@uneti.edu.ve',
        pnf: 'Turismo',
        rol: 'AUDITOR',
        estado: 'Activo',
        ultimaConexion: 'Hace 10 min',
        avatar: 'https://i.pravatar.cc/150?u=juan',
    },
    {
        id: 'usr-005',
        nombre: 'Samir Durán',
        correo: 's.duran@uneti.edu.ve',
        pnf: 'Informática',
        rol: 'ADMINISTRADOR',
        estado: 'Activo',
        ultimaConexion: 'En línea',
        avatar: 'https://i.pravatar.cc/150?u=samir',
    },
];
