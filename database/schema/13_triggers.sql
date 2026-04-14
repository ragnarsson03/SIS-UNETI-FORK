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
