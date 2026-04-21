-- =====================================================================
-- SIS-UNETI 2026 - ESQUEMA DE BASE DE DATOS CONSOLIDADO (FASE 1)
-- Base de datos: data_soberana
-- Versión: 4.0 - DEFINITIVA
-- Total de tablas: 56
-- 
-- Este script integra las mejores prácticas de las Células 01, 02 y 03,
-- garantizando integridad académica, trazabilidad total y rendimiento óptimo.
-- =====================================================================

-- =====================================================================
-- CONFIGURACIÓN INICIAL
-- =====================================================================

-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE data_soberana
--  WITH 
--  ENCODING = 'UTF8'
--  LC_COLLATE = 'es_VE.UTF-8'
--  LC_CTYPE = 'es_VE.UTF-8'
--  TEMPLATE = template0
--  CONNECTION LIMIT = -1;

-- Conectarse a la base de datos
-- \c data_soberana;

-- =====================================================================
-- EXTENSIONES REQUERIDAS
-- =====================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- Para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- Para funciones criptográficas
CREATE EXTENSION IF NOT EXISTS "citext";         -- Para emails case-insensitive
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Para búsquedas textuales eficientes
CREATE EXTENSION IF NOT EXISTS "btree_gin";      -- Para índices compuestos avanzados

-- =====================================================================
-- CONFIGURACIÓN DE SEGURIDAD
-- =====================================================================
-- ALTER DATABASE data_soberana SET timezone TO 'America/Caracas';
-- ALTER DATABASE data_soberana SET datestyle TO 'ISO, DMY';

-- =====================================================================
-- ESQUEMAS (Organización lógica)
-- =====================================================================
CREATE SCHEMA IF NOT EXISTS seguridad;
CREATE SCHEMA IF NOT EXISTS academico;
CREATE SCHEMA IF NOT EXISTS estudiantes;
CREATE SCHEMA IF NOT EXISTS docentes;
CREATE SCHEMA IF NOT EXISTS secretaria;
CREATE SCHEMA IF NOT EXISTS finanzas;
CREATE SCHEMA IF NOT EXISTS auditoria;
CREATE SCHEMA IF NOT EXISTS configuracion;
CREATE SCHEMA IF NOT EXISTS historico;

-- =====================================================================
-- ENUMS GLOBALES
-- =====================================================================

