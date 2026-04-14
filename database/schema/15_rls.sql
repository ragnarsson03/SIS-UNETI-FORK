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
