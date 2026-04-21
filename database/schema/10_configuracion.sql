-- =====================================================================
-- ESQUEMA DE CONFIGURACIÓN - 7 TABLAS
-- =====================================================================

-- Tabla 44: configuracion.parametros_sistema
CREATE TABLE configuracion.parametros_sistema (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    descripcion TEXT,
    tipo_dato VARCHAR(50) DEFAULT 'TEXT',
    modificable BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE configuracion.parametros_sistema IS 'Parámetros de configuración del sistema';

-- Tabla 45: configuracion.plantillas_certificados
CREATE TABLE configuracion.plantillas_certificados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    tipo_certificado VARCHAR(50) NOT NULL,
    contenido_html TEXT,
    estilos_css TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE configuracion.plantillas_certificados IS 'Plantillas para generación de certificados';

-- Tabla 46: configuracion.plantillas_correo
CREATE TABLE configuracion.plantillas_correo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    cuerpo TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE configuracion.plantillas_correo IS 'Plantillas para correos electrónicos';

-- Tabla 47: configuracion.periodos_especiales
CREATE TABLE configuracion.periodos_especiales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE configuracion.periodos_especiales IS 'Períodos especiales (vacaciones, días no laborables)';

-- Tabla 48: configuracion.calendario_academico
CREATE TABLE configuracion.calendario_academico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    periodo_id UUID NOT NULL REFERENCES academico.periodos_academicos(id),
    fecha DATE NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(periodo_id, fecha)
);
COMMENT ON TABLE configuracion.calendario_academico IS 'Eventos del calendario académico';

-- Tabla 49: configuracion.convenios_empresariales
CREATE TABLE configuracion.convenios_empresariales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre_empresa VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    beneficios JSONB DEFAULT '{}',
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE configuracion.convenios_empresariales IS 'Convenios con empresas para becas y pasantías';

-- Tabla 50: configuracion.becas_tipos
CREATE TABLE configuracion.becas_tipos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    porcentaje_base INT CHECK (porcentaje_base BETWEEN 0 AND 100),
    requiere_socioeconomico BOOLEAN DEFAULT true,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE configuracion.becas_tipos IS 'Tipos de becas disponibles';

