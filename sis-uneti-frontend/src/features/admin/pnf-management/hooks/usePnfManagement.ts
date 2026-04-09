import { useState, useEffect } from 'react';
import { UnetiPNF } from '../types';
import { pnfService } from '../services/pnfService';

export const usePnfManagement = () => {
    const [pnfs, setPnfs] = useState<UnetiPNF[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchPnfs = async () => {
        try {
            setIsLoading(true);
            const data = await pnfService.getPnfs();
            setPnfs(data || []);
            setError(null);
        } catch (err) {
            setPnfs([]);
            setError('Error al conectar con el servidor para obtener el catálogo de PNFs.');
            console.error("PNF fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPnfs();
    }, []);

    const handleSubmit = async (data: Partial<UnetiPNF>) => {
        try {
            await pnfService.createPnf(data);
            alert('¡El Programa Nacional de Formación se registró satisfactoriamente en SIS-UNETI!');
            closeModal();
            fetchPnfs();
        } catch (err) {
            console.error("Error creating PNF:", err);
            alert('Hubo un error al registrar el Programa Nacional.');
        }
    };

    return { pnfs, isLoading, error, isModalOpen, openModal, closeModal, handleSubmit };
};
