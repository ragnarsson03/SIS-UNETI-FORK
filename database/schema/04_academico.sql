-- =====================================================================
-- ESQUEMA ACADÉMICO - 15 TABLAS
-- =====================================================================

-- Tabla 10: pnf_carreras
CREATE TABLE academico.pnf_carreras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    tipo_programa VARCHAR(20) NOT NULL 
        CHECK (tipo_programa IN ('TSU', 'INGENIERIA', 'LICENCIATURA', 'ESPECIALIZACION', 'MAESTRIA')),
    duracion_trayectos INT NOT NULL CHECK (duracion_trayectos BETWEEN 2 AND 6),
    resolucion_autorizacion VARCHAR(50),
    fecha_autorizacion DATE,
    estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO', 'EN_REVISION')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE academico.pnf_carreras IS 'Programas Nacionales de Formación (carreras)';

-- Tabla 11: trayectos
CREATE TABLE academico.trayectos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pnf_id UUID NOT NULL REFERENCES academico.pnf_carreras(id) ON DELETE CASCADE,
    numero_trayecto INT NOT NULL CHECK (numero_trayecto BETWEEN 0 AND 10),
    nombre_trayecto VARCHAR(50) NOT NULL,
    descripcion TEXT,
    creditos_requeridos INT DEFAULT 0,
    uc_obligatorias INT DEFAULT 0,
    uc_electivas INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(pnf_id, numero_trayecto)
);
COMMENT ON TABLE academico.trayectos IS 'Trayectos académicos (semestres/años) de cada PNF';

-- Tabla 12: unidades_curriculares
CREATE TABLE academico.unidades_curriculares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_uc VARCHAR(20) UNIQUE NOT NULL,
    nombre_uc VARCHAR(150) NOT NULL,
    descripcion TEXT,
    pnf_id UUID NOT NULL REFERENCES academico.pnf_carreras(id),
    trayecto_id UUID NOT NULL REFERENCES academico.trayectos(id),
    unidades_credito INT NOT NULL CHECK (unidades_credito > 0),
    horas_teoricas INT DEFAULT 0 CHECK (horas_teoricas >= 0),
    horas_practicas INT DEFAULT 0 CHECK (horas_practicas >= 0),
    horas_laboratorio INT DEFAULT 0 CHECK (horas_laboratorio >= 0),
    tipo_uc VARCHAR(20) DEFAULT 'OBLIGATORIA' 
        CHECK (tipo_uc IN ('OBLIGATORIA', 'ELECTIVA', 'TRAYECTO_INICIAL', 'PASANTIA', 'PROYECTO')),
    escala_evaluacion VARCHAR(10) DEFAULT '1-20',
    nota_minima_aprobacion INT DEFAULT 10 CHECK (nota_minima_aprobacion BETWEEN 1 AND 20),
    permite_recuperacion BOOLEAN DEFAULT true,
    estado_uc VARCHAR(20) DEFAULT 'ACTIVA' CHECK (estado_uc IN ('ACTIVA', 'INACTIVA', 'EN_DESARROLLO')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE academico.unidades_curriculares IS 'Unidades Curriculares (materias/asignaturas)';

-- Tabla 13: prelaciones
CREATE TABLE academico.prelaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uc_id UUID NOT NULL REFERENCES academico.unidades_curriculares(id) ON DELETE CASCADE,
    uc_requisito_id UUID NOT NULL REFERENCES academico.unidades_curriculares(id) ON DELETE CASCADE,
    tipo_prelacion VARCHAR(20) DEFAULT 'ESTRICTA' 
        CHECK (tipo_prelacion IN ('ESTRICTA', 'PARALELO', 'CORREQUISITO', 'RECOMENDADA')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(uc_id, uc_requisito_id),
    CONSTRAINT chk_no_autoprelacion CHECK (uc_id != uc_requisito_id)
);
COMMENT ON TABLE academico.prelaciones IS 'Prerrequisitos entre unidades curriculares';

-- Tabla 14: periodos_academicos
CREATE TABLE academico.periodos_academicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(20) UNIQUE NOT NULL,
    codigo_corto VARCHAR(10) UNIQUE NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_inicio_inscripcion DATE NOT NULL,
    fecha_fin_inscripcion DATE NOT NULL,
    fecha_inicio_carga_notas DATE,
    fecha_fin_carga_notas DATE,
    estado academico.estado_periodo NOT NULL DEFAULT 'PLANIFICACION',
    es_periodo_extraordinario BOOLEAN DEFAULT false,
    periodo_anterior_id UUID REFERENCES academico.periodos_academicos(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_fechas_periodo CHECK (fecha_fin > fecha_inicio),
    CONSTRAINT chk_fechas_inscripcion CHECK (fecha_fin_inscripcion >= fecha_inicio_inscripcion)
);
COMMENT ON TABLE academico.periodos_academicos IS 'Períodos académicos (semestres, trimestres, etc.)';

-- Tabla 15: cohortes
CREATE TABLE academico.cohortes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pnf_id UUID NOT NULL REFERENCES academico.pnf_carreras(id),
    ano_ingreso INT NOT NULL,
    periodo_ingreso_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    codigo_cohorte VARCHAR(20) UNIQUE NOT NULL,
    descripcion VARCHAR(100),
    plan_estudio_vigente_id UUID,
    estado_cohorte VARCHAR(20) DEFAULT 'ACTIVA' 
        CHECK (estado_cohorte IN ('ACTIVA', 'CERRADA', 'HISTORICA')),
    fecha_cierre DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(pnf_id, ano_ingreso, periodo_ingreso_id)
);
COMMENT ON TABLE academico.cohortes IS 'Cohortes de ingreso de estudiantes';

