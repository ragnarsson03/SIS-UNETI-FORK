import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { LucideIcon, User, Shield, GraduationCap } from 'lucide-react';

interface DashboardHeroProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
}

export function DashboardHero({ title, description, icon: Icon }: DashboardHeroProps) {
    const { user } = useAuth();

    // Mapeo de roles para mostrar texto amigable
    const roleLabels: Record<string, string> = {
        'ADMINISTRADOR': 'Administrador',
        'ESTUDIANTE': 'Estudiante',
        'DOCENTE': 'Docente',
        'COORDINADOR': 'Coordinador',
        'SECRETARIO': 'Secretario',
        'AUDITOR': 'Auditor',
    };

    const currentRoleLabel = user?.rol ? roleLabels[user.rol] || user.rol : 'Usuario';
    const DefaultIcon = () => {
        if (user?.rol === 'ADMINISTRADOR') return <Shield className="h-6 w-6" />;
        if (user?.rol === 'ESTUDIANTE' || user?.rol === 'DOCENTE' || user?.rol === 'COORDINADOR') return <GraduationCap className="h-6 w-6" />;
        if (user?.rol === 'SECRETARIO') return <User className="h-6 w-6" />;
        if (user?.rol === 'AUDITOR') return <Shield className="h-6 w-6" />;
        return <User className="h-6 w-6" />;
    };

    return (
        <Card className="mb-6 shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {Icon ? <Icon className="h-6 w-6" /> : <DefaultIcon />}
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            {title || `Bienvenido, ${user?.nombre || 'Usuario'} 👋`}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                            {description || `${currentRoleLabel} - Gestión del Sistema`}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Aquí puedes gestionar las operaciones correspondientes a tu rol.
                </p>
            </CardContent>
        </Card>
    );
}