import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHero } from '@/features/shared/components/DashboardHero';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TableFilters, TableFilterConfig } from '@/features/shared/components/TableFilters';
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

export function UsersManagementView() {
    // Estados para filtros
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Datos mock con compañeros
    const allUsers = [
        { 
            name: 'Miguel Eduardo', 
            email: 'm.eduardo@uneti.edu.ve', 
            pnf: 'Informática', 
            role: 'ADMINISTRADOR', 
            status: 'Activo', 
            lastLogin: 'En línea',
            avatar: 'https://i.pravatar.cc/150?u=miguel'
        },
        { 
            name: 'Eliezer', 
            email: 'e.eliezer@uneti.edu.ve', 
            pnf: 'Informática', 
            role: 'DOCENTE', 
            status: 'Activo', 
            lastLogin: 'Hace 2 horas',
            avatar: 'https://i.pravatar.cc/150?u=eliezer'
        },
        { 
            name: 'Yesmir', 
            email: 'y.yesmir@uneti.edu.ve', 
            pnf: 'Logística', 
            role: 'COORDINADOR', 
            status: 'Inactivo', 
            lastLogin: 'Hace 3 días',
            avatar: 'https://i.pravatar.cc/150?u=yesmir'
        },
        { 
            name: 'Juan Jose', 
            email: 'j.juan@uneti.edu.ve', 
            pnf: 'Turismo', 
            role: 'AUDITOR', 
            status: 'Activo', 
            lastLogin: 'Hace 10 min',
            avatar: 'https://i.pravatar.cc/150?u=juan'
        }
    ];

    // Filtrado real
    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => {
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            return matchesRole && matchesStatus;
        });
    }, [roleFilter, statusFilter]);

    const stats = [
        { label: 'Total Usuarios', value: '1,284', change: '+12%', icon: Users, color: 'text-primary', bg: 'bg-blue-50' },
        { label: 'Nuevos este mes', value: '45', change: '+5%', icon: UserPlus, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Usuarios Activos', value: '1,120', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Cuentas Inactivas', value: '164', icon: UserMinus, color: 'text-red-500', bg: 'bg-red-50' },
    ];

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
        setRoleFilter('all');
        setStatusFilter('all');
    };

    const { user } = useAuth();

    return (
        <div className="min-h-screen pb-10">
            <DashboardHero />

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 px-4 sm:px-0">
                <div>
                    <h1 className="text-3xl font-extrabold text-primary-dark tracking-tight mb-1 font-headline">
                        Gestión de Usuarios
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Administre los accesos y roles de {user?.nombre || 'el equipo'}.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-slate-100 border-none hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-5 flex gap-2">
                        <FileUp size={18} />
                        Carga Masiva
                    </Button>
                    <Button className="bg-primary hover:bg-blue-600 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all">
                        <UserPlus size={18} />
                        Nuevo Usuario
                    </Button>
                </div>
            </div>

            <TableFilters filters={filterConfig} onClear={handleClearFilters} />

            <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden mx-4 sm:mx-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
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
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                                    <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-primary-dark">{u.name}</h3>
                                                    <p className="text-[11px] text-slate-500">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-600 font-medium">{u.pnf}</td>
                                        <td className="px-8 py-5">
                                            <span className={`
                                                px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest
                                                ${u.role === 'ADMINISTRADOR' ? 'bg-red-50 text-red-600' : 
                                                  u.role === 'COORDINADOR' ? 'bg-purple-50 text-purple-600' : 
                                                  u.role === 'DOCENTE' ? 'bg-blue-50 text-blue-600' :
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
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit size={18} /></button>
                                                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Key size={18} /></button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><UserMinus size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-10 text-center text-slate-400 text-sm italic">
                                        No se encontraron usuarios con esos filtros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-400">
                        Mostrando <span className="text-slate-700">{filteredUsers.length}</span> resultados
                    </p>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="p-2 text-slate-400" disabled><ChevronLeft size={20} /></Button>
                        <button className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold">1</button>
                        <Button variant="ghost" size="sm" className="p-2 text-slate-400" disabled><ChevronRight size={20} /></Button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 mx-4 sm:mx-0">
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