-- Tabla 16: espacios_fisicos
CREATE TABLE academico.espacios_fisicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_espacio VARCHAR(20) UNIQUE NOT NULL,
    nombre_espacio VARCHAR(100) NOT NULL,
    tipo_espacio VARCHAR(20) 
        CHECK (tipo_espacio IN ('AULA', 'LABORATORIO', 'AUDITORIO', 'SALA_REUNION', 'BIBLIOTECA', 'AREA_COMUN')),
    capacidad_personas INT NOT NULL CHECK (capacidad_personas > 0),
    recursos_json JSONB DEFAULT '{}',
    edificio VARCHAR(50),
    piso INT,
    ubicacion_detalle TEXT,
    estado_espacio VARCHAR(20) DEFAULT 'ACTIVO' 
        CHECK (estado_espacio IN ('ACTIVO', 'INACTIVO', 'MANTENIMIENTO', 'RESERVADO')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE academico.espacios_fisicos IS 'Espacios físicos (aulas, laboratorios, auditorios)';

-- Tabla 17: oferta_academica
CREATE TABLE academico.oferta_academica (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    periodo_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    pnf_id UUID NOT NULL REFERENCES academico.pnf_carreras(id),
    trayecto INT NOT NULL CHECK (trayecto >= 0),
    publicada BOOLEAN NOT NULL DEFAULT false,
    fecha_publicacion TIMESTAMPTZ,
    publicada_por UUID REFERENCES seguridad.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(periodo_id, pnf_id, trayecto)
);
COMMENT ON TABLE academico.oferta_academica IS 'Oferta académica por período y PNF';

-- Tabla 18: secciones
CREATE TABLE academico.secciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    oferta_id UUID NOT NULL REFERENCES academico.oferta_academica(id) ON DELETE CASCADE,
    uc_id UUID NOT NULL REFERENCES academico.unidades_curriculares(id),
    codigo_seccion VARCHAR(30) NOT NULL,
    espacio_id UUID REFERENCES academico.espacios_fisicos(id),
    cupo_total INT NOT NULL CHECK (cupo_total > 0),
    cupo_disponible INT NOT NULL CHECK (cupo_disponible >= 0),
    horario_json JSONB NOT NULL DEFAULT '[]',
    estado_seccion VARCHAR(20) DEFAULT 'PLANIFICADA' 
        CHECK (estado_seccion IN ('PLANIFICADA', 'ABIERTA', 'EN_CURSO', 'FINALIZADA', 'CANCELADA')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(oferta_id, uc_id, codigo_seccion),
    CONSTRAINT chk_cupos CHECK (cupo_disponible <= cupo_total)
);
COMMENT ON TABLE academico.secciones IS 'Secciones/grupos de cada unidad curricular';


