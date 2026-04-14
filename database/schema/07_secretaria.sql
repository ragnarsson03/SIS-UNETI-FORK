-- =====================================================================
-- ESQUEMA DE SECRETARÍA - 13 TABLAS
-- =====================================================================

-- Tabla 28: tipos_documento
CREATE TABLE secretaria.tipos_documento (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(40) UNIQUE NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    es_obligatorio BOOLEAN DEFAULT true,
    formatos_permitidos VARCHAR(100) DEFAULT 'PDF,JPG,PNG',
    tamano_maximo_mb INT DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE secretaria.tipos_documento IS 'Catálogo de tipos de documento para expedientes';

-- Tabla 29: requisitos_expediente
CREATE TABLE secretaria.requisitos_expediente (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohorte_id UUID REFERENCES academico.cohortes(id) ON DELETE CASCADE,
    pnf_id UUID REFERENCES academico.pnf_carreras(id) ON DELETE CASCADE,
    tipo_documento_id UUID NOT NULL REFERENCES secretaria.tipos_documento(id) ON DELETE CASCADE,
    obligatorio BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(cohorte_id, pnf_id, tipo_documento_id)
);
COMMENT ON TABLE secretaria.requisitos_expediente IS 'Requisitos de documentos por cohorte/PNF';

-- Tabla 30: expediente_documentos
CREATE TABLE secretaria.expediente_documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id) ON DELETE CASCADE,
    tipo_documento_id UUID NOT NULL REFERENCES secretaria.tipos_documento(id),
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_almacenamiento TEXT NOT NULL,
    tamano_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    hash_sha256 VARCHAR(64) NOT NULL,
    estado secretaria.estado_documento NOT NULL DEFAULT 'PENDIENTE',
    observaciones TEXT,
    revisado_por UUID REFERENCES seguridad.usuarios(id),
    fecha_revision TIMESTAMPTZ,
    version INT DEFAULT 1,
    documento_anterior_id UUID REFERENCES secretaria.expediente_documentos(id),
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    uploaded_by UUID REFERENCES seguridad.usuarios(id),
    UNIQUE(estudiante_id, tipo_documento_id, version)
);
COMMENT ON TABLE secretaria.expediente_documentos IS 'Documentos digitalizados del expediente estudiantil';

-- Tabla 31: actas
CREATE TABLE secretaria.actas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seccion_id UUID NOT NULL REFERENCES academico.secciones(id),
    periodo_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    estado secretaria.estado_acta NOT NULL DEFAULT 'BORRADOR',
    firma_docente_hash VARCHAR(255),
    firma_docente_fecha TIMESTAMPTZ,
    firma_docente_por UUID REFERENCES seguridad.usuarios(id),
    firma_coordinador_hash VARCHAR(255),
    firma_coordinador_fecha TIMESTAMPTZ,
    firma_coordinador_por UUID REFERENCES seguridad.usuarios(id),
    recibido_por UUID REFERENCES seguridad.usuarios(id),
    recibido_en TIMESTAMPTZ,
    ruta_pdf_acta TEXT,
    hash_pdf_acta VARCHAR(128),
    metadatos_pdf JSONB DEFAULT '{}',
    cerrado_por UUID REFERENCES seguridad.usuarios(id),
    cerrado_en TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(seccion_id, periodo_id)
);
COMMENT ON TABLE secretaria.actas IS 'Actas de calificaciones oficiales';

-- Tabla 32: acta_items
CREATE TABLE secretaria.acta_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    acta_id UUID NOT NULL REFERENCES secretaria.actas(id) ON DELETE CASCADE,
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id),
    inscripcion_id UUID REFERENCES academico.inscripciones(id),
    nota_final_20 INT CHECK (nota_final_20 IS NULL OR (nota_final_20 BETWEEN 1 AND 20)),
    origen academico.origen_nota NOT NULL DEFAULT 'MOODLE',
    nota_moodle_100 NUMERIC(5,2) CHECK (nota_moodle_100 IS NULL OR (nota_moodle_100 BETWEEN 0 AND 100)),
    asistio BOOLEAN DEFAULT true,
    observacion TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(acta_id, estudiante_id)
);
COMMENT ON TABLE secretaria.acta_items IS 'Items de calificaciones por estudiante en cada acta';

