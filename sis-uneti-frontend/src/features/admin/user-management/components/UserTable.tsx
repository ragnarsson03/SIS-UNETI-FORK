import { Column } from '@/components/tables/DataTable';
import { UnetiUser } from '../types';
import { Edit, Key, UserMinus } from 'lucide-react';

export const userColumns: Column<UnetiUser>[] = [
    {
        header: 'Usuario',
        key: 'nombre',
        render: (u) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
                    <img src={u.avatar} alt={u.nombre} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-uneti-blue dark:text-white">{u.nombre}</h3>
                    <p className="text-[11px] text-slate-500">{u.correo}</p>
                </div>
            </div>
        )
    },
    {
        header: 'Rol',
        key: 'rol',
        render: (u) => {
            let classes = '';
            switch (u.rol) {
                case 'ESTUDIANTE': classes = 'bg-uneti-blue/10 text-uneti-blue border border-uneti-blue/20'; break;
                case 'DOCENTE': classes = 'bg-uneti-orange/10 text-uneti-orange border border-uneti-orange/20'; break;
                case 'ADMINISTRADOR':
                case 'COORDINADOR':
                case 'SECRETARIO': classes = 'bg-uneti-purple/10 text-uneti-purple border border-uneti-purple/20'; break;
            }
            return (
                <span className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${classes}`}>
                    {u.rol}
                </span>
            );
        }
    },
    {
        header: 'Datos Específicos',
        key: 'detalles',
        render: (u) => {
            if (u.rol === 'ESTUDIANTE') {
                return (
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest leading-tight">{u.pnf}</span>
                        <span className="text-[10px] text-slate-500 mt-1 uppercase">Cohorte: {u.cohorte}</span>
                    </div>
                );
            }
            if (u.rol === 'DOCENTE') {
                return (
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-uneti-orange uppercase tracking-widest leading-tight">{u.escalafon}</span>
                        <span className="text-[10px] text-slate-500 mt-1 uppercase">{u.cargaHorariaMax} Hrs Max</span>
                    </div>
                );
            }
            return <span className="text-[10px] bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded text-slate-500 font-bold uppercase border border-slate-200 dark:border-white/5">Gestión Administrativa</span>;
        }
    },
    {
        header: 'Estado',
        key: 'estado',
        render: (u) => (
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${u.estado === 'Activo' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-slate-300'}`}></span>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${u.estado === 'Activo' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>{u.estado}</span>
            </div>
        )
    },
    { header: 'Última Conexión', key: 'ultimaConexion', className: 'text-xs font-medium text-slate-500' },
    {
        header: 'Acciones',
        key: 'actions',
        align: 'right',
        render: () => (
            <div className="flex items-center justify-end gap-1">
                <button className="p-2 text-slate-400 hover:text-uneti-blue transition-all hover:scale-110"><Edit size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-uneti-orange transition-all hover:scale-110"><Key size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-red-500 transition-all hover:scale-110"><UserMinus size={18} /></button>
            </div>
        )
    }
];
