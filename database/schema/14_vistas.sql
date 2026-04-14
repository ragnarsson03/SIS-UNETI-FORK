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
