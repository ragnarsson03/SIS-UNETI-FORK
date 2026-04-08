import { useState, useEffect, useMemo } from 'react';
import { UnetiUser } from '../types';
import { userService } from '../services/userService';
import { TableFilterConfig } from '@/components/tables/TableFilters';

export const useUserManagement = () => {
    const [users, setUsers] = useState<UnetiUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtros
    const [rolFilter, setRolFilter] = useState<string>('');
    const [estadoFilter, setEstadoFilter] = useState<string>('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await userService.getUsers();
            setUsers(data || []);
            setError(null);
        } catch (err) {
            setUsers([]);
            setError('Error al obtener la lista de usuarios. El backend parece estar inactivo.');
            console.error("User fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (data: Partial<UnetiUser>) => {
        try {
            await userService.createUser(data);
            alert('¡Usuario registrado satisfactoriamente en SIS-UNETI!');
            closeModal();
            fetchUsers();
        } catch (err) {
            console.error("Error creating user:", err);
            alert('Hubo un error al registrar el usuario.');
        }
    };

    const handleClearFilters = () => {
        setRolFilter('');
        setEstadoFilter('');
    };

    const filterConfig: TableFilterConfig[] = [
        {
            name: 'rol',
            label: 'Filtrar por Rol',
            options: [
                { label: 'Todos los Roles', value: '' },
                { label: 'ADMINISTRADOR', value: 'ADMINISTRADOR' },
                { label: 'DOCENTE', value: 'DOCENTE' },
                { label: 'ESTUDIANTE', value: 'ESTUDIANTE' }
            ],
            value: rolFilter,
            onChange: setRolFilter
        },
        {
            name: 'estado',
            label: 'Filtrar por Estado',
            options: [
                { label: 'Todos los Estados', value: '' },
                { label: 'Activo', value: 'Activo' },
                { label: 'Inactivo', value: 'Inactivo' }
            ],
            value: estadoFilter,
            onChange: setEstadoFilter
        }
    ];

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            if (rolFilter && user.rol !== rolFilter) return false;
            if (estadoFilter && user.estado !== estadoFilter) return false;
            return true;
        });
    }, [users, rolFilter, estadoFilter]);

    return { 
        users: filteredUsers, 
        isLoading, 
        error, 
        isModalOpen, 
        openModal, 
        closeModal, 
        handleSubmit,
        filterConfig,
        handleClearFilters
    };
};
