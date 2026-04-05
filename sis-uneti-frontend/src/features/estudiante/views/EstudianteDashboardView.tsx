import { DashboardHero } from '../../shared/components/DashboardHero';

export function EstudianteDashboardView() {
    return (
        <div className="space-y-6">
            <DashboardHero />
            <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                <p>Bienvenido al portal del estudiante. Aquí podrás ver tus notas y horarios.</p>
            </div>
        </div>
    );
}
