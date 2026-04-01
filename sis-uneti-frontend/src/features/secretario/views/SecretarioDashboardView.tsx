import { ClipboardList } from 'lucide-react';
import { DashboardHero } from '../../shared/components/DashboardHero';

export function SecretarioDashboardView() {
    return (
        <div className="space-y-6">
            <DashboardHero 
                title="Control de Estudios"
                description="Control de estudios, expedientes y trámites administrativos."
                icon={ClipboardList}
            />
            <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                <p>Gestión administrativa centralizada.</p>
            </div>
        </div>
    );
}
