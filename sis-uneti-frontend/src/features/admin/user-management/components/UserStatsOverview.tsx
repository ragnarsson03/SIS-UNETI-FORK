import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  UserMinus,
  LucideIcon 
} from 'lucide-react';

interface StatProps {
    label: string;
    value: string;
    change?: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

function StatCard({ label, value, change, icon: Icon, color, bg }: StatProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center`}>
                    <Icon size={22} />
                </div>
                {change && (
                    <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        {change}
                    </span>
                )}
            </div>
            <h4 className="text-2xl font-extrabold text-primary-dark font-headline">{value}</h4>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
        </div>
    );
}

export function UserStatsOverview() {
    const stats = [
        { label: 'Total Usuarios', value: '1,284', change: '+12%', icon: Users, color: 'text-primary', bg: 'bg-blue-50' },
        { label: 'Nuevos este mes', value: '45', change: '+5%', icon: UserPlus, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Usuarios Activos', value: '1,120', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Cuentas Inactivas', value: '164', icon: UserMinus, color: 'text-red-500', bg: 'bg-red-50' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {stats.map((s, i) => (
                <StatCard key={i} {...s} />
            ))}
        </div>
    );
}
