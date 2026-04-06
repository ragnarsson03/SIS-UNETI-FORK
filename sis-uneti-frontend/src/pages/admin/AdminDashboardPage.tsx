import { WelcomeBanner } from '@/features/shared/components/WelcomeBanner';
import { LayoutDashboard } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen pb-10">
      <WelcomeBanner 
        title="Dashboard Administrativo"
        description="Vista global del ecosistema UNETI: estudiantes, docentes y procesos académicos."
        icon={LayoutDashboard}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
        {/* Aquí irán widgets o resumen de actividad en el futuro */}
        <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 italic">
          Zona de Widgets de Actividad (Próximamente)
        </div>
      </div>
    </div>
  );
}
