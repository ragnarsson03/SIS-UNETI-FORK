import axios from 'axios';
import { UnetiPNF } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const pnfService = {
    getPnfs: async (): Promise<UnetiPNF[]> => {
        try {
            const response = await axios.get(`${API_URL}/pnfs`);
            return response.data;
        } catch (error) {
            console.warn('API backend de PNF no disponible. Retornando tabla limpia.', error);
            // Fallback de Producción: array vacío
            return [];
        }
    },

    createPnf: async (pnf: Partial<UnetiPNF>): Promise<UnetiPNF> => {
        const response = await axios.post(`${API_URL}/pnfs`, pnf);
        return response.data;
    }
};
