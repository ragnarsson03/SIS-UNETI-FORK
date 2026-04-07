-- =============================================================================
-- SIS-UNETI: Seed de Datos Académicos (PNFs, Períodos, Cohortes)
-- Archivo: database/seeders/02_academico.sql
-- IDEMPOTENTE: ON CONFLICT (id) DO NOTHING — seguro para re-ejecuciones.
-- =============================================================================

-- 1. PROGRAMAS NACIONALES DE FORMACIÓN (UUIDs fijos)
INSERT INTO academico.pnf_carreras
    (id, codigo, nombre, tipo_programa, duracion_trayectos, resolucion_autorizacion, fecha_autorizacion)
VALUES
    ('f98195e8-b822-44d5-9566-27cfc5612bd2', 'PNF-INF', 'Informática',       'INGENIERIA', 4, 'RES-003-2024', '2024-01-01'),
    ('a2222222-2222-2222-2222-222222222222', 'PNF-TEL', 'Telecomunicaciones', 'INGENIERIA', 4, 'RES-004-2024', '2024-01-01')
ON CONFLICT (id) DO NOTHING;

-- 2. PERÍODO ACADÉMICO ACTIVO 2026-I (UUID fijo)
-- Corregido: codigo_corto, estado (usando el tipo ENUM) y usando ON CONFLICT id
INSERT INTO academico.periodos_academicos
    (id, nombre, codigo_corto, fecha_inicio, fecha_fin, estado, fecha_inicio_inscripcion, fecha_fin_inscripcion)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Período Acad. 2026-I', '2026-I', '2026-01-15', '2026-07-15', 'ACTIVO', '2026-01-01', '2026-01-14')
ON CONFLICT (id) DO NOTHING;

-- 3. COHORTES ACTIVAS (UUIDs fijos — el backend los devuelve al Frontend)
INSERT INTO academico.cohortes
    (id, pnf_id, ano_ingreso, periodo_ingreso_id, codigo_cohorte, descripcion, estado_cohorte)
VALUES
    ('f1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c', 'f98195e8-b822-44d5-9566-27cfc5612bd2', 2026, '11111111-1111-1111-1111-111111111111', 'COH-2026-I-INF', 'Cohorte 2026-I Informática',       'ACTIVA'),
    ('b3333333-3333-3333-3333-333333333333', 'a2222222-2222-2222-2222-222222222222', 2026, '11111111-1111-1111-1111-111111111111', 'COH-2026-I-TEL', 'Cohorte 2026-I Telecomunicaciones', 'ACTIVA')
ON CONFLICT (id) DO NOTHING;
