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
