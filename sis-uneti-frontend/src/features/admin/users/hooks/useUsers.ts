import { useState, useMemo } from 'react';
import { MOCK_USERS } from '../data/users.mock';
import { TableFilterConfig } from '@/components/tables/TableFilters';

export function useUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter(user => {
            const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  user.correo.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.rol === roleFilter;
            const matchesStatus = statusFilter === 'all' || user.estado === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [searchTerm, roleFilter, statusFilter]);

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

    return {
        filteredUsers,
        searchTerm,
        setSearchTerm,
        filterConfig,
        handleClearFilters
    };
}
