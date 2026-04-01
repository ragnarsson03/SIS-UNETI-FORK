import { DashboardHero } from '../../shared/components/DashboardHero';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
    Users, 
    UserPlus, 
    CheckCircle, 
    UserMinus, 
    FileUp, 
    Edit, 
    Key, 
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export function AdminDashboardView() {
    // Datos simulados (basados en CODIGO.HTML)
    const stats = [
        { label: 'Total Usuarios', value: '1,284', change: '+12%', icon: Users, color: 'text-primary', bg: 'bg-blue-50' },
        { label: 'Nuevos este mes', value: '45', change: '+5%', icon: UserPlus, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Usuarios Activos', value: '1,120', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Cuentas Inactivas', value: '164', icon: UserMinus, color: 'text-red-500', bg: 'bg-red-50' },
    ];

    const users = [
        { 
            name: 'Ana Martínez', 
            email: 'ana.mtz@uneti.edu.ve', 
            pnf: 'Informática', 
            role: 'DOCENTE', 
            status: 'Activo', 
            lastLogin: 'Hace 2 horas',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjW114m082YjC8I-oE68E55_NWhF6mUlR8UQ0I0XbMkPfhDU4Wc7MbxVLqzo9tkJ_2-jrsSSQGqcB8VufsGiKCdWq6JIres8YAM6XnU9doTebdjDoUzZRk9T0dd_IkLy7QwIPT-2gbXdILOM-mEV5UoICo9JGkXZzt8rEpS6w2LU5t1POuRqudC96Stl3CW64kYvIXG_1NcaoxJpr6XOLt9NDkrNT3Ut5BQCjtKnkknes8a3FWkdvC-FwdEA8YGVJc6m0ytVZYR4s'
        },
        { 
            name: 'Javier Rodríguez', 
            email: 'j.rodriguez@uneti.edu.ve', 
            pnf: 'Logística', 
            role: 'COORDINADOR', 
            status: 'Inactivo', 
            lastLogin: 'Hace 3 días',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUJCor79oR1e3xZsOT3Jj6kSwDUuFD0ANVsjrjLeGAONJ8RsKXASAZU41XyQFroLNDhVdwXcN_eVc4CvJpEExhzyvhPii-8lAZ2ST1nnzy_z9zYMOhxb6QYNMJ3Nauf4XzckPype8Kd_NIF6QKuawziIaTmAeFJtWDy48uOJaX-O8SQ53tppW4UllMaub0pXHw7HpLWU4i_nJaPTjxuARgCnhJElm1dqD87H4WLKSXvpHf2lzQGTnH_JYUsHpwzWG-Hs61dFrPQzs'
        },
        { 
            name: 'Elena Blanco', 
            email: 'e.blanco@uneti.edu.ve', 
            pnf: 'Turismo', 
            role: 'ESTUDIANTE', 
            status: 'Activo', 
            lastLogin: 'En línea',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRR7o_6J7FUhdO-rLbDbONv8518rm6TbExy5qgPZh3mMC53J5TW6cUSEIn16dPK4j--JGQua5hiev5_4OxVY9s9dvnv4xeQHLPMTLwvLMbIf8ZhGxWGSEp26R1FKyGWaiFk51mrNhMaN_fA88MU9mzImir0hD_WgKilIxmykFmt9McrnVV59C-AFOnYNP1gqfZXUb_Q3TwDAbIcvi8grei7Yd5cCJ-mJh1gqL6TGn6pPpokW-tB7fuQ9KnI2RzmhVLhaNRb0B-cqg'
        }
    ];

    return (
        <div className="min-h-screen pb-10">
            {/* Cabecera / Hero */}
            <DashboardHero />

            {/* Page Header (de CODIGO.HTML) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 px-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-primary-dark tracking-tight mb-1 font-headline">
                        Gestión de Usuarios
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Administre los accesos, roles y estados de los usuarios del sistema PROTA-UNETI.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-slate-100 border-none hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-5 flex gap-2">
                        <FileUp size={18} />
                        Carga Masiva (CSV)
                    </Button>
                    <Button className="bg-primary hover:bg-blue-600 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all">
                        <UserPlus size={18} />
                        Crear Nuevo Usuario
                    </Button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-wrap items-end gap-6 mx-4">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Rol</label>
                    <select className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-primary focus:border-primary outline-none">
                        <option>Todos los roles</option>
                        <option>Docente</option>
                        <option>Coordinador</option>
                        <option>Estudiante</option>
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Estado</label>
                    <select className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-primary focus:border-primary outline-none">
                        <option>Todos los estados</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">PNF</label>
                    <select className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-primary focus:border-primary outline-none">
                        <option>Todos los PNF</option>
                        <option>Informática</option>
                        <option>Logística</option>
                        <option>Turismo</option>
                    </select>
                </div>
                <div className="pb-1.5 px-2">
                    <button className="text-primary font-bold text-sm hover:underline">
                        Limpiar filtros
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden mx-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Usuario</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">PNF</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rol</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Última Conexión</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((u, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors pointer-cursor">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                                                <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-primary-dark">{u.name}</h3>
                                                <p className="text-[11px] text-slate-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm text-slate-600 font-medium">{u.pnf}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`
                                            px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest
                                            ${u.role === 'DOCENTE' ? 'bg-blue-50 text-blue-600' : 
                                              u.role === 'COORDINADOR' ? 'bg-purple-50 text-purple-600' : 
                                              'bg-slate-100 text-slate-600'}
                                        `}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Activo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                            <span className={`text-xs font-semibold ${u.status === 'Activo' ? 'text-slate-600' : 'text-slate-500'}`}>{u.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-xs text-slate-500">{u.lastLogin}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                <Key size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                <UserMinus size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-400">
                        Mostrando <span className="text-slate-700">3</span> de <span className="text-slate-700">128</span> usuarios registrados
                    </p>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="p-2 text-slate-400" disabled>
                            <ChevronLeft size={20} />
                        </Button>
                        <div className="flex gap-1">
                            <button className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold">1</button>
                            <button className="w-8 h-8 rounded-lg bg-white text-slate-600 text-xs font-bold hover:bg-slate-100">2</button>
                            <button className="w-8 h-8 rounded-lg bg-white text-slate-600 text-xs font-bold hover:bg-slate-100">3</button>
                        </div>
                        <Button variant="ghost" size="sm" className="p-2 text-slate-400">
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 mx-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center`}>
                                <s.icon size={22} />
                            </div>
                            {s.change && (
                                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                                    {s.change}
                                </span>
                            )}
                        </div>
                        <h4 className="text-2xl font-extrabold text-primary-dark font-headline">{s.value}</h4>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}