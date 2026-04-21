-- =====================================================================
-- ESQUEMA DE ESTUDIANTES - 1 TABLA
-- =====================================================================

-- Tabla 25: estudiantes
CREATE TABLE estudiantes.estudiantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID UNIQUE NOT NULL REFERENCES seguridad.usuarios(id) ON DELETE CASCADE,
    cohorte_id UUID NOT NULL REFERENCES academico.cohortes(id),
    pnf_id UUID NOT NULL REFERENCES academico.pnf_carreras(id),
    tipo_ingreso VARCHAR(20) NOT NULL 
        CHECK (tipo_ingreso IN ('OPSU', 'CONGRESO', 'CONVENIO', 'PARTICULAR', 'TRASLADO', 'REINGRESO')),
    convenio_empresa VARCHAR(50),
    codigo_opsu VARCHAR(50),
    titulo_bachiller_tipo VARCHAR(50),
    titulo_bachiller_ano INT,
    institucion_procedencia VARCHAR(150),
    trayecto_actual INT DEFAULT 0,
    creditos_acumulados INT DEFAULT 0,
    indice_academico NUMERIC(4,2) DEFAULT 0,
    estado_academico VARCHAR(30) DEFAULT 'ACTIVO' 
        CHECK (estado_academico IN ('ACTIVO', 'INACTIVO_TEMPORAL', 'RETIRADO', 'EGRESADO', 'TITULADO', 'SUSPENDIDO')),
    nivel_socioeconomico VARCHAR(10),
    recibe_beca BOOLEAN DEFAULT false,
    tipo_beca VARCHAR(50),
    porcentaje_beca INT CHECK (porcentaje_beca BETWEEN 0 AND 100),
    fecha_ingreso DATE NOT NULL,
    fecha_egreso DATE,
    fecha_titulacion DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE estudiantes.estudiantes IS 'Datos específicos de estudiantes';

CREATE INDEX idx_estudiantes_cohorte ON estudiantes.estudiantes(cohorte_id);
CREATE INDEX idx_estudiantes_estado ON estudiantes.estudiantes(estado_academico);
CREATE INDEX idx_estudiantes_pnf ON estudiantes.estudiantes(pnf_id);



-- Tabla 19: inscripciones (CORREGIDA)
CREATE TABLE academico.inscripciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id),
    seccion_id UUID REFERENCES academico.secciones(id),
    uc_id UUID NOT NULL REFERENCES academico.unidades_curriculares(id),
    periodo_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    cohorte_id UUID REFERENCES academico.cohortes(id),
    nro_intento INT NOT NULL DEFAULT 1 CHECK (nro_intento >= 1),
    tipo_inscripcion VARCHAR(20) DEFAULT 'REGULAR' 
        CHECK (tipo_inscripcion IN ('REGULAR', 'REPETICION', 'RECUPERACION', 'EQUIVALENCIA', 'CONVALIDACION')),
    nota_moodle_100 NUMERIC(5,2) CHECK (nota_moodle_100 IS NULL OR (nota_moodle_100 BETWEEN 0 AND 100)),
    nota_final_20 INT CHECK (nota_final_20 IS NULL OR (nota_final_20 BETWEEN 1 AND 20)),
    origen_nota academico.origen_nota NOT NULL DEFAULT 'MOODLE',
    estado_materia academico.estado_materia NOT NULL DEFAULT 'CURSANDO',
    fecha_estado TIMESTAMPTZ,
    fecha_inscripcion TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_cierre_acta DATE,
    inscrito_por UUID REFERENCES seguridad.usuarios(id),
    validado_por UUID REFERENCES seguridad.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    hash_integridad VARCHAR(64),
    UNIQUE(estudiante_id, uc_id, periodo_id, nro_intento)
);
COMMENT ON TABLE academico.inscripciones IS 'Historial académico de estudiantes (tabla crítica)';
COMMENT ON COLUMN academico.inscripciones.hash_integridad IS 'Hash SHA-256 para integridad de datos (calculado por trigger)';

