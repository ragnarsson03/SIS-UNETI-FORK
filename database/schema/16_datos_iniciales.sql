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
