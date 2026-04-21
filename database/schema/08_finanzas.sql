-- =====================================================================
-- ESQUEMA DE FINANZAS - 3 TABLAS
-- =====================================================================

-- Tabla 39: conceptos_pago
CREATE TABLE finanzas.conceptos_pago (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(40) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    monto_base NUMERIC(12,2) NOT NULL CHECK (monto_base >= 0),
    moneda VARCHAR(3) DEFAULT 'VES',
    es_obligatorio BOOLEAN DEFAULT false,
    aplica_descuento BOOLEAN DEFAULT false,
    activo BOOLEAN NOT NULL DEFAULT true,
    vigencia_desde DATE,
    vigencia_hasta DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE finanzas.conceptos_pago IS 'Conceptos de pago (aranceles, certificaciones, etc.)';

-- Tabla 40: pagos_aranceles
CREATE TABLE finanzas.pagos_aranceles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES estudiantes.estudiantes(id) ON DELETE CASCADE,
    concepto_id UUID NOT NULL REFERENCES finanzas.conceptos_pago(id),
    periodo_id UUID REFERENCES academico.periodos_academicos(id),
    monto NUMERIC(12,2) NOT NULL CHECK (monto > 0),
    moneda VARCHAR(3) DEFAULT 'VES',
    metodo_pago VARCHAR(30) NOT NULL 
        CHECK (metodo_pago IN ('EFECTIVO', 'TRANSFERENCIA', 'PAGO_MOVIL', 'TARJETA_DEBITO', 'TARJETA_CREDITO', 'EXONERACION')),
    referencia_externa VARCHAR(100),
    fecha_pago TIMESTAMPTZ NOT NULL DEFAULT now(),
    comprobante_path TEXT,
    hash_comprobante VARCHAR(64),
    estado finanzas.estado_pago NOT NULL DEFAULT 'REGISTRADO',
    observaciones TEXT,
    registrado_por UUID REFERENCES seguridad.usuarios(id),
    validado_por UUID REFERENCES seguridad.usuarios(id),
    validado_at TIMESTAMPTZ,
    ip_registro INET,
    conciliado BOOLEAN DEFAULT false,
    fecha_conciliacion TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE finanzas.pagos_aranceles IS 'Pagos realizados por estudiantes';

-- Índices de finanzas
CREATE INDEX idx_pagos_estudiante ON finanzas.pagos_aranceles(estudiante_id);
CREATE INDEX idx_pagos_estado ON finanzas.pagos_aranceles(estado);
CREATE INDEX idx_pagos_fecha ON finanzas.pagos_aranceles(fecha_pago DESC);
CREATE INDEX idx_pagos_referencia ON finanzas.pagos_aranceles(referencia_externa);

