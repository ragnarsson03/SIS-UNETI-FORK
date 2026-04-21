-- =============================================================================
-- SIS-UNETI: Seed de Usuarios de Desarrollo
-- Archivo: database/02_seed_usuarios.sql
-- Cargado automáticamente por Docker Postgres en el primer arranque.
-- IDEMPOTENTE: Usa ON CONFLICT DO NOTHING → seguro para re-ejecuciones.
-- Contraseña universal de prueba: Uneti2026*  (hash bcrypt con pgcrypto)
-- =============================================================================

DO $$
DECLARE
    v_hash TEXT := crypt('Uneti2026*', gen_salt('bf', 10));
    v_salt TEXT := gen_salt('bf', 10);
BEGIN

-- ─────────────────────────────────────────────
-- 1. INSERTAR USUARIOS DE PRUEBA (si no existen)
-- ─────────────────────────────────────────────
INSERT INTO seguridad.usuarios (cedula, correo_principal, nombres, apellidos, password_hash, salt, activo, estado_usuario)
VALUES
    ('V11111111', 'admin@uneti.edu.ve',          'Usuario',       'Administrador', v_hash, v_salt, true, 'ACTIVO'),
    ('V22222222', 'estudiante@uneti.edu.ve',      'Estudiante',    'Demo',          v_hash, v_salt, true, 'ACTIVO'),
    ('V33333333', 'docente@uneti.edu.ve',         'Docente',       'Demo',          v_hash, v_salt, true, 'ACTIVO'),
    ('V44444444', 'coordinador@uneti.edu.ve',     'Coordinador',   'Demo',          v_hash, v_salt, true, 'ACTIVO'),
    ('V55555555', 'secretario@uneti.edu.ve',      'Secretario',    'Demo',          v_hash, v_salt, true, 'ACTIVO'),
    -- Usuarios Adicionales (Seed de Fernando)
    ('V10000001', 'coordinador.pnf@uneti.edu',    'Coordinador',   'PNF',           v_hash, v_salt, true, 'ACTIVO'),
    ('V10000002', 'secretario.control@uneti.ed', 'Secretario',    'Control',       v_hash, v_salt, true, 'ACTIVO'),
    ('V10000003', 'docente.programacion@un',      'Docente',       'Programacion',  v_hash, v_salt, true, 'ACTIVO'),
    ('V10000004', 'estudiante.2026@uneti.edu',    'Estudiante',    '2026',          v_hash, v_salt, true, 'ACTIVO')
ON CONFLICT (cedula) DO NOTHING;

-- ─────────────────────────────────────────────
-- 2. ASIGNAR ROLES (si no están asignados)
-- ─────────────────────────────────────────────
INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id
FROM seguridad.usuarios u
JOIN seguridad.roles r ON r.codigo = 'ADMINISTRADOR'
WHERE u.cedula = 'V11111111'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id
FROM seguridad.usuarios u
JOIN seguridad.roles r ON r.codigo = 'ESTUDIANTE'
WHERE u.cedula = 'V22222222'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id
FROM seguridad.usuarios u
JOIN seguridad.roles r ON r.codigo = 'DOCENTE'
WHERE u.cedula = 'V33333333'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id
FROM seguridad.usuarios u
JOIN seguridad.roles r ON r.codigo = 'COORDINADOR'
WHERE u.cedula = 'V44444444'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id
FROM seguridad.usuarios u
JOIN seguridad.roles r ON r.codigo = 'SECRETARIO'
WHERE u.cedula = 'V55555555'
ON CONFLICT DO NOTHING;

-- Asignación de Roles para Usuarios de Fernando
INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM seguridad.usuarios u JOIN seguridad.roles r ON r.codigo = 'COORDINADOR' WHERE u.cedula = 'V10000001'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM seguridad.usuarios u JOIN seguridad.roles r ON r.codigo = 'SECRETARIO' WHERE u.cedula = 'V10000002'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM seguridad.usuarios u JOIN seguridad.roles r ON r.codigo = 'DOCENTE' WHERE u.cedula = 'V10000003'
ON CONFLICT DO NOTHING;

INSERT INTO seguridad.usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM seguridad.usuarios u JOIN seguridad.roles r ON r.codigo = 'ESTUDIANTE' WHERE u.cedula = 'V10000004'
ON CONFLICT DO NOTHING;

RAISE NOTICE '✅ Seed de usuarios completado. Contraseña universal: Uneti2026*';

END $$;
-- NOTA: Los datos académicos (PNFs, Período, Cohortes) están en 02_seed_academico.sql
