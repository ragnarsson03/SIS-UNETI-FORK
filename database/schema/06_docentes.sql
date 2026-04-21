-- =====================================================================
-- ESQUEMA DE DOCENTES - 2 TABLAS
-- =====================================================================

-- Tabla 26: docentes
CREATE TABLE docentes.docentes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID UNIQUE NOT NULL REFERENCES seguridad.usuarios(id) ON DELETE CASCADE,
    categoria_academica VARCHAR(30) 
        CHECK (categoria_academica IN ('INSTRUCTOR', 'ASISTENTE', 'AGREGADO', 'ASOCIADO', 'TITULAR', 'JUBILADO')),
    dedicacion VARCHAR(20) 
        CHECK (dedicacion IN ('TIEMPO_COMPLETO', 'MEDIO_TIEMPO', 'TIEMPO_HORARIO', 'INVITADO')),
    escalafon VARCHAR(20),
    horas_maximas_semanales INT DEFAULT 20,
    horas_asignadas_actual INT DEFAULT 0,
    area_especializacion VARCHAR(100),
    titulos_academicos JSONB DEFAULT '[]',
    lineas_investigacion TEXT[],
    estado_docente VARCHAR(20) DEFAULT 'ACTIVO' 
        CHECK (estado_docente IN ('ACTIVO', 'INACTIVO', 'LICENCIA', 'JUBILADO')),
    fecha_ingreso_institucion DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_carga_horaria CHECK (horas_asignadas_actual <= horas_maximas_semanales)
);
COMMENT ON TABLE docentes.docentes IS 'Datos profesionales de docentes';

-- Tabla 27: asignaciones_docentes
CREATE TABLE docentes.asignaciones_docentes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seccion_id UUID NOT NULL REFERENCES academico.secciones(id) ON DELETE CASCADE,
    docente_id UUID NOT NULL REFERENCES docentes.docentes(id),
    rol_docente VARCHAR(30) DEFAULT 'PRINCIPAL' 
        CHECK (rol_docente IN ('PRINCIPAL', 'AUXILIAR', 'SUPLENTE', 'INVITADO')),
    horas_semanales INT NOT NULL CHECK (horas_semanales > 0),
    fecha_asignacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_revocacion TIMESTAMPTZ,
    asignado_por UUID REFERENCES seguridad.usuarios(id),
    UNIQUE(seccion_id, docente_id, fecha_revocacion)
);
COMMENT ON TABLE docentes.asignaciones_docentes IS 'Asignación de docentes a secciones';

