import { DashboardHero } from '../../shared/components/DashboardHero';

export function CoordinatorDashboardView() {
    return (
        <div className="space-y-6">
            <DashboardHero />
            <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                <p>Gestión del PNF y coordinación académica.</p>
            </div>
        </div>
    );
}
