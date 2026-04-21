-- =====================================================================
-- ESQUEMA DE HISTÓRICO - 6 TABLAS
-- =====================================================================

-- Tabla 51: historico.migraciones
CREATE TABLE historico.migraciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version VARCHAR(50) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    script_aplicado TEXT,
    ejecutado_por UUID REFERENCES seguridad.usuarios(id),
    fecha_ejecucion TIMESTAMPTZ NOT NULL DEFAULT now(),
    tiempo_ejecucion_ms INT,
    estado VARCHAR(20) DEFAULT 'EXITOSO',
    error TEXT
);
COMMENT ON TABLE historico.migraciones IS 'Registro de migraciones de base de datos';

-- Tabla 52: historico.auditoria_exportaciones
CREATE TABLE historico.auditoria_exportaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES seguridad.usuarios(id),
    tipo_exportacion VARCHAR(50) NOT NULL,
    filtros_aplicados JSONB,
    registros_exportados INT,
    formato VARCHAR(20),
    fecha_exportacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_address INET
);
COMMENT ON TABLE historico.auditoria_exportaciones IS 'Auditoría de exportaciones de datos';

-- Tabla 53: historico.cambios_masivos
CREATE TABLE historico.cambios_masivos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_operacion VARCHAR(50) NOT NULL,
    tabla_afectada VARCHAR(50) NOT NULL,
    registros_afectados INT,
    usuario_id UUID REFERENCES seguridad.usuarios(id),
    datos_respaldo JSONB,
    fecha_ejecucion TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_address INET,
    motivo TEXT
);
COMMENT ON TABLE historico.cambios_masivos IS 'Registro de operaciones masivas';

-- Tabla 54: historico.sync_logs
CREATE TABLE historico.sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sync_id UUID REFERENCES academico.moodle_sync_jobs(id),
    tipo_sync VARCHAR(50) NOT NULL,
    fecha_inicio TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_fin TIMESTAMPTZ,
    estado VARCHAR(20),
    registros_procesados INT,
    errores JSONB DEFAULT '[]',
    detalle TEXT
);
COMMENT ON TABLE historico.sync_logs IS 'Logs detallados de sincronizaciones';

-- Tabla 55: historico.notas_historicas
CREATE TABLE historico.notas_historicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inscripcion_id UUID NOT NULL,
    estudiante_id UUID NOT NULL,
    uc_id UUID NOT NULL,
    nota_anterior INT,
    nota_nueva INT,
    fecha_cambio TIMESTAMPTZ NOT NULL DEFAULT now(),
    usuario_id UUID REFERENCES seguridad.usuarios(id),
    motivo TEXT,
    metadata JSONB DEFAULT '{}'
);
COMMENT ON TABLE historico.notas_historicas IS 'Historial completo de cambios de notas';

-- Tabla 56: historico.estados_academicos
CREATE TABLE historico.estados_academicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id),
    estado_anterior VARCHAR(30),
    estado_nuevo VARCHAR(30) NOT NULL,
    fecha_cambio TIMESTAMPTZ NOT NULL DEFAULT now(),
    usuario_id UUID REFERENCES seguridad.usuarios(id),
    motivo TEXT
);
COMMENT ON TABLE historico.estados_academicos IS 'Historial de cambios de estado académico';

