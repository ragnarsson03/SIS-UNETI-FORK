import axios from 'axios';
import { UnetiUser } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const userService = {
    getUsers: async (): Promise<UnetiUser[]> => {
        try {
            const response = await axios.get(`${API_URL}/usuarios`);
            return response.data;
        } catch (error) {
            console.warn('API backend no disponible. Inyectando mock de base de datos venezolana...', error);
            // Fallback Seed para demostración
            return getVenezuelanSeedData();
        }
    },

    createUser: async (user: Partial<UnetiUser>): Promise<UnetiUser> => {
        const response = await axios.post(`${API_URL}/usuarios`, user);
        return response.data;
    }
};

const getVenezuelanSeedData = (): UnetiUser[] => [
    {
        cedula: "V-11.234.567",
        nombre: "Miguel Eduardo Pérez",
        correo: "m.perez@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=v1",
        estado: "Activo",
        ultimaConexion: "En línea",
        rol: "ADMINISTRADOR",
    },
    {
        cedula: "V-15.678.901",
        nombre: "Eliezer González",
        correo: "e.gonzalez@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=v2",
        estado: "Activo",
        ultimaConexion: "Hace 2 horas",
        rol: "DOCENTE",
        escalafon: "Titular",
        cargaHorariaMax: 20
    },
    {
        cedula: "V-22.345.678",
        nombre: "Yesmir Rodríguez",
        correo: "y.rodriguez@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=v3",
        estado: "Inactivo",
        ultimaConexion: "Hace 3 días",
        rol: "COORDINADOR"
    },
    {
        cedula: "V-27.890.123",
        nombre: "Samir Durán",
        correo: "s.duran@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=v4",
        estado: "Activo",
        ultimaConexion: "En línea",
        rol: "ESTUDIANTE",
        pnf: "Informática",
        cohorte: "2026-I",
        estadoSocioeconomico: "C"
    }
];
