-- =====================================================================
-- EXTENSIONES REQUERIDAS
-- =====================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- Para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- Para funciones criptográficas
CREATE EXTENSION IF NOT EXISTS "citext";         -- Para emails case-insensitive
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Para búsquedas textuales eficientes
CREATE EXTENSION IF NOT EXISTS "btree_gin";      -- Para índices compuestos avanzados