-- Tabla 33: solicitudes_certificados
CREATE TABLE secretaria.solicitudes_certificados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL 
        CHECK (tipo IN ('CONSTANCIA_ESTUDIO', 'CERTIFICACION_NOTAS', 'RECORD_ACADEMICO', 'TITULO', 'CARNET')),
    estado secretaria.estado_solicitud NOT NULL DEFAULT 'CREADA',
    periodo_inicio VARCHAR(20),
    periodo_fin VARCHAR(20),
    proposito TEXT,
    datos_adicionales JSONB DEFAULT '{}',
    revisado_por UUID REFERENCES seguridad.usuarios(id),
    revisado_at TIMESTAMPTZ,
    motivo_rechazo TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE secretaria.solicitudes_certificados IS 'Solicitudes de certificados y constancias';

-- Tabla 34: certificados_emitidos
CREATE TABLE secretaria.certificados_emitidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    solicitud_id UUID UNIQUE NOT NULL REFERENCES secretaria.solicitudes_certificados(id) ON DELETE CASCADE,
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id) ON DELETE CASCADE,
    numero_certificado VARCHAR(50) UNIQUE NOT NULL,
    codigo_qr_uuid UUID DEFAULT gen_random_uuid() UNIQUE,
    hash_validacion VARCHAR(64) NOT NULL,
    ruta_pdf TEXT NOT NULL,
    hash_pdf VARCHAR(128) NOT NULL,
    emitido_por UUID NOT NULL REFERENCES seguridad.usuarios(id),
    emitido_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_emision INET,
    entregado_a VARCHAR(200),
    fecha_entrega TIMESTAMPTZ,
    entregado_por UUID REFERENCES seguridad.usuarios(id),
    estado VARCHAR(20) DEFAULT 'EMITIDO' 
        CHECK (estado IN ('EMITIDO', 'ENTREGADO', 'ANULADO', 'VENCIDO'))
);
COMMENT ON TABLE secretaria.certificados_emitidos IS 'Certificados emitidos con QR de validación';

-- Tabla 35: qr_verificaciones
CREATE TABLE secretaria.qr_verificaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificado_id UUID NOT NULL REFERENCES secretaria.certificados_emitidos(id),
    qr_token UUID NOT NULL,
    ip_address INET,
    user_agent TEXT,
    fecha_verificacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    resultado VARCHAR(20),
    detalle JSONB DEFAULT '{}'
);
COMMENT ON TABLE secretaria.qr_verificaciones IS 'Registro de verificaciones de QR de certificados';

-- Tabla 36: tipos_tramite
CREATE TABLE secretaria.tipos_tramite (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    requiere_aprobacion BOOLEAN DEFAULT true,
    dias_maximos_respuesta INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE secretaria.tipos_tramite IS 'Catálogo de tipos de trámite';

-- Tabla 37: tramites
CREATE TABLE secretaria.tramites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_tramite_id UUID NOT NULL REFERENCES secretaria.tipos_tramite(id),
    solicitante_usuario_id UUID NOT NULL REFERENCES seguridad.usuarios(id),
    estudiante_id UUID REFERENCES estudiantes.estudiantes(id),
    estado secretaria.estado_tramite NOT NULL DEFAULT 'CREADO',
    payload JSONB NOT NULL DEFAULT '{}',
    documentos_adjuntos JSONB DEFAULT '[]',
    asignado_a UUID REFERENCES seguridad.usuarios(id),
    fecha_asignacion TIMESTAMPTZ,
    prioridad INT DEFAULT 3 CHECK (prioridad BETWEEN 1 AND 5),
    resultado JSONB DEFAULT '{}',
    motivo_resolucion TEXT,
    resuelto_por UUID REFERENCES seguridad.usuarios(id),
    resuelto_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE secretaria.tramites IS 'Trámites estudiantiles';

-- Tabla 38: tramites_historial
CREATE TABLE secretaria.tramites_historial (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tramite_id UUID NOT NULL REFERENCES secretaria.tramites(id) ON DELETE CASCADE,
    estado secretaria.estado_tramite NOT NULL,
    comentario TEXT,
    cambiado_por UUID REFERENCES seguridad.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE secretaria.tramites_historial IS 'Historial de cambios de estado en trámites';

-- Índices de secretaría
CREATE INDEX idx_expediente_estudiante ON secretaria.expediente_documentos(estudiante_id);
CREATE INDEX idx_expediente_estado ON secretaria.expediente_documentos(estado);
CREATE INDEX idx_acta_items_acta ON secretaria.acta_items(acta_id);
CREATE INDEX idx_tramites_estado ON secretaria.tramites(estado);
CREATE INDEX idx_tramites_asignado ON secretaria.tramites(asignado_a) WHERE asignado_a IS NOT NULL;
CREATE INDEX idx_qr_verificaciones_token ON secretaria.qr_verificaciones(qr_token);
CREATE INDEX idx_certificados_qr ON secretaria.certificados_emitidos(codigo_qr_uuid);
