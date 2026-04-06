import { GraduationCap, BookOpen, CheckCircle, ClipboardList } from 'lucide-react';
import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';

export function DocenteDashboardView() {
    const stats = [
        { label: 'Secciones Asignadas', value: '4', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Calificaciones Cargadas', value: '85%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Asistencia Registrada', value: '12/16', icon: ClipboardList, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-6">
            <WelcomeBanner 
                title="Gestión Docente"
                description="Gestión de notas, asistencia y planificación académica del docente."
                icon={GraduationCap}
            />

            <div id="DashboardContent" className="px-4 md:px-0 space-y-8">
                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm`}>
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

                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">Módulos de Carga Próximamente</h3>
                        <p className="text-slate-500 text-sm">
                            Estamos sincronizando las actas finales con el servidor central. Pronto podrá realizar la carga masiva de calificaciones aquí.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
