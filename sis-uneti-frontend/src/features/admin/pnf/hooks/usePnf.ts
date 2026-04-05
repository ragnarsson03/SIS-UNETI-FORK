import { useState, useMemo } from 'react';
import { MOCK_PNFS } from '../data/pnf.mock';
import { TableFilterConfig } from '@/components/tables/TableFilters';

export function usePnf() {
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredPnfs = useMemo(() => {
        return MOCK_PNFS.filter(pnf => statusFilter === 'all' || pnf.status === statusFilter);
    }, [statusFilter]);

    const filterConfig: TableFilterConfig[] = [
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

    const handleClearFilters = () => setStatusFilter('all');

    return {
        filteredPnfs,
        filterConfig,
        handleClearFilters
    };
}
