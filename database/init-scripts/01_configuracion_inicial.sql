-- =====================================================================
-- CONFIGURACIÓN INICIAL
-- =====================================================================

-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE data_soberana
--  WITH 
--  ENCODING = 'UTF8'
--  LC_COLLATE = 'es_VE.UTF-8'
--  LC_CTYPE = 'es_VE.UTF-8'
--  TEMPLATE = template0
--  CONNECTION LIMIT = -1;

-- Conectarse a la base de datos destino primero
\c data_soberana;

-- Ahora sí, crear la extensión dentro de esta DB
CREATE EXTENSION IF NOT EXISTS pgcrypto;