import { GraduationCap } from 'lucide-react';
import { DashboardHero } from '../../shared/components/DashboardHero';

export function DocenteDashboardView() {
    return (
        <div className="space-y-6">
            <DashboardHero 
                title="Gestión Docente"
                description="Gestión de notas, asistencia y planificación académica del docente."
                icon={GraduationCap}
            />
            <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                <p>Contenido detallado para docentes irá aquí.</p>
            </div>
        </div>
    );
}
