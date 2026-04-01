import { ShieldCheck } from 'lucide-react';
import { DashboardHero } from '../../shared/components/DashboardHero';

export function AuditorDashboardView() {
    return (
        <div className="space-y-6">
            <DashboardHero 
                title="Auditoría de Sistemas"
                description="Auditoría de sistemas, logs y trazabilidad de operaciones."
                icon={ShieldCheck}
            />
            <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                <p>Monitoreo de actividad y seguridad.</p>
            </div>
        </div>
    );
}
