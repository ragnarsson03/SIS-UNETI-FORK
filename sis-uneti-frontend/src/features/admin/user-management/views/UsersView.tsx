import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/tables/DataTable';
import { TableFilters } from '@/components/tables/TableFilters';
import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';
import { UserModalForm } from '@/features/admin/user-management/components/UserModalForm';
import { UserStatsOverview } from '@/features/admin/user-management/components/UserStatsOverview';
import { useUserManagement } from '@/features/admin/user-management/hooks/useUserManagement';
import { UnetiUser } from '@/features/admin/user-management/types';
import { 
    UserPlus, 
    UserMinus, 
    FileUp, 
    Edit, 
    Key, 
    Users,
    Loader2
} from 'lucide-react';

export function UsersView() {
    const { user } = useAuth();
    // Consumimos el hook que está enlazado a NestJS!
    const { 
        users, 
        isLoading, 
        error, 
        isModalOpen, 
        openModal, 
        closeModal, 
        handleSubmit,
        filterConfig,
        handleClearFilters
    } = useUserManagement();

    // La UI exacta que amas con el estilo idéntico de renderizado
    const columns: Column<UnetiUser>[] = useMemo(() => [
        {
            header: 'Usuario',
            key: 'nombre',
            render: (u: UnetiUser) => (
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
        { 
            header: 'PNF', 
            key: 'pnf' as keyof UnetiUser, 
            className: 'text-sm text-slate-600 font-medium',
            render: (u: UnetiUser) => {
                if ('pnf' in u) return u.pnf;
                return <span className="text-slate-400 italic">-</span>;
            }
        },
        { 
            header: 'Rol', 
            key: 'rol',
            render: (u: UnetiUser) => (
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
            render: (u: UnetiUser) => (
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    <span className={`text-xs font-semibold ${u.estado === 'Activo' ? 'text-slate-600' : 'text-slate-500'}`}>{u.estado}</span>
                </div>
            )
        },
        { header: 'Última Conexión', key: 'ultimaConexion', className: 'text-xs text-slate-500' },
        {
            header: 'Acciones',
            key: 'actions' as keyof UnetiUser,
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
                            onClick={openModal}
                            className="bg-primary hover:opacity-90 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all"
                        >
                            <UserPlus size={18} />
                            {isModalOpen ? 'Volver a la Lista' : 'Nuevo Usuario'}
                        </Button>
                    </div>
                </div>

                {isModalOpen ? (
                    <div className="mt-8">
                        <UserModalForm 
                            onClose={closeModal} 
                            onSubmit={handleSubmit} 
                        />
                    </div>
                ) : (
                    <>
                        <UserStatsOverview />
                        <div className="space-y-6">
                            <TableFilters filters={filterConfig as any} onClear={handleClearFilters} />
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                    <Loader2 className="animate-spin mb-4" size={32} />
                                    <p className="text-sm font-bold uppercase tracking-widest">Sincronizando con backend...</p>
                                </div>
                            ) : error ? (
                                <div className="py-20 text-center">
                                   <p className="text-red-500 font-bold">{error}</p>
                                </div>
                            ) : (
                                <DataTable 
                                    columns={columns} 
                                    data={users} 
                                    emptyMessage="No se encontraron usuarios con esos filtros."
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
