import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/tables/DataTable';
import { TableFilters } from '@/components/tables/TableFilters';
import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';
import { UserRegisterForm } from '../components/UserModalForm';
import { UserStatsOverview } from '../components/UserStatsOverview';
import { useUsers } from '../hooks/useUserManagement';
import { UserData } from '@/types/user.types';
import { 
    UserPlus, 
    UserMinus, 
    FileUp, 
    Edit, 
    Key, 
    Users
} from 'lucide-react';

export function UsersView() {
    const { user } = useAuth();
    const { filteredUsers, filterConfig, handleClearFilters } = useUsers();
    const [isRegistering, setIsRegistering] = useState(false);

    const columns: Column<UserData>[] = useMemo(() => [
        {
            header: 'Usuario',
            key: 'nombre',
            render: (u) => (
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                        <img src={u.avatar} alt={u.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-primary-dark">{u.nombre}</h3>
                        <p className="text-[11px] text-slate-500">{u.correo}</p>
                    </div>
                </div>
            )
        },
        { header: 'PNF', key: 'pnf', className: 'text-sm text-slate-600 font-medium' },
        { 
            header: 'Rol', 
            key: 'rol',
            render: (u) => (
                <span className={`
                    px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest
                    ${u.rol === 'ADMINISTRADOR' ? 'bg-red-50 text-red-600' : 
                      u.rol === 'COORDINADOR' ? 'bg-purple-50 text-purple-600' : 
                      u.rol === 'DOCENTE' ? 'bg-blue-50 text-blue-600' :
                      'bg-slate-100 text-slate-600'}
                `}>
                    {u.rol}
                </span>
            )
        },
        {
            header: 'Estado',
            key: 'estado',
            render: (u) => (
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    <span className={`text-xs font-semibold ${u.estado === 'Activo' ? 'text-slate-600' : 'text-slate-500'}`}>{u.estado}</span>
                </div>
            )
        },
        { header: 'Última Conexión', key: 'ultimaConexion', className: 'text-xs text-slate-500' },
        {
            header: 'Acciones',
            key: 'actions',
            align: 'right',
            render: () => (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Key size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><UserMinus size={18} /></button>
                </div>
            )
        }
    ], []);

    return (
        <div className="min-h-screen pb-10">
            <WelcomeBanner 
                title="Gestión de Usuarios" 
                description="Administre los perfiles y permisos de usuario registrados en UNETI."
                icon={Users}
            />

            <div id="DashboardContent" className="space-y-10 mt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 sm:px-0">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Panel de Control</h2>
                      <p className="text-slate-500 text-xs">Administre los accesos y roles de {user?.nombre || 'el equipo'}.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="bg-slate-100 border-none hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-5 flex gap-2">
                            <FileUp size={18} />
                            Carga Masiva
                        </Button>
                        <Button 
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="bg-primary hover:bg-blue-600 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all"
                        >
                            <UserPlus size={18} />
                            {isRegistering ? 'Volver a la Lista' : 'Nuevo Usuario'}
                        </Button>
                    </div>
                </div>

                {isRegistering ? (
                    <div className="mt-8">
                        <UserRegisterForm 
                            onCancel={() => setIsRegistering(false)} 
                            onSuccess={() => {
                                setIsRegistering(false);
                                alert('Usuario registrado con éxito (Simulación)');
                            }} 
                        />
                    </div>
                ) : (
                    <>
                        <UserStatsOverview />
                        <div className="space-y-6">
                            <TableFilters filters={filterConfig} onClear={handleClearFilters} />
                            <DataTable 
                                columns={columns} 
                                data={filteredUsers} 
                                emptyMessage="No se encontraron usuarios con esos filtros."
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
