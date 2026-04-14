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
