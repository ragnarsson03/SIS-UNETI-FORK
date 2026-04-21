# 📦 Database — SIS-UNETI

Este directorio contiene los scripts SQL del esquema de la base de datos `data_soberana` (PostgreSQL).

## Estructura

```
database/
├── init-scripts/         # Scripts de inicialización numerados (ejecutados en orden)
│   ├── 00_metadata_inicial.sql
│   ├── 01_configuracion_inicial.sql
│   ├── 02_extensiones_requeridas.sql
│   ├── 03_esquemas_organizacion_logica.sql     ← CREATE SCHEMA
│   ├── 04_enums_globales.sql                    ← ENUMs
│   ├── 05_schema_seguridad.sql                  ← RBAC (9 tablas)
│   ├── 06_schema_academico.sql                  ← PNF, UCs, inscripciones (15 tablas)
│   ├── 07_schema_estudiantes.sql                ← Estudiantes (1 tabla)
│   ├── 08_schema_docentes.sql                   ← Docentes y asignaciones (2 tablas)
│   ├── 09_schema_secretaria.sql                 ← Actas, certificados, trámites (13 tablas)
│   ├── 10_schema_finanzas.sql                   ← Pagos y aranceles (3 tablas)
│   ├── 11_schema_auditoria.sql                  ← Auditoría y logs (3 tablas)
│   ├── 12_schema_configuracion.sql              ← Config institucional (7 tablas)
│   ├── 13_schema_historico.sql                  ← Snapshots históricos (6 tablas)
│   ├── 14_funciones.sql                         ← Funciones PL/pgSQL
│   ├── 15_triggers.sql                          ← Triggers de integridad
│   ├── 16_vistas.sql                            ← Vistas y materializadas
│   ├── 17_rls.sql                               ← Row Level Security
│   ├── 18_datos_iniciales.sql                   ← Seed de datos base
│   └── ...
├── seeders/              # Datos de prueba o fixtures adicionales (por célula)
└── data_soberana.sql     # [LEGADO] Script consolidado v4.0 — NO modificar directamente
```

## Reglas de Trabajo en Equipo

> ⚠️ **Nunca editar `data_soberana.sql` directamente.** Ese archivo es el legado consolidado. Los cambios nuevos van en `init-scripts/`.

1. **Si vas a crear una nueva tabla:** edita el archivo correspondiente a su esquema (ej: `06_schema_academico.sql`).
2. **Si vas a cambiar una tabla existente:** crea un archivo con el siguiente número disponible, ej: `22_alter_tabla_X.sql`, usando `ALTER TABLE` seguro con `IF NOT EXISTS` o `IF EXISTS`.
3. **El orden numérico importa:** Postgres ejecuta los archivos de `/docker-entrypoint-initdb.d/` en orden alfabético al inicializar por primera vez.

## Cómo aplicar cambios en desarrollo

```bash
# Destruir el volumen y levantar de nuevo (solo en desarrollo local)
docker compose down -v
docker compose up db
```

## Esquemas (56 tablas totales)

| Esquema         | Tablas | Descripción                               |
|----------------|--------|-------------------------------------------|
| `seguridad`    | 9      | RBAC, usuarios, sesiones, tokens          |
| `academico`    | 15     | PNF, UCs, períodos, inscripciones         |
| `estudiantes`  | 1      | Expediente del estudiante                 |
| `docentes`     | 2      | Perfil y asignaciones de docentes         |
| `secretaria`   | 13     | Actas, certificados, solicitudes          |
| `finanzas`     | 3      | Pagos y aranceles                         |
| `auditoria`    | 3      | Logs de auditoría y cambios              |
| `configuracion`| 7      | Parámetros institucionales               |
| `historico`    | 6      | Snapshots académicos históricos          |
