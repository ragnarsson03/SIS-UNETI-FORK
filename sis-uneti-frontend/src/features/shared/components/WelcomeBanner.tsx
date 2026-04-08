import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Shield, GraduationCap, LucideIcon } from 'lucide-react';

interface WelcomeBannerProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
}

export function WelcomeBanner({ title, description, icon: Icon }: WelcomeBannerProps) {
    const { user } = useAuth();
    const currentRoleLabel = user?.rol || 'Usuario';

    const DefaultIcon = () => {
        if (user?.rol === 'ADMINISTRADOR') return <Shield className="h-6 w-6" />;
        if (user?.rol === 'ESTUDIANTE' || user?.rol === 'DOCENTE' || user?.rol === 'COORDINADOR') return <GraduationCap className="h-6 w-6" />;
        return <User className="h-6 w-6" />;
    };

    return (
        <Card className="mb-6 shadow-sm border-border/50 bg-gradient-to-r from-white to-slate-50/50">
            <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6 py-4 md:py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                        {Icon ? <Icon className="h-5 w-5 md:h-6 md:w-6" /> : <DefaultIcon />}
                    </div>
                    <div>
                        <CardTitle className="text-lg md:text-2xl font-bold text-foreground">
                            {title || `¡Hola, ${user?.nombre || 'Usuario'}!`}
                        </CardTitle>
                        <p className="text-muted-foreground mt-0.5 text-[10px] md:text-sm">
                            {description || `${currentRoleLabel} - Centro de Control sis-uneti`}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 hidden md:block">
                <p className="text-muted-foreground text-sm">
                    Gestione las operaciones habilitadas para su perfil institucional con trazabilidad garantizada.
                </p>
            </CardContent>
        </Card>
    );
}
