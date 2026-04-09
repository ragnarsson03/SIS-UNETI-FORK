import { useState, useEffect, useCallback } from 'react';
import { UserData } from '@/types/user.types';
import { TableFilterConfig } from '@/components/tables/TableFilters';
import { getUsersFromApi } from '../api/getUsers';
import { registerUserByRole } from '../api/registerUser';
import { UserRegisterFormData } from '../model/userSchema';
import { useAuth } from '@/context/AuthContext';

export function useUserManagement() {
    const { user: authUser } = useAuth();
    
    // Estado FSD Real (sin mocks)
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Estados de filtrado
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchUsers = useCallback(async () => {
        if (!authUser?.token) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const data = await getUsersFromApi(authUser.token);
            setUsers(data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Error al obtener usuarios. Revisa el Gateway.');
        } finally {
            setIsLoading(false);
        }
    }, [authUser?.token]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Lógica de filtrado derivada del estado principal
    const filteredUsers = users.filter((user: UserData) => {
        const matchesSearch = user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                user.correo?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.rol === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.estado === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const filterConfig: TableFilterConfig[] = [
        {
            name: 'role',
            label: 'Rol',
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
                { label: 'Todos los roles', value: 'all' },
                { label: 'Administrador', value: 'ADMINISTRADOR' },
                { label: 'Docente', value: 'DOCENTE' },
                { label: 'Coordinador', value: 'COORDINADOR' },
                { label: 'Auditor', value: 'AUDITOR' },
            ]
        },
        {
            name: 'status',
            label: 'Estado',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
                { label: 'Todos los estados', value: 'all' },
                { label: 'Activo', value: 'Activo' },
                { label: 'Inactivo', value: 'Inactivo' },
            ]
        }
    ];

    const handleClearFilters = () => {
        setSearchTerm('');
        setRoleFilter('all');
        setStatusFilter('all');
    };

    const registerNewUser = async (data: UserRegisterFormData) => {
        if (!authUser?.token) throw new Error('Sesión inválida');
        
        // Mapeo / Preparación del Payload para NestJS
        const payload = { ...data };
        if ((payload as any).telefono) {
            (payload as any).telefono_principal = (payload as any).telefono;
        }

        try {
            await registerUserByRole(payload, authUser.token);
            await fetchUsers(); // Refrescamos el listado al guardar con éxito
        } catch (err: any) {
            const backendMsg = err.response?.data?.message || err.message;
            const formattedError = Array.isArray(backendMsg) ? backendMsg.join(', ') : backendMsg || 'Error al conectar con servidor';
            throw new Error(formattedError);
        }
    };

    return {
        users, // Retornamos los puros
        filteredUsers,
        isLoading,
        error,
        fetchUsers,
        searchTerm,
        setSearchTerm,
        filterConfig,
        handleClearFilters,
        registerNewUser
    };
}
