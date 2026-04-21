SET search_path TO seguridad, public;
DELETE FROM roles;
INSERT INTO roles (codigo, nombre, nivel_jerarquico, es_rol_sistema) VALUES
('ESTUDIANTE', 'Estudiante Académico', 1, true),
('DOCENTE', 'Personal Docente', 2, true),
('ANALISTA', 'Analista de Control de Estudios', 3, true), -- El cambio solicitado
('COORDINADOR_CARRERA', 'Coordinador Académico de Carrera', 4, true), -- Segmentación 1
('COORDINADOR_CE', 'Coordinador de Control de Estudios (Operativo)', 4, true), -- Segmentación 2
('ADMINISTRADOR', 'Administrador del Sistema', 5, true),
('AUDITOR', 'Auditor de Seguridad e Integridad', 5, true)
ON CONFLICT (codigo) DO NOTHING;

SELECT * FROM roles ORDER BY nivel_jerarquico;