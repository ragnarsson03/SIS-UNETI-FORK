import { useState, useMemo } from 'react';
import { DashboardHero } from '@/features/admin/components/DashboardHero';
import { DataTable, Column } from '@/components/tables/DataTable';
import { TableFilters, TableFilterConfig } from '@/components/tables/TableFilters';
import { History, Search } from 'lucide-react';

interface AuditLog {
    id: string;
    date: string;
    user: string;
    action: string;
    module: string;
    severity: 'Bajo' | 'Medio' | 'Alto';
}

export function AuditLogsView() {
    const [moduleFilter, setModuleFilter] = useState('all');

    const logs: AuditLog[] = [
        { id: '1', date: '2026-04-01 14:20', user: 'Miguel Eduardo', action: 'Login exitoso', module: 'Auth', severity: 'Bajo' },
        { id: '2', date: '2026-04-01 14:25', user: 'Yesmir', action: 'Creación de PNF', module: 'PNF', severity: 'Medio' },
        { id: '3', date: '2026-04-01 14:30', user: 'Eliezer', action: 'Modificación de Notas', module: 'Académico', severity: 'Alto' },
        { id: '4', date: '2026-04-01 14:35', user: 'Juan Jose', action: 'Eliminación de Log', module: 'Auditoría', severity: 'Alto' },
    ];

    const filteredLogs = useMemo(() => {
        return logs.filter(log => moduleFilter === 'all' || log.module === moduleFilter);
    }, [moduleFilter]);

    const columns: Column<AuditLog>[] = [
        { header: 'Fecha', key: 'date', className: 'text-slate-500 text-xs' },
        { header: 'Usuario', key: 'user', className: 'font-bold' },
        { header: 'Acción', key: 'action' },
        { header: 'Módulo', key: 'module' },
        { 
            header: 'Severidad', 
            key: 'severity',
            render: (item) => (
                <span className={`
                    px-2 py-0.5 rounded-full text-[10px] font-bold uppercase
                    ${item.severity === 'Bajo' ? 'bg-green-50 text-green-600' : 
                      item.severity === 'Medio' ? 'bg-orange-50 text-orange-600' : 
                      'bg-red-50 text-red-600'}
                `}>
                    {item.severity}
                </span>
            )
        }
    ];

    const filterConfig: TableFilterConfig[] = [
        {
            name: 'module',
            label: 'Módulo',
            value: moduleFilter,
            onChange: setModuleFilter,
            options: [
                { label: 'Todos los módulos', value: 'all' },
                { label: 'Auth', value: 'Auth' },
                { label: 'PNF', value: 'PNF' },
                { label: 'Académico', value: 'Académico' },
                { label: 'Auditoría', value: 'Auditoría' },
            ]
        }
    ];

    const handleClearFilters = () => setModuleFilter('all');

    return (
        <div className="min-h-screen pb-10">
            <DashboardHero 
                title="Auditoría del Sistema" 
                description="Seguimiento de las operaciones y trazabilidad de los usuarios." 
                icon={History} 
            />

            <div className="flex items-center justify-between mb-8 px-4">
                <h1 className="text-3xl font-extrabold text-primary-dark tracking-tight font-headline">Logs de Actividad</h1>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Buscar en logs..." />
                </div>
            </div>

            <TableFilters filters={filterConfig} onClear={handleClearFilters} />

            <DataTable 
                columns={columns} 
                data={filteredLogs} 
                pagination={{ total: filteredLogs.length, current: 1, onPageChange: () => {} }} 
            />
        </div>
    );
}
