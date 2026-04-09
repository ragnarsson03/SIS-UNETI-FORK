import axios from 'axios';
import { UserData } from '@/types/user.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Obtiene la lista de usuarios del Gateway de manera estricta, sin usar mocks.
 * Si el backend falla, arrojará el error hacia la capa UI.
 */
export const getUsersFromApi = async (token: string): Promise<UserData[]> => {
  const response = await axios.get(`${API_URL}/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data || [];
};
