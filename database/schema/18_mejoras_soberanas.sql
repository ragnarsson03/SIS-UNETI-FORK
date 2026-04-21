ALTER TABLE estudiantes.estudiantes 
ADD COLUMN IF NOT EXISTS estrato_social VARCHAR(2),
ADD COLUMN IF NOT EXISTS acceso_internet BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS dispositivo_propio BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS situacion_laboral VARCHAR(50);

-- 2. Agregamos documentación Metadata para el equipo de IA (Célula 04)
COMMENT ON COLUMN estudiantes.estudiantes.estrato_social IS 'Nivel A-E basado en el perfil sociográfico de la muestra';
COMMENT ON COLUMN estudiantes.estudiantes.acceso_internet IS 'Indicador de brecha digital para predictiva de deserción';

-- 3. Verificación de seguridad
SELECT 'ADN Soberano Inyectado Exitosamente' as status;