import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3000';
const STORAGE_TOKEN_KEY = 'sis_uneti_token';

export interface PnfOption {
  id: string;
  nombre: string;
}

export interface CohorteOption {
  id: string;
  nombre: string;           // Alias legible para el <select> (= codigo_cohorte)
  codigo_cohorte: string;   // Campo real de la BD — coincide con el SELECT del backend
  pnfId: string;
  estado_cohorte: string;
}

interface AcademicData {
  pnfs: PnfOption[];
  cohortes: CohorteOption[];
  isLoading: boolean;
  error: string | null;
}

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export function useAcademicData(): AcademicData {
  const [pnfs, setPnfs] = useState<PnfOption[]>([]);
  const [cohortes, setCohortes] = useState<CohorteOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    const fetchCatalogs = async () => {
      try {
        const [pnfRes, cohorteRes] = await Promise.all([
          fetch(`${API_BASE}/api/academico/pnf`, { headers: getAuthHeaders() }),
          fetch(`${API_BASE}/api/academico/cohorte`, { headers: getAuthHeaders() }),
        ]);

        if (!pnfRes.ok || !cohorteRes.ok) {
          const msg = `Error del servidor — PNF: ${pnfRes.status} | Cohorte: ${cohorteRes.status}`;
          console.error(`[useAcademicData] ${msg}`);
          if (!cancelled) setError(msg);
          return;
        }

        const pnfData: PnfOption[] = await pnfRes.json();
        const cohorteData: CohorteOption[] = await cohorteRes.json();

        if (!cancelled) {
          setPnfs(pnfData);
          setCohortes(cohorteData);
        }
      } catch (err) {
        const msg = 'No se pudo conectar con el servidor de catálogos.';
        console.error('[useAcademicData]', err);
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchCatalogs();
    return () => { cancelled = true; };
  }, []);

  return { pnfs, cohortes, isLoading, error };
}