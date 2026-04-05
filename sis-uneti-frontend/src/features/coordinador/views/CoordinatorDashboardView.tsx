import { useState, useMemo } from 'react';
import { DashboardHero } from '../../shared/components/DashboardHero';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { TableFilters, TableFilterConfig } from '../../shared/components/TableFilters';
import { 
    Users, 
    UserPlus, 
    GraduationCap, 
    BookOpen,
    Edit,
    Search
} from 'lucide-react';

export function CoordinatorDashboardView() {
    // Estados para filtros
    const [pnfFilter, setPnfFilter] = useState('all');
    const [academicStatusFilter, setAcademicStatusFilter] = useState('all');

    // Datos mock de Estudiantes
    const students = [
        { 
            name: 'Carlos Pérez', 
            email: 'c.perez@uneti.edu.ve', 
            pnf: 'Informática', 
            academicStatus: 'Regular', 
            semester: '6to Semestre',
            avatar: 'https://i.pravatar.cc/150?u=carlos'
        },
        { 
            name: 'María García', 
            email: 'm.garcia@uneti.edu.ve', 
            pnf: 'Logística', 
            academicStatus: 'Becado', 
            semester: '4to Semestre',
            avatar: 'https://i.pravatar.cc/150?u=maria'
        },
        { 
            name: 'Pedro López', 
            email: 'p.lopez@uneti.edu.ve', 
            pnf: 'Turismo', 
            academicStatus: 'Condicional', 
            semester: '2do Semestre',
            avatar: 'https://i.pravatar.cc/150?u=pedro'
        },
        { 
            name: 'Laura Torres', 
            email: 'l.torres@uneti.edu.ve', 
            pnf: 'Informática', 
            academicStatus: 'Regular', 
            semester: '8vo Semestre',
            avatar: 'https://i.pravatar.cc/150?u=laura'
        }
    ];

    // Filtrado real
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesPnf = pnfFilter === 'all' || student.pnf === pnfFilter;
            const matchesStatus = academicStatusFilter === 'all' || student.academicStatus === academicStatusFilter;
            return matchesPnf && matchesStatus;
        });
    }, [pnfFilter, academicStatusFilter]);

    const filterConfig: TableFilterConfig[] = [
        {
            name: 'pnf',
            label: 'PNF',
            value: pnfFilter,
            onChange: setPnfFilter,
            options: [
                { label: 'Todos los PNF', value: 'all' },
                { label: 'Informática', value: 'Informática' },
                { label: 'Logística', value: 'Logística' },
                { label: 'Turismo', value: 'Turismo' },
            ]
        },
        {
            name: 'academicStatus',
            label: 'Estado Académico',
            value: academicStatusFilter,
            onChange: setAcademicStatusFilter,
            options: [
                { label: 'Todos los estados', value: 'all' },
                { label: 'Regular', value: 'Regular' },
                { label: 'Becado', value: 'Becado' },
                { label: 'Condicional', value: 'Condicional' },
            ]
        }
    ];

    const stats = [
        { label: 'Total Estudiantes', value: '842', icon: Users, color: 'text-primary', bg: 'bg-blue-50' },
        { label: 'Promedio General', value: '16.4', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Egresados 2024', value: '124', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const handleClearFilters = () => {
        setPnfFilter('all');
        setAcademicStatusFilter('all');
    };

    return (
        <div className="min-h-screen pb-10">
            <DashboardHero 
                title="Gestión Académica" 
                description="Coordinación y seguimiento del rendimiento estudiantil por PNF."
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 px-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-primary-dark tracking-tight mb-1 font-headline">
                        Control de Estudiantes
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Supervise el progreso académico y administrativo de su cohorte.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-slate-100 border-none hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-5 flex gap-2">
                        <Search size={18} />
                        Reportes
                    </Button>
                    <Button className="bg-primary hover:bg-blue-600 text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/30 flex gap-2 active:scale-95 transition-all">
                        <UserPlus size={18} />
                        Inscribir Nuevo
                    </Button>
                </div>
            </div>

            <TableFilters filters={filterConfig} onClear={handleClearFilters} />

            <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden mx-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estudiante</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">PNF</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semestre</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((s, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                                    <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-primary-dark">{s.name}</h3>
                                                    <p className="text-[11px] text-slate-500">{s.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-600 font-medium">{s.pnf}</td>
                                        <td className="px-8 py-5 text-sm text-slate-500">{s.semester}</td>
                                        <td className="px-8 py-5">
                                            <span className={`
                                                px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest
                                                ${s.academicStatus === 'Regular' ? 'bg-green-50 text-green-600' : 
                                                  s.academicStatus === 'Becado' ? 'bg-blue-50 text-blue-600' : 
                                                  'bg-orange-50 text-orange-600'}
                                            `}>
                                                {s.academicStatus}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit size={18} /></button>
                                                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Search size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-10 text-center text-slate-400 text-sm italic">
                                        No se encontraron estudiantes con esos filtros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left">
                            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-sm`}>
                                <s.icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-extrabold text-primary-dark font-headline">{s.value}</h4>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{s.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
