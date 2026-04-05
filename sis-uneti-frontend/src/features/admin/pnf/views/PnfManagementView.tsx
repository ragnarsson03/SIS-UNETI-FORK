import { useMemo } from 'react';
import { DashboardHero } from '@/features/admin/components/DashboardHero';
import { DataTable, Column } from '@/components/tables/DataTable';
import { TableFilters } from '@/components/tables/TableFilters';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, FileUp, Edit, Trash2 } from 'lucide-react';
import { usePnf } from '../hooks/usePnf';
import { PNFData } from '@/types/pnf.types';

export function PnfManagementView() {
    const { filteredPnfs, filterConfig, handleClearFilters } = usePnf();

    const columns: Column<PNFData>[] = useMemo(() => [
        { header: 'Código', key: 'code', className: 'font-bold text-primary-dark' },
        { header: 'Nombre del PNF', key: 'name', className: 'font-medium' },
        { header: 'Coordinador', key: 'coordinator' },
        { 
            header: 'Estado', 
            key: 'status',
            render: (item) => (
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Activo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    <span className={`text-xs font-semibold ${item.status === 'Activo' ? 'text-slate-600' : 'text-slate-500'}`}>{item.status}</span>
                </div>
            )
        },
        {
            header: 'Acciones',
            key: 'actions',
            align: 'right',
            render: () => (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
            )
        }
    ], []);

    return (
        <div className="min-h-screen pb-10">
            <DashboardHero 
                title="Gestión de PNF" 
                description="Administre los Programas Nacionales de Formación y sus coordinadores." 
                icon={GraduationCap} 
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 px-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-primary-dark tracking-tight mb-1 font-headline">
                        PNFs del Sistema
                    </h1>
                    <p className="text-slate-500 text-sm">Listado oficial de carreras y especializaciones.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-slate-100 border-none hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-5 flex gap-2">
                        <FileUp size={18} />
                        Carga CSV
                    </Button>
                    <Button className="bg-primary hover:bg-blue-600 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all">
                        <Plus size={18} />
                        Crear PNF
                    </Button>
                </div>
            </div>

            <TableFilters filters={filterConfig} onClear={handleClearFilters} />

            <DataTable 
                columns={columns} 
                data={filteredPnfs} 
                pagination={{ total: filteredPnfs.length, current: 1, onPageChange: () => {} }} 
            />
        </div>
    );
}
