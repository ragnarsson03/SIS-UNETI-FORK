import { ShieldCheck, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';

export function AuditorDashboardView() {
    const stats = [
        { label: 'Acciones Realizadas', value: '1,284', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Intentos Fuera de Rango', value: '12', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Integridad Sistema', value: '100%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-6">
            <WelcomeBanner 
                title="Auditoría de Sistemas"
                description="Panel de revisión y trazabilidad forense de operaciones administrativas."
                icon={ShieldCheck}
            />

            <div id="DashboardContent" className="px-4 md:px-0 space-y-8">
                {/* Métricas de Trazabilidad */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                    <s.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-extrabold text-primary-dark font-headline">{s.value}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                    <p>Monitoreo continuo de actividad y seguridad criptográfica.</p>
                </div>
            </div>
        </div>
    );
}
