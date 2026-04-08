import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';
import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';

export function EstudianteDashboardView() {
    // Icons
    const CheckCircle = BookOpen;

    const stats = [
        { label: 'Índice Académico', value: '18.2', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'U.C. Aprobadas', value: '142', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Semestre Actual', value: '7mo', icon: GraduationCap, color: 'text-primary', bg: 'bg-primary/5' },
    ];

    return (
        <div className="space-y-6">
            <WelcomeBanner />

            <div id="DashboardContent" className="px-4 md:px-0 space-y-8">
                {/* Métricas del Estudiante */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                            <Award className="text-primary" size={20} />
                            Récord Académico
                        </h3>
                        <div className="text-center py-10 text-slate-400 text-sm italic">
                            El historial de calificaciones está en fase de validación de secretaría.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
