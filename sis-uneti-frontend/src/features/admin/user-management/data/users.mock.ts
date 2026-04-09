import { UserData } from '@/types/user.types';

export const MOCK_USERS: UserData[] = [
    {
        id: "1",
        nombre: "Miguel Eduardo Pérez",
        correo: "m.perez@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=miguel",
        estado: "Activo",
        ultimaConexion: "En línea",
        rol: "ADMINISTRADOR",
        pnf: "Dirección General"
    },
    {
        id: "2",
        nombre: "Eliezer González",
        correo: "e.gonzalez@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=eliezer",
        estado: "Activo",
        ultimaConexion: "Hace 2 horas",
        rol: "DOCENTE",
        pnf: "Informática"
    },
    {
        id: "3",
        nombre: "Yesmir Rodríguez",
        correo: "y.rodriguez@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=yesmir",
        estado: "Inactivo",
        ultimaConexion: "Hace 3 días",
        rol: "COORDINADOR",
        pnf: "Logística"
    },
    {
        id: "4",
        nombre: "Samir Durán",
        correo: "s.duran@uneti.edu.ve",
        avatar: "https://i.pravatar.cc/150?u=samir",
        estado: "Activo",
        ultimaConexion: "En línea",
        rol: "ESTUDIANTE",
        pnf: "Telecomunicaciones"
    }
];
