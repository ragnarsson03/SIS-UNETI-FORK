-- =====================================================================
-- ESQUEMA DE AUDITORÍA - 3 TABLAS
-- =====================================================================

-- Tabla 41: logs_auditoria
CREATE TABLE auditoria.logs_auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES seguridad.usuarios(id),
    usuario_nombre VARCHAR(200),
    accion VARCHAR(50) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    tabla_afectada VARCHAR(50) NOT NULL,
    registro_id UUID,
    valor_anterior JSONB,
    valor_nuevo JSONB,
    motivo TEXT,
    ip_address INET,
    user_agent TEXT,
    session_id UUID,
    hash_registro VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE auditoria.logs_auditoria IS 'Logs detallados de auditoría del sistema';

-- Tabla 42: logs
CREATE TABLE auditoria.logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES seguridad.usuarios(id),
    accion VARCHAR(50) NOT NULL,
    tabla_afectada VARCHAR(50) NOT NULL,
    entidad_id UUID,
    valor_anterior JSONB,
    valor_nuevo JSONB,
    motivo TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE auditoria.logs IS 'Logs simplificados de auditoría';

-- Tabla 43: cambios_calificaciones
CREATE TABLE auditoria.cambios_calificaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inscripcion_id UUID NOT NULL REFERENCES academico.inscripciones(id),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id),
    uc_id UUID NOT NULL REFERENCES academico.unidades_curriculares(id),
    periodo_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    nota_anterior INT,
    nota_nueva INT NOT NULL,
    motivo_cambio TEXT NOT NULL,
    modificado_por UUID NOT NULL REFERENCES seguridad.usuarios(id),
    autorizado_por UUID REFERENCES seguridad.usuarios(id),
    ip_modificacion INET,
    metodo VARCHAR(20) CHECK (metodo IN ('MANUAL', 'SYNC_MOODLE', 'CORRECCION', 'REVISION')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE auditoria.cambios_calificaciones IS 'Auditoría específica de cambios en calificaciones';

-- Índices de auditoría
CREATE INDEX idx_auditoria_usuario ON auditoria.logs_auditoria(usuario_id, created_at DESC);
CREATE INDEX idx_auditoria_tabla ON auditoria.logs_auditoria(tabla_afectada, created_at DESC);
CREATE INDEX idx_auditoria_fecha ON auditoria.logs_auditoria(created_at DESC);
CREATE INDEX idx_auditoria_registro ON auditoria.logs_auditoria(tabla_afectada, registro_id);
CREATE INDEX idx_auditoria_json ON auditoria.logs_auditoria USING GIN (valor_nuevo);
