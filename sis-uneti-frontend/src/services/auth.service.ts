import type { Role } from '../context/AuthContext';

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  MODO MOCK — Activado temporalmente mientras el backend no tiene /auth/me
//     Para conectar a la API real, reemplaza la función getProfile()
//     con la versión comentada al final de este archivo.
// ─────────────────────────────────────────────────────────────────────────────

export interface UserProfileResponse {
    cedula: string;
    nombre: string;
    rol: Role;
    token?: string;
}

// Mapa de nombres de prueba por Rol para simular datos reales
const MOCK_USERS: Record<string, Omit<UserProfileResponse, 'rol'>> = {
    ADMINISTRADOR:  { cedula: 'V-20123456', nombre: 'Carlos Ramírez'    },
    ESTUDIANTE:     { cedula: 'V-26789012', nombre: 'Ana Martínez'       },
    DOCENTE:        { cedula: 'V-14567890', nombre: 'Prof. Luis González' },
    COORDINADOR:    { cedula: 'V-10234567', nombre: 'Dra. María Petit'    },
    SECRETARIO:     { cedula: 'V-18901234', nombre: 'Laura Sánchez'       },
    AUDITOR:        { cedula: 'V-22456789', nombre: 'José Rodríguez'      },
};

export const authService = {
    /**
     * Mock temporal: Simula un delay de red de 400ms y devuelve datos de
     * usuario basados en el rol guardado en localStorage.
     * 
     * TODO: Reemplazar por la llamada real a la API cuando el backend esté listo.
     */
    async getProfile(role?: string, cedula?: string): Promise<UserProfileResponse> {
        // Simula latencia de red real
        await new Promise(resolve => setTimeout(resolve, 400));

        const savedRole = (role || localStorage.getItem('sis_uneti_rol')) as Role;
        const savedCedula = cedula || localStorage.getItem('sis_uneti_cedula');

        if (!savedRole || !MOCK_USERS[savedRole]) {
            // Si no hay rol guardado o no es válido, rechazamos como si fuera un 401
            throw new Error('No hay sesión activa o el rol no es reconocido');
        }

        const mockUser = MOCK_USERS[savedRole];

        return {
            ...mockUser,
            cedula: savedCedula || mockUser.cedula,
            rol: savedRole,
        };
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 🔌 VERSIÓN REAL — Descomenta esto y elimina el mock cuando el backend esté listo:
    //
    // async getProfile(): Promise<UserProfileResponse> {
    //     const token = localStorage.getItem('sis_uneti_token');
    //     const response = await axios.get<UserProfileResponse>(`${API_URL}/auth/me`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     });
    //     return response.data;
    // },
    // ─────────────────────────────────────────────────────────────────────────
};