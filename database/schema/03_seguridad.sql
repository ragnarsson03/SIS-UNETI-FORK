-- =====================================================================
-- ESQUEMA DE SEGURIDAD (RBAC) - 9 TABLAS
-- =====================================================================

-- Tabla 1: roles
CREATE TABLE seguridad.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(30) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    nivel_jerarquico INT NOT NULL CHECK (nivel_jerarquico BETWEEN 1 AND 5),
    es_rol_sistema BOOLEAN DEFAULT true,
    permisos_default JSONB NOT NULL DEFAULT '{}',
    creado TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE seguridad.roles IS 'Catálogo de roles del sistema para RBAC';

-- Tabla 2: permisos
CREATE TABLE seguridad.permisos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(80) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    creado TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE seguridad.permisos IS 'Permisos granulares del sistema';

-- Tabla 3: usuarios
CREATE TABLE seguridad.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cedula VARCHAR(20) UNIQUE NOT NULL,
    correo_principal CITEXT UNIQUE NOT NULL,
    email_alternativo CITEXT,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    nombre_completo VARCHAR(200) GENERATED ALWAYS AS (nombres || ' ' || apellidos) STORED,
    fecha_nacimiento DATE,
    telefono_principal VARCHAR(20),
    telefono_emergencia VARCHAR(20),
    direccion TEXT,
    activo BOOLEAN NOT NULL DEFAULT true,
    estado_usuario VARCHAR(20) DEFAULT 'ACTIVO' 
        CHECK (estado_usuario IN ('ACTIVO', 'INACTIVO', 'BLOQUEADO', 'SUSPENDIDO')),
    motivo_bloqueo TEXT,
    ultimo_login_at TIMESTAMPTZ,
    ultimo_login_ip INET,
    intentos_fallidos INT DEFAULT 0,
    fecha_bloqueo TIMESTAMPTZ,
    debe_cambiar_password BOOLEAN DEFAULT false,
    fecha_expiracion_password TIMESTAMPTZ,
    creado TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES seguridad.usuarios(id),
    updated_by UUID REFERENCES seguridad.usuarios(id),
    hash_integridad VARCHAR(64) GENERATED ALWAYS AS (
        encode(digest(
            cedula::text || correo_principal::text || nombres || apellidos || activo::text,
            'sha256'
        ), 'hex')
    ) STORED
);
COMMENT ON TABLE seguridad.usuarios IS 'Usuarios del sistema con autenticación y datos personales';

-- Tabla 4: usuario_roles
CREATE TABLE seguridad.usuario_roles (
    usuario_id UUID NOT NULL REFERENCES seguridad.usuarios(id) ON DELETE CASCADE,
    rol_id UUID NOT NULL REFERENCES seguridad.roles(id) ON DELETE CASCADE,
    asignado_por UUID REFERENCES seguridad.usuarios(id),
    asignado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (usuario_id, rol_id)
);
COMMENT ON TABLE seguridad.usuario_roles IS 'Asignación de roles a usuarios (soporta múltiples roles)';

-- Tabla 5: rol_permisos
CREATE TABLE seguridad.rol_permisos (
    rol_id UUID NOT NULL REFERENCES seguridad.roles(id) ON DELETE CASCADE,
    permiso_id UUID NOT NULL REFERENCES seguridad.permisos(id) ON DELETE CASCADE,
    PRIMARY KEY (rol_id, permiso_id)
);
COMMENT ON TABLE seguridad.rol_permisos IS 'Asignación de permisos a roles';

-- Tabla 6: sesiones
CREATE TABLE seguridad.sesiones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES seguridad.usuarios(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    refresh_token_hash VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    dispositivo_fingerprint VARCHAR(255),
    fecha_inicio TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_expiracion TIMESTAMPTZ NOT NULL,
    fecha_renovacion TIMESTAMPTZ,
    fecha_cierre TIMESTAMPTZ,
    estado VARCHAR(20) DEFAULT 'ACTIVA' 
        CHECK (estado IN ('ACTIVA', 'RENOVADA', 'CERRADA', 'EXPIRADA', 'REVOCADA')),
    motivo_cierre TEXT
);
COMMENT ON TABLE seguridad.sesiones IS 'Sesiones activas de usuarios para autenticación';

-- Tabla 7: intentos_autenticacion
CREATE TABLE seguridad.intentos_autenticacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cedula_intentada VARCHAR(20),
    email_intentado CITEXT,
    ip_address INET NOT NULL,
    user_agent TEXT,
    exito BOOLEAN NOT NULL,
    motivo_fallo VARCHAR(100),
    fecha_intento TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE seguridad.intentos_autenticacion IS 'Registro de intentos de autenticación para detectar ataques de fuerza bruta';

-- Tabla 8: auth_refresh_tokens
CREATE TABLE seguridad.auth_refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES seguridad.usuarios(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    revoked_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    creado TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE seguridad.auth_refresh_tokens IS 'Tokens de refresco para autenticación JWT';

-- Tabla 9: notificaciones
CREATE TABLE seguridad.notificaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES seguridad.usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}',
    leida BOOLEAN NOT NULL DEFAULT false,
    fecha_lectura TIMESTAMPTZ,
    enviada_por UUID REFERENCES seguridad.usuarios(id),
    creado TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_expiracion TIMESTAMPTZ
);
COMMENT ON TABLE seguridad.notificaciones IS 'Notificaciones del sistema para usuarios';

-- Índices de seguridad
CREATE INDEX idx_usuarios_cedula ON seguridad.usuarios(cedula);
CREATE INDEX idx_usuarios_email ON seguridad.usuarios(correo_principal);
CREATE INDEX idx_usuarios_activo ON seguridad.usuarios(activo) WHERE activo = true;
CREATE INDEX idx_usuarios_estado ON seguridad.usuarios(estado_usuario);
CREATE INDEX idx_sesiones_usuario ON seguridad.sesiones(usuario_id, estado);
CREATE INDEX idx_sesiones_token ON seguridad.sesiones(token_hash);
CREATE INDEX idx_sesiones_expiracion ON seguridad.sesiones(fecha_expiracion) WHERE estado = 'ACTIVA';
CREATE INDEX idx_intentos_ip_fecha ON seguridad.intentos_autenticacion(ip_address, fecha_intento DESC);
CREATE INDEX idx_intentos_cedula ON seguridad.intentos_autenticacion(cedula_intentada);
CREATE INDEX idx_notificaciones_usuario ON seguridad.notificaciones(usuario_id, leida, creado DESC);

