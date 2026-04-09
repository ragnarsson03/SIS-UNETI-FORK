import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/tables/DataTable';
import { GraduationCap, FilePlus, Loader2 } from 'lucide-react';
import { pnfColumns } from '../components/PnfTable';
import { PnfModalForm } from '../components/PnfModalForm';
import { usePnfManagement } from '../hooks/usePnfManagement';

export function PnfView() {
    const { pnfs, isLoading, error, isModalOpen, openModal, closeModal, handleSubmit } = usePnfManagement();

    return (
        <div className="min-h-screen pb-10">
            <WelcomeBanner 
                title="Programas Nacionales de Formación (PNF)" 
                description="Gestión Académica Global del Ecosistema SIS-UNETI."
                icon={GraduationCap}
            />

            <div id="DashboardContent" className="space-y-10 mt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 sm:px-0">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Catálogo de PNF</h2>
                      <p className="text-slate-500 text-xs">Administre la oferta académica de la institución universitaria.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            onClick={openModal}
                            className="bg-primary hover:opacity-90 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all"
                        >
                            <FilePlus size={18} />
                            Nuevo PNF
                        </Button>
                    </div>
                </div>

                {isModalOpen && (
                    <PnfModalForm 
                        onClose={closeModal} 
                        onSubmit={handleSubmit} 
                    />
                )}

                <div className="space-y-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <Loader2 className="animate-spin mb-4" size={32} />
                            <p className="text-sm font-bold uppercase tracking-widest">Sincronizando Malla Académica...</p>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center">
                           <p className="text-red-500 font-bold">{error}</p>
                        </div>
                    ) : (
                        <DataTable 
                            columns={pnfColumns as any} 
                            data={pnfs as any} 
                            emptyMessage="Aún no hay Programas Nacionales de Formación (PNF) registrados."
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
