import axios from 'axios';
import { UserRegisterFormData } from '@/entities/user/model/userSchema';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Registra un usuario real en el backend de NestJS.
 * El rol se sube en MAYÚSCULAS según el enum Roles del backend.
 * Si el backend responde error, se propaga sin simulación.
 */
export const registerUserByRole = async (
  data: UserRegisterFormData,
  token: string
): Promise<any> => {
  const payload: Record<string, any> = {
    ...data,
    rol: data.rol.toUpperCase(),
  };

  const response = await axios.post(`${API_URL}/usuarios/${data.rol.toLowerCase()}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