-- Tabla 20: sesiones_clase
CREATE TABLE academico.sesiones_clase (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seccion_id UUID NOT NULL REFERENCES academico.secciones(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    tema TEXT,
    created_by UUID REFERENCES seguridad.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(seccion_id, fecha)
);
COMMENT ON TABLE academico.sesiones_clase IS 'Sesiones diarias de clase';

-- Tabla 21: registro_asistencia
CREATE TABLE academico.registro_asistencia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sesion_id UUID NOT NULL REFERENCES academico.sesiones_clase(id) ON DELETE CASCADE,
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id) ON DELETE CASCADE,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('PRESENTE', 'AUSENTE', 'JUSTIFICADO', 'RETARDO')),
    observacion TEXT,
    registrado_por UUID REFERENCES seguridad.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(sesion_id, estudiante_id)
);
COMMENT ON TABLE academico.registro_asistencia IS 'Registro de asistencia por sesión y estudiante';

-- Tabla 22: moodle_sync_jobs
CREATE TABLE academico.moodle_sync_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    periodo_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    fecha_inicio TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_fin TIMESTAMPTZ,
    estado academico.estado_sync NOT NULL DEFAULT 'PENDIENTE',
    total_secciones INT DEFAULT 0,
    total_estudiantes INT DEFAULT 0,
    registros_procesados INT DEFAULT 0,
    registros_actualizados INT DEFAULT 0,
    registros_fallidos INT DEFAULT 0,
    log_detalle JSONB DEFAULT '[]',
    error_general TEXT,
    ejecutado_por UUID REFERENCES seguridad.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE academico.moodle_sync_jobs IS 'Jobs de sincronización con Moodle';

-- Tabla 23: evaluaciones_moodle
CREATE TABLE academico.evaluaciones_moodle (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sync_id UUID REFERENCES academico.moodle_sync_jobs(id),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id),
    seccion_id UUID NOT NULL REFERENCES academico.secciones(id),
    uc_id UUID NOT NULL REFERENCES academico.unidades_curriculares(id),
    moodle_user_id BIGINT NOT NULL,
    moodle_course_id BIGINT NOT NULL,
    moodle_grade_item_id BIGINT,
    moodle_grade_category VARCHAR(100),
    nota_moodle_original NUMERIC(6,2) NOT NULL CHECK (nota_moodle_original BETWEEN 0 AND 100),
    nota_convertida_20 INT,
    fecha_evaluacion TIMESTAMPTZ,
    imported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source_hash VARCHAR(128),
    estado_procesamiento VARCHAR(20) DEFAULT 'PENDIENTE' 
        CHECK (estado_procesamiento IN ('PENDIENTE', 'VALIDADO', 'APLICADO', 'INCONSISTENTE', 'RECHAZADO')),
    observaciones TEXT,
    inscripcion_id UUID REFERENCES academico.inscripciones(id),
    UNIQUE(moodle_user_id, moodle_course_id, moodle_grade_item_id, imported_at)
);
COMMENT ON TABLE academico.evaluaciones_moodle IS 'Datos crudos importados de Moodle';

-- Tabla 24: programas
CREATE TABLE academico.programas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(120) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE academico.programas IS 'Programas académicos adicionales';

-- Índices académicos
CREATE INDEX idx_uc_pnf ON academico.unidades_curriculares(pnf_id);
CREATE INDEX idx_uc_trayecto ON academico.unidades_curriculares(trayecto_id);
CREATE INDEX idx_uc_codigo ON academico.unidades_curriculares(codigo_uc);
CREATE INDEX idx_inscripciones_estudiante ON academico.inscripciones(estudiante_id);
CREATE INDEX idx_inscripciones_periodo ON academico.inscripciones(periodo_id);
CREATE INDEX idx_inscripciones_estado ON academico.inscripciones(estado_materia);
CREATE INDEX idx_inscripciones_seccion ON academico.inscripciones(seccion_id);
CREATE INDEX idx_inscripciones_uc ON academico.inscripciones(uc_id);
CREATE INDEX idx_secciones_uc ON academico.secciones(uc_id);
CREATE INDEX idx_secciones_oferta ON academico.secciones(oferta_id);
CREATE INDEX idx_secciones_estado ON academico.secciones(estado_seccion);
CREATE INDEX idx_asistencia_sesion ON academico.registro_asistencia(sesion_id);
CREATE INDEX idx_moodle_sync_estado ON academico.moodle_sync_jobs(estado);
CREATE INDEX idx_eval_moodle_seccion ON academico.evaluaciones_moodle(seccion_id);
CREATE INDEX idx_eval_moodle_estudiante ON academico.evaluaciones_moodle(estudiante_id);

