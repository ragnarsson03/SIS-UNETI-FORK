export interface UnetiPNF {
    id_pnf?: string;
    codigo_institucional: string;
    nombre_programa: string;
    trayectos: number;
    estado_academico: 'Activo' | 'Inactivo';
}
