#!/bin/bash
set -e

# Asegurar que se detiene en caso de error
ON_ERROR_STOP=1

run_sql_from_dir() {
    local dir=$1
    if [ -d "$dir" ]; then
        echo "--- Procesando directorio: $dir ---"
        for f in $(find "$dir" -name '*.sql' | sort); do
            echo "Ejecutando $f..."
            psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$f"
        done
    else
        echo "Directorio no encontrado: $dir"
    fi
}

echo "=== Iniciando Orquestador de PostgreSQL ==="

# 1. Configuración de Infraestructura (Extensiones, etc.)
echo "Configurando extensiones e infraestructura base..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE EXTENSION IF NOT EXISTS "citext";
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";
    CREATE EXTENSION IF NOT EXISTS "btree_gin";
    ALTER DATABASE "$POSTGRES_DB" SET timezone TO 'America/Caracas';
EOSQL

# 2. Ejecutar Esquemas (Tablas, Enums, Funciones)
run_sql_from_dir "/docker-entrypoint-initdb.d/schema"

# 3. Ejecutar Semillas (Solo si estamos en desarrollo)
if [ "$NODE_ENV" != "production" ]; then
    echo "Entorno de desarrollo detectado. Ejecutando seeders..."
    run_sql_from_dir "/docker-entrypoint-initdb.d/seeders"
else
    echo "Entorno de producción. Omitiendo seeders."
fi

echo "=== Orquestador finalizado. ==="
