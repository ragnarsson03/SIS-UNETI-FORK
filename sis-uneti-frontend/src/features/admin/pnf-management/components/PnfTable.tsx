import { Column } from '@/components/tables/DataTable';
import { UnetiPNF } from '../types';
import { Edit, Route, GraduationCap } from 'lucide-react';

export const pnfColumns: Column<UnetiPNF>[] = [
    {
        header: 'PNF',
        key: 'nombre_programa',
        render: (p: UnetiPNF) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-primary">
                    <GraduationCap size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-primary-dark">{p.nombre_programa}</h3>
                    <p className="text-[11px] text-slate-500 font-mono tracking-widest">{p.codigo_institucional}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Trayectos', 
        key: 'trayectos' as keyof UnetiPNF,
        render: (p: UnetiPNF) => (
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <Route size={14} className="text-orange-500" />
                {p.trayectos} Años
            </div>
        )
    },
    {
        header: 'Estado',
        key: 'estado_academico',
        render: (p: UnetiPNF) => (
            <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${p.estado_academico === 'Activo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                <span className={`text-xs font-semibold ${p.estado_academico === 'Activo' ? 'text-slate-600' : 'text-slate-500'}`}>
                    {p.estado_academico}
                </span>
            </div>
        )
    },
    {
        header: 'Acciones',
        key: 'id_pnf' as keyof UnetiPNF,
        align: 'right',
        render: () => (
            <div className="flex items-center justify-end gap-1">
                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit size={18} /></button>
            </div>
        )
    }
];
