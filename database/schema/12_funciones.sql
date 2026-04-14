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