DO $$ BEGIN
    CREATE TYPE seguridad.rol_usuario AS ENUM (
        'ESTUDIANTE', 'DOCENTE', 'SECRETARIO', 'COORDINADOR', 'ADMINISTRADOR', 'AUDITOR'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE academico.estado_periodo AS ENUM (
        'PLANIFICACION', 'INSCRIPCION', 'ACTIVO', 'CIERRE_NOTAS', 'CERRADO', 'ARCHIVADO'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE academico.estado_materia AS ENUM (
        'CURSANDO', 'APROBADO', 'REPROBADO', 'RETIRADO', 'ANULADO', 'EQUIVALENCIA'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE academico.estado_sync AS ENUM (
        'PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'PARCIAL', 'ERROR', 'RECHAZADO'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE academico.origen_nota AS ENUM (
        'MOODLE', 'MANUAL', 'MIGRACION', 'EQUIVALENCIA'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE secretaria.estado_acta AS ENUM (
        'BORRADOR', 'FIRMADA_DOCENTE', 'VALIDADA_COORD', 'RECIBIDA_SECRETARIA', 'CERRADA', 'ARCHIVADA'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE secretaria.estado_documento AS ENUM (
        'PENDIENTE', 'VERIFICADO', 'APROBADO', 'RECHAZADO', 'OBSOLETO'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE secretaria.estado_solicitud AS ENUM (
        'CREADA', 'EN_REVISION', 'APROBADA', 'RECHAZADA', 'EMITIDA', 'ENTREGADA', 'ANULADA'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE secretaria.estado_tramite AS ENUM (
        'CREADO', 'EN_REVISION', 'APROBADO', 'RECHAZADO', 'CERRADO', 'CANCELADO'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE finanzas.estado_pago AS ENUM (
        'REGISTRADO', 'VALIDADO', 'RECHAZADO', 'CONCILIADO', 'ANULADO'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE seguridad.roles IS 'Catálogo de roles del sistema para RBAC';

-- Tabla 2: permisos
CREATE TABLE seguridad.permisos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(80) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE seguridad.permisos IS 'Permisos granulares del sistema';

-- Tabla 3: usuarios
CREATE TABLE seguridad.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cedula VARCHAR(20) UNIQUE NOT NULL,
    email CITEXT UNIQUE NOT NULL,
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES seguridad.usuarios(id),
    updated_by UUID REFERENCES seguridad.usuarios(id),
    hash_integridad VARCHAR(64) GENERATED ALWAYS AS (
        encode(digest(
            cedula::text || email::text || nombres || apellidos || activo::text,
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    fecha_expiracion TIMESTAMPTZ
);
COMMENT ON TABLE seguridad.notificaciones IS 'Notificaciones del sistema para usuarios';

-- Índices de seguridad
CREATE INDEX idx_usuarios_cedula ON seguridad.usuarios(cedula);
CREATE INDEX idx_usuarios_email ON seguridad.usuarios(email);
CREATE INDEX idx_usuarios_activo ON seguridad.usuarios(activo) WHERE activo = true;
CREATE INDEX idx_usuarios_estado ON seguridad.usuarios(estado_usuario);
CREATE INDEX idx_sesiones_usuario ON seguridad.sesiones(usuario_id, estado);
CREATE INDEX idx_sesiones_token ON seguridad.sesiones(token_hash);
CREATE INDEX idx_sesiones_expiracion ON seguridad.sesiones(fecha_expiracion) WHERE estado = 'ACTIVA';
CREATE INDEX idx_intentos_ip_fecha ON seguridad.intentos_autenticacion(ip_address, fecha_intento DESC);
CREATE INDEX idx_intentos_cedula ON seguridad.intentos_autenticacion(cedula_intentada);
CREATE INDEX idx_notificaciones_usuario ON seguridad.notificaciones(usuario_id, leida, created_at DESC);

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

-- =====================================================================
-- FUNCIONES PERSONALIZADAS
-- =====================================================================

-- Función para el trigger de hash
CREATE OR REPLACE FUNCTION academico.fn_calcular_hash_inscripciones()
RETURNS TRIGGER AS $$
BEGIN
    NEW.hash_integridad := encode(
        digest(
            NEW.estudiante_id::text || 
            NEW.uc_id::text || 
            NEW.periodo_id::text || 
            COALESCE(NEW.nota_final_20::text, 'NULL') || 
            NEW.estado_materia::text,
            'sha256'
        ), 
        'hex'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función 1: Convertir nota Moodle
CREATE OR REPLACE FUNCTION academico.fn_convertir_nota_moodle()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.nota_moodle_original IS NOT NULL THEN
        NEW.nota_convertida_20 := ROUND((NEW.nota_moodle_original / 100.0) * 20);
        IF NEW.nota_convertida_20 < 1 OR NEW.nota_convertida_20 > 20 THEN
            NEW.estado_procesamiento := 'INCONSISTENTE';
            NEW.observaciones := 'Nota convertida fuera de rango 1-20: ' || NEW.nota_convertida_20;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION academico.fn_convertir_nota_moodle() IS 'Convierte notas de escala 0-100 a 1-20';

-- Función 2: Auditoría general
CREATE OR REPLACE FUNCTION auditoria.fn_auditoria_general()
RETURNS TRIGGER AS $$
DECLARE
    v_usuario_id UUID;
    v_usuario_nombre VARCHAR(200);
    v_ip INET;
    v_session_id UUID;
    v_accion VARCHAR(50);
    v_old_data JSONB;
    v_new_data JSONB;
    v_hash VARCHAR(64);
BEGIN
    BEGIN
        v_usuario_id := NULLIF(current_setting('app.usuario_id', true), '')::UUID;
        v_usuario_nombre := NULLIF(current_setting('app.usuario_nombre', true), '');
        v_ip := NULLIF(current_setting('app.ip_address', true), '')::INET;
        v_session_id := NULLIF(current_setting('app.session_id', true), '')::UUID;
    EXCEPTION WHEN OTHERS THEN
        v_usuario_id := NULL;
        v_usuario_nombre := NULL;
        v_ip := NULL;
        v_session_id := NULL;
    END;
    
    IF TG_OP = 'INSERT' THEN
        v_accion := 'INSERT';
        v_old_data := NULL;
        v_new_data := to_jsonb(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        v_accion := 'UPDATE';
        v_old_data := to_jsonb(OLD);
        v_new_data := to_jsonb(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        v_accion := 'DELETE';
        v_old_data := to_jsonb(OLD);
        v_new_data := NULL;
    END IF;
    
    v_hash := encode(digest(
        COALESCE(v_usuario_id::text, 'SISTEMA') || v_accion || TG_TABLE_NAME || 
        COALESCE(v_old_data::text, '') || COALESCE(v_new_data::text, '') || now()::text,
        'sha256'
    ), 'hex');
    
    INSERT INTO auditoria.logs_auditoria (
        usuario_id, usuario_nombre, accion, modulo, tabla_afectada, 
        registro_id, valor_anterior, valor_nuevo, ip_address, session_id, hash_registro
    ) VALUES (
        v_usuario_id, v_usuario_nombre, v_accion, TG_TABLE_NAME, TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id), v_old_data, v_new_data, v_ip, v_session_id, v_hash
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION auditoria.fn_auditoria_general() IS 'Función trigger para auditoría automática';

-- Función 3: Set updated_at
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION fn_set_updated_at() IS 'Actualiza automáticamente el campo updated_at';

-- Función 4: Calcular índice académico
CREATE OR REPLACE FUNCTION academico.fn_calcular_indice(p_estudiante_id UUID)
RETURNS NUMERIC(4,2) AS $$
DECLARE
    v_indice NUMERIC(4,2);
BEGIN
    SELECT 
        COALESCE(SUM(i.nota_final_20 * uc.unidades_credito) / NULLIF(SUM(uc.unidades_credito), 0), 0)
    INTO v_indice
    FROM academico.inscripciones i
    JOIN academico.unidades_curriculares uc ON i.uc_id = uc.id
    WHERE i.estudiante_id = p_estudiante_id
    AND i.estado_materia = 'APROBADO'
    AND i.nota_final_20 IS NOT NULL;
    
    RETURN ROUND(v_indice, 2);
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION academico.fn_calcular_indice(UUID) IS 'Calcula el índice académico ponderado por créditos';

-- Función 5: Verificar prelaciones
CREATE OR REPLACE FUNCTION academico.fn_verificar_prelaciones(
    p_estudiante_id UUID,
    p_uc_id UUID
) RETURNS TABLE (
    cumple BOOLEAN,
    mensaje TEXT,
    prelaciones_faltantes TEXT
) AS $$
DECLARE
    v_faltantes TEXT[];
    v_prelacion RECORD;
BEGIN
    v_faltantes := '{}';
    
    FOR v_prelacion IN 
        SELECT uc_requisito_id, uc.nombre_uc as nombre_requisito
        FROM academico.prelaciones p
        JOIN academico.unidades_curriculares uc ON p.uc_requisito_id = uc.id
        WHERE p.uc_id = p_uc_id
    LOOP
        IF NOT EXISTS (
            SELECT 1 FROM academico.inscripciones i
            WHERE i.estudiante_id = p_estudiante_id
            AND i.uc_id = v_prelacion.uc_requisito_id
            AND i.estado_materia = 'APROBADO'
        ) THEN
            v_faltantes := array_append(v_faltantes, v_prelacion.nombre_requisito);
        END IF;
    END LOOP;
    
    IF array_length(v_faltantes, 1) IS NULL THEN
        RETURN QUERY SELECT true, 'Cumple todas las prelaciones'::TEXT, NULL::TEXT;
    ELSE
        RETURN QUERY SELECT false, 'Faltan prelaciones'::TEXT, array_to_string(v_faltantes, ', ')::TEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION academico.fn_verificar_prelaciones(UUID, UUID) IS 'Verifica si un estudiante cumple las prelaciones para una UC';

-- Función 6: Obtener historial completo
CREATE OR REPLACE FUNCTION academico.fn_obtener_historial_completo(p_estudiante_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_agg(
        jsonb_build_object(
            'periodo', pa.nombre,
            'uc', uc.nombre_uc,
            'codigo_uc', uc.codigo_uc,
            'creditos', uc.unidades_credito,
            'nota', i.nota_final_20,
            'estado', i.estado_materia,
            'intento', i.nro_intento,
            'fecha', i.fecha_cierre_acta
        ) ORDER BY pa.fecha_inicio DESC, uc.trayecto_numero
    )
    INTO v_result
    FROM academico.inscripciones i
    JOIN academico.unidades_curriculares uc ON i.uc_id = uc.id
    JOIN academico.periodos_academicos pa ON i.periodo_id = pa.id
    WHERE i.estudiante_id = p_estudiante_id;
    
    RETURN COALESCE(v_result, '[]'::JSONB);
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION academico.fn_obtener_historial_completo(UUID) IS 'Retorna el historial académico completo en formato JSON';

-- Función 7: Generar certificado QR
CREATE OR REPLACE FUNCTION secretaria.fn_generar_certificado_qr(p_solicitud_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_certificado_id UUID;
    v_qr_token UUID;
    v_hash VARCHAR(64);
BEGIN
    v_qr_token := gen_random_uuid();
    v_hash := encode(digest(v_qr_token::text || now()::text, 'sha256'), 'hex');
    
    INSERT INTO secretaria.certificados_emitidos (
        solicitud_id, estudiante_id, numero_certificado, 
        codigo_qr_uuid, hash_validacion, ruta_pdf, hash_pdf, emitido_por
    )
    SELECT 
        s.id, s.estudiante_id, 
        'CERT-' || to_char(now(), 'YYYYMMDD') || '-' || substr(gen_random_uuid()::text, 1, 8),
        v_qr_token, v_hash, '/certificados/' || s.id || '.pdf', v_hash,
        current_setting('app.usuario_id')::UUID
    FROM secretaria.solicitudes_certificados s
    WHERE s.id = p_solicitud_id
    RETURNING id INTO v_certificado_id;
    
    RETURN '/certificados/' || v_certificado_id || '.pdf';
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION secretaria.fn_generar_certificado_qr(UUID) IS 'Genera un certificado con código QR';

-- =====================================================================
-- TRIGGERS
-- =====================================================================

-- Crear el trigger Función hash
CREATE TRIGGER trg_calcular_hash_inscripciones
    BEFORE INSERT OR UPDATE ON academico.inscripciones
    FOR EACH ROW
    EXECUTE FUNCTION academico.fn_calcular_hash_inscripciones();

-- Trigger 1: Conversión nota Moodle
CREATE TRIGGER trg_convertir_nota_moodle
    BEFORE INSERT OR UPDATE ON academico.evaluaciones_moodle
    FOR EACH ROW
    EXECUTE FUNCTION academico.fn_convertir_nota_moodle();
COMMENT ON TRIGGER trg_convertir_nota_moodle ON academico.evaluaciones_moodle IS 'Convierte automáticamente notas de Moodle de 0-100 a 1-20';

-- Triggers de auditoría
CREATE TRIGGER trg_auditoria_inscripciones
    AFTER INSERT OR UPDATE OR DELETE ON academico.inscripciones
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_inscripciones ON academico.inscripciones IS 'Audita cambios en inscripciones';

CREATE TRIGGER trg_auditoria_estudiantes
    AFTER INSERT OR UPDATE OR DELETE ON estudiantes.estudiantes
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_estudiantes ON estudiantes.estudiantes IS 'Audita cambios en datos de estudiantes';

CREATE TRIGGER trg_auditoria_actas
    AFTER INSERT OR UPDATE OR DELETE ON secretaria.actas
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_actas ON secretaria.actas IS 'Audita cambios en actas';

CREATE TRIGGER trg_auditoria_pagos
    AFTER INSERT OR UPDATE OR DELETE ON finanzas.pagos_aranceles
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_pagos ON finanzas.pagos_aranceles IS 'Audita cambios en pagos';

CREATE TRIGGER trg_auditoria_usuarios
    AFTER INSERT OR UPDATE OR DELETE ON seguridad.usuarios
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_usuarios ON seguridad.usuarios IS 'Audita cambios en usuarios';

CREATE TRIGGER trg_auditoria_secciones
    AFTER INSERT OR UPDATE OR DELETE ON academico.secciones
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_secciones ON academico.secciones IS 'Audita cambios en secciones';

CREATE TRIGGER trg_auditoria_tramites
    AFTER INSERT OR UPDATE OR DELETE ON secretaria.tramites
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_tramites ON secretaria.tramites IS 'Audita cambios en trámites';

CREATE TRIGGER trg_auditoria_acta_items
    AFTER INSERT OR UPDATE OR DELETE ON secretaria.acta_items
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_acta_items ON secretaria.acta_items IS 'Audita cambios en items de actas';

CREATE TRIGGER trg_auditoria_expediente
    AFTER INSERT OR UPDATE OR DELETE ON secretaria.expediente_documentos
    FOR EACH ROW EXECUTE FUNCTION auditoria.fn_auditoria_general();
COMMENT ON TRIGGER trg_auditoria_expediente ON secretaria.expediente_documentos IS 'Audita cambios en documentos de expediente';

-- Triggers de updated_at
CREATE TRIGGER trg_usuarios_updated_at
    BEFORE UPDATE ON seguridad.usuarios
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_usuarios_updated_at ON seguridad.usuarios IS 'Actualiza timestamp de modificación';

CREATE TRIGGER trg_estudiantes_updated_at
    BEFORE UPDATE ON estudiantes.estudiantes
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_estudiantes_updated_at ON estudiantes.estudiantes IS 'Actualiza timestamp de modificación';

CREATE TRIGGER trg_inscripciones_updated_at
    BEFORE UPDATE ON academico.inscripciones
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_inscripciones_updated_at ON academico.inscripciones IS 'Actualiza timestamp de modificación';

CREATE TRIGGER trg_actas_updated_at
    BEFORE UPDATE ON secretaria.actas
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_actas_updated_at ON secretaria.actas IS 'Actualiza timestamp de modificación';

CREATE TRIGGER trg_expediente_updated_at
    BEFORE UPDATE ON secretaria.expediente_documentos
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_expediente_updated_at ON secretaria.expediente_documentos IS 'Actualiza timestamp de modificación';

CREATE TRIGGER trg_solicitudes_updated_at
    BEFORE UPDATE ON secretaria.solicitudes_certificados
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_solicitudes_updated_at ON secretaria.solicitudes_certificados IS 'Actualiza timestamp de modificación';

CREATE TRIGGER trg_tramites_updated_at
    BEFORE UPDATE ON secretaria.tramites
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
COMMENT ON TRIGGER trg_tramites_updated_at ON secretaria.tramites IS 'Actualiza timestamp de modificación';

-- =====================================================================
-- VISTAS
-- =====================================================================

-- Vista 1: Estatus de expediente
CREATE VIEW secretaria.vista_estatus_expediente AS
SELECT 
    e.id as estudiante_id,
    e.usuario_id,
    COUNT(DISTINCT td.id) as total_documentos_requeridos,
    COUNT(DISTINCT CASE WHEN ed.estado = 'APROBADO' THEN ed.id END) as documentos_aprobados,
    COUNT(DISTINCT CASE WHEN ed.estado = 'PENDIENTE' THEN ed.id END) as documentos_pendientes,
    COUNT(DISTINCT CASE WHEN ed.estado = 'RECHAZADO' THEN ed.id END) as documentos_rechazados,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN td.es_obligatorio AND (ed.estado IS NULL OR ed.estado != 'APROBADO') THEN td.id END) = 0 
        THEN 'COMPLETO'
        ELSE 'INCOMPLETO'
    END as estatus_expediente
FROM estudiantes.estudiantes e
CROSS JOIN secretaria.tipos_documento td
LEFT JOIN secretaria.expediente_documentos ed ON e.id = ed.estudiante_id 
    AND td.id = ed.tipo_documento_id 
    AND ed.estado != 'OBSOLETO'
WHERE td.es_obligatorio = true
GROUP BY e.id, e.usuario_id;
COMMENT ON VIEW secretaria.vista_estatus_expediente IS 'Estado de completitud del expediente por estudiante';

-- Vista 2: Historial académico completo
CREATE VIEW academico.vista_historial_academico AS
SELECT 
    i.estudiante_id,
    i.id as inscripcion_id,
    p.nombre as periodo,
    p.fecha_inicio as periodo_inicio,
    p.fecha_fin as periodo_fin,
    uc.codigo_uc,
    uc.nombre_uc,
    uc.unidades_credito,
    i.nro_intento,
    i.nota_final_20,
    i.estado_materia,
    i.origen_nota,
    i.fecha_inscripcion,
    i.fecha_cierre_acta
FROM academico.inscripciones i
JOIN academico.unidades_curriculares uc ON i.uc_id = uc.id
JOIN academico.periodos_academicos p ON i.periodo_id = p.id;
COMMENT ON VIEW academico.vista_historial_academico IS 'Historial académico consolidado de estudiantes';

-- =====================================================================
-- RLS (ROW LEVEL SECURITY)
-- =====================================================================

ALTER TABLE estudiantes.estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE academico.inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE secretaria.expediente_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE finanzas.pagos_aranceles ENABLE ROW LEVEL SECURITY;

CREATE POLICY estudiante_own_data ON estudiantes.estudiantes
    FOR SELECT
    USING (usuario_id = current_setting('app.usuario_id')::UUID);

CREATE POLICY estudiante_own_inscripciones ON academico.inscripciones
    FOR SELECT
    USING (estudiante_id IN (
        SELECT id FROM estudiantes.estudiantes 
        WHERE usuario_id = current_setting('app.usuario_id')::UUID
    ));

CREATE POLICY estudiante_own_expediente ON secretaria.expediente_documentos
    FOR SELECT
    USING (estudiante_id IN (
        SELECT id FROM estudiantes.estudiantes 
        WHERE usuario_id = current_setting('app.usuario_id')::UUID
    ));

CREATE POLICY estudiante_own_pagos ON finanzas.pagos_aranceles
    FOR SELECT
    USING (estudiante_id IN (
        SELECT id FROM estudiantes.estudiantes 
        WHERE usuario_id = current_setting('app.usuario_id')::UUID
    ));

-- =====================================================================
-- DATOS INICIALES
-- =====================================================================

-- Roles base
INSERT INTO seguridad.roles (codigo, nombre, nivel_jerarquico, permisos_default) VALUES
('ESTUDIANTE', 'Estudiante', 1, '{"matricula": true, "consultas": true, "certificaciones": true}'),
('DOCENTE', 'Docente', 2, '{"calificaciones": true, "asistencia": true, "secciones": true, "actas": true}'),
('SECRETARIO', 'Secretario de Control de Estudios', 3, '{"expedientes": true, "certificados": true, "tramites": true, "pagos": true, "actas": true}'),
('COORDINADOR', 'Coordinador de Carrera', 4, '{"validacion_academica": true, "oferta_academica": true, "reportes": true, "supervision": true, "actas_validar": true}'),
('COORDINADOR', 'Coordinador de Control de Estudios', 4, '{"validacion_academica": true, "oferta_academica": true, "reportes": true, "supervision": true, "actas_validar": true}'),
('ADMINISTRADOR', 'Administrador del Sistema', 5, '{"usuarios": true, "configuracion": true, "auditoria": true, "infraestructura": true, "todo": true}')
ON CONFLICT (codigo) DO NOTHING;

-- Tipos de documento base
INSERT INTO secretaria.tipos_documento (codigo, nombre, es_obligatorio) VALUES
('CEDULA', 'Cédula de Identidad (ambos lados)', true),
('PARTIDA_NACIMIENTO', 'Partida de Nacimiento', true),
('TITULO_BACHILLER', 'Título de Bachiller', true),
('NOTAS_BACHILLER', 'Notas Certificadas de Educación Media', true),
('OPSU', 'Comprobante de Asignación OPSU', false),
('CONVENIO', 'Carta de Convenio Empresarial', false),
('FOTO_CARNET', 'Fotografía Tipo Carnet', true),
('CERTIFICADO_MEDICO', 'Certificado Médico', false)
ON CONFLICT (codigo) DO NOTHING;

-- Tipos de trámite base
INSERT INTO secretaria.tipos_tramite (codigo, nombre, requiere_aprobacion) VALUES
('CAMBIO_SECCION', 'Cambio de Sección', true),
('RETIRO_TEMPORAL', 'Retiro Temporal', true),
('RETIRO_DEFINITIVO', 'Retiro Definitivo', true),
('REINGRESO', 'Solicitud de Reingreso', true),
('CAMBIO_CARRERA', 'Cambio de Carrera', true),
('REVISION_NOTA', 'Revisión de Calificación', true),
('CONVALIDACION', 'Solicitud de Convalidación', true)
ON CONFLICT (codigo) DO NOTHING;

-- Conceptos de pago base
INSERT INTO finanzas.conceptos_pago (codigo, nombre, monto_base, es_obligatorio) VALUES
('INSCRIPCION', 'Inscripción Regular', 0, true),
('CERTIFICACION_NOTAS', 'Certificación de Notas', 0, false),
('CONSTANCIA_ESTUDIO', 'Constancia de Estudio', 0, false),
('CARNET', 'Carnet Estudiantil', 0, false),
('TITULO', 'Título Universitario', 0, false)
ON CONFLICT (codigo) DO NOTHING;

-- =====================================================================
-- COMENTARIOS DE DOCUMENTACIÓN
-- =====================================================================

COMMENT ON DATABASE data_soberana IS 'Base de datos principal del SIS-UNETI - Sistema de Información de Secretaría';
COMMENT ON SCHEMA seguridad IS 'Gestión de usuarios, roles, permisos y autenticación (9 tablas)';
COMMENT ON SCHEMA academico IS 'Estructura académica: PNF, trayectos, UC, períodos, inscripciones (15 tablas)';
COMMENT ON SCHEMA estudiantes IS 'Datos específicos y trayectoria de estudiantes (1 tabla)';
COMMENT ON SCHEMA docentes IS 'Datos profesionales y asignaciones de docentes (2 tablas)';
COMMENT ON SCHEMA secretaria IS 'Expedientes, actas, certificaciones y trámites (13 tablas)';
COMMENT ON SCHEMA finanzas IS 'Pagos y aranceles estudiantiles (3 tablas)';
COMMENT ON SCHEMA auditoria IS 'Traza completa de todas las operaciones del sistema (3 tablas)';
COMMENT ON SCHEMA configuracion IS 'Configuración del sistema, plantillas y parámetros (7 tablas)';
COMMENT ON SCHEMA historico IS 'Históricos y logs de operaciones (6 tablas)';

-- =====================================================================
-- RESUMEN FINAL DE TABLAS
-- =====================================================================
/*
TOTAL DE TABLAS: 56

Distribución por esquema:
- seguridad:     9 tablas (1-9)
- academico:     15 tablas (10-24)
- estudiantes:   1 tabla (25)
- docentes:      2 tablas (26-27)
- secretaria:    13 tablas (28-38)
- finanzas:      3 tablas (39-40)
- auditoria:     3 tablas (41-43)
- configuracion: 7 tablas (44-50)
- historico:     6 tablas (51-56)
*/
-- =====================================================================
-- FIN DEL SCRIPT - TOTAL: 56 TABLAS
-- =====================================================================