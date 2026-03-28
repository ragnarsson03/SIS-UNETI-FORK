# SIS-UNETI 2026 — Site Map & Progress Tracker
**Célula 01: Arquitectura y Seguridad** | Versión: 2.1 | Actualizado: 23/03/2026

Basado en el Flujograma y el Informe Técnico de Procesos, el sistema debe estructurarse mediante un control de acceso basado en roles (RBAC).

> 📌 **LEYENDA DE ESTADOS:**
> `[x]` Completado (Estable)
> `[/]` En Progreso (Base/Mock desplegado)
> `[ ]` Pendiente

---

### 🛡️ INFRAESTRUCTURA FRONTEND (Célula 01)
*Sección técnica de soporte para el enrutamiento y seguridad.*

- `[x]` **AuthContext**: Gestión de estado global y tokens JWT.
- `[x]` **ProtectedRoute**: Guardia de rutas por jerarquía de roles.
- `[x]` **PublicLayout**: Shell para vistas sin autenticación (Header/Footer UNETI).
- `[x]` **DashboardLayout**: Shell para panel administrativo de usuarios.
- `[x]` **App.tsx**: Enrutamiento centralizado y jerarquía de accesos.
- `[x]` **index.html**: Inyección de fuentes corporativas y estilos base.

---

### 🗺️ ESTRUCTURA Y PROGRESO DEL SISTEMA

SIS-UNETI 2026
│
├── 🌐 ZONA PÚBLICA (Sin autenticación)
│   ├── /
│   │   ├── [x] Landing Institucional (Estética unificada portal UNETI)
│   │   ├── [x] Noticias y Anuncios
│   │   └── [x] Acceso a sistemas (Link funcional a /login)
│   │
│   ├── /auth
│   │   ├── [x] /login (Autenticación centralizada premium)
│   │   ├── [ ] /recuperar-contrasena (Recuperación por correo/SMS)
│   │   ├── [ ] /restablecer-contrasena/:token
│   │   └── [ ] /verificar-certificado/:qr_uuid (Validación pública de documentos)
│   │
│   └── /consulta-externa
│       ├── [ ] Verificación de certificados por código QR
│       └── [ ] Verificación de constancias por datos personales
│
├── 👨‍🎓 MÓDULO ESTUDIANTE (Rol: ESTUDIANTE)
│   ├── [/] /estudiante/dashboard
│   │   │   Note: Interfaz base desplegada con KPIs y Accesos Rápidos
│   │   │   (Pendiente refactorización de sub-componentes).
│   │   ├── [x] Estatus académico actual (trayecto, UC en curso)
│   │   ├── [ ] Alertas y notificaciones (documentos pendientes, pagos, fechas límite)
│   │   ├── [x] Progreso hacia el grado (% avance)
│   │   └── [x] Accesos rápidos (matrícula, certificados, carnet)
│   │
│   ├── /estudiante/perfil
│   │   ├── [ ] /datos-personales (Visualizar/Actualizar: teléfono, dirección, correos)
│   │   ├── [ ] /datos-socioeconomicos (Visualizar clasificación y beneficios)
│   │   ├── [ ] /cambiar-contrasena
│   │   └── [ ] /preferencias-notificaciones
│   │
│   ├── /estudiante/matricula [PROCESO CRÍTICO]
│   │   ├── [ ] /oferta-academica (Ver UC disponibles por trayecto, horarios, docentes, cupos)
│   │   ├── [ ] /validar-prelaciones (Sistema valida automáticamente requisitos previos)
│   │   ├── [ ] /inscripcion (Seleccionar UC, confirmar inscripción)
│   │   ├── [ ] /comprobante/:id (Descargar PDF con QR de inscripción oficial)
│   │   └── [ ] /historial-inscripciones (Períodos anteriores)
│   │
│   ├── /estudiante/academico
│   │   ├── [ ] /record-academico (Notas por trayecto, promedios ponderados)
│   │   ├── [ ] /historial-completo (Todas las UC cursadas con intentos)
│   │   ├── [ ] /constancia-estudio (Solicitar/Descargar - No oficial)
│   │   └── [ ] /certificacion-notas (Solicitar certificación oficial con QR)
│   │
│   ├── /estudiante/carnet-digital
│   │   ├── [ ] Visualizar carnet actual (foto, datos, código QR/barras)
│   │   ├── [ ] Descargar PDF para impresión
│   │   └── [ ] Historial de carnets (renovaciones)
│   │
│   ├── /estudiante/asistencia
│   │   ├── [ ] Consulta por UC/sección (% asistencia acumulada)
│   │   └── [ ] Historial de inasistencias
│   │
│   ├── /estudiante/tramites [NUEVO]
│   │   ├── [ ] /solicitar (Cambio de sección, Cambio de PNF, Solicitud de grado)
│   │   ├── [ ] /consultar-estatus (Seguimiento de trámites en curso)
│   │   └── [ ] /historial (Trámites procesados)
│   │
│   ├── /estudiante/asistente-virtual [NUEVO - REQ-ES-04]
│   │   ├── [ ] Chat interactivo (NLP para consultas frecuentes)
│   │   ├── [ ] FAQ académico inteligente
│   │   └── [ ] Escalamiento a humano (Generar ticket de soporte)
│   │
│   └── /estudiante/notificaciones
│       ├── [ ] Bandeja de entrada (documentos pendientes, confirmaciones de pago)
│       └── [ ] Configurar alertas (email, SMS, push)
│
├── 👨‍🏫 MÓDULO DOCENTE (Rol: DOCENTE)
│   ├── /docente/dashboard
│   │   ├── [ ] Horario semanal visual
│   │   ├── [ ] Secciones asignadas (cursadas actualmente)
│   │   ├── [ ] Alertas de sincronización Moodle
│   │   └── [ ] Estadísticas rápidas (estudiantes por sección)
│   │
│   ├── /docente/secciones
│   │   ├── [ ] /mis-secciones (Listado del período actual)
│   │   ├── [ ] /:id_seccion/estudiantes (Nómina de estudiantes inscritos)
│   │   ├── [ ] /:id_seccion/horario (Detalle de encuentros)
│   │   └── [ ] /:id_seccion/recursos (Material de apoyo)
│   │
│   ├── /docente/calificaciones [PROCESO CRÍTICO]
│   │   ├── [ ] /sync-moodle (Verificar estado de sincronización)
│   │   ├── [ ] /:id_seccion/notas-parciales (Revisar/importar de Moodle)
│   │   ├── [ ] /:id_seccion/nota-final-manual (Ingreso directo 1-20 con justificación)
│   │   ├── [ ] /:id_seccion/historial-modificaciones (Auditoría de cambios)
│   │   └── [ ] /:id_seccion/cerrar-acta (Generar borrador → Firmar digitalmente)
│   │
│   ├── /docente/asistencia
│   │   ├── [ ] /:id_seccion/registrar (Por fecha: presente/ausente/justificado)
│   │   ├── [ ] /:id_seccion/reporte (Porcentaje por estudiante)
│   │   └── [ ] /:id_seccion/historial (Registro completo del período)
│   │
│   ├── /docente/comunicacion [NUEVO]
│   │   ├── [ ] /mensajes-masivos (Enviar a toda la sección)
│   │   ├── [ ] /consultas-estudiantes (Bandeja de entrada de preguntas)
│   │   └── [ ] /:id_mensaje/responder (Hilo de conversación)
│   │
│   ├── /docente/actas-academicas
│   │   ├── [ ] /generar-preliminar (Borrador con notas cargadas)
│   │   ├── [ ] /revisar (Vista previa antes de firma)
│   │   ├── [ ] /firmar-digital (Confirmar notas definitivas)
│   │   └── [ ] /historial-actas (Actas firmadas períodos anteriores)
│   │
│   ├── /docente/reportes-personales
│   │   ├── [ ] /historial-cursos-impartidos (Trayectoria docente)
│   │   ├── [ ] /carga-horaria-anual
│   │   └── [ ] /estadisticas-rendimiento (Por sección histórica)
│   │
│   └── /docente/perfil
│       ├── [ ] Datos profesionales (categoría, escalafón)
│       └── [ ] Cambiar contraseña
│
├── 🎓 MÓDULO COORDINADOR DE CARRERA (Rol: COORDINADOR)
│   ├── /coordinador/dashboard
│   │   ├── [ ] KPIs académicos (% aprobación por UC, deserción)
│   │   ├── [ ] Alertas de carga de notas pendientes
│   │   ├── [ ] Estudiantes con documentos pendientes
│   │   └── [ ] Resumen de inscripciones del período
│   │
│   ├── /coordinador/gestion-academica [NUEVO]
│   │   ├── [ ] /pnf (Listar/Ver Programas Nacionales de Formación)
│   │   ├── [ ] /trayectos (Configurar por PNF)
│   │   ├── [ ] /unidades-curriculares (Crear/Editar UC, asignar créditos)
│   │   └── [ ] /prelaciones (Definir requisitos previos, validar grafos)
│   │
│   ├── /coordinador/cohortes [NUEVO]
│   │   ├── [ ] /listado (Cohortes activas por PNF)
│   │   ├── [ ] /:id_cohorte/estudiantes (Matrícula de la cohorte)
│   │   └── [ ] /:id_cohorte/plan-estudio (Asignar versión vigente)
│   │
│   ├── /coordinador/planificacion [PROCESO CRÍTICO]
│   │   ├── [ ] /oferta-academica (Configurar secciones por período)
│   │   ├── [ ] /asignacion-docentes (Vincular docente a sección, validar carga horaria)
│   │   ├── [ ] /cupos-y-horarios (Capacidad, aulas, evitar colisiones)
│   │   └── [ ] /publicar-oferta (Activar para inscripción estudiantil)
│   │
│   ├── /coordinador/validacion-inscripciones [PROCESO CRÍTICO]
│   │   ├── [ ] /pendientes (Cola de solicitudes por revisar)
│   │   ├── [ ] /:id_inscripcion/revisar (Ver expediente, notas previas, documentos)
│   │   ├── [ ] /aprobar (Confirmar inscripción)
│   │   ├── [ ] /solicitar-documentos (Condicional)
│   │   └── [ ] /rechazar (Con motivo registrado)
│   │
│   ├── /coordinador/supervision-calificaciones
│   │   ├── [ ] /carga-por-docente (% de notas cargadas vs. pendientes)
│   │   ├── [ ] /validar-actas (Revisar y aprobar actas firmadas por docentes)
│   │   ├── [ ] /cerrar-actas-oficiales (Bloqueo definitivo, auditoría)
│   │   └── [ ] /inconsistencias-moodle (Alertas de sincronización)
│   │
│   ├── /coordinador/expedientes [NUEVO]
│   │   ├── [ ] /revisar-documentos (Listado por estudiante)
│   │   ├── [ ] /aprobar-expediente (Para grado/certificación)
│   │   └── [ ] /notificar-pendientes (Envío masivo de alertas)
│   │
│   ├── /coordinador/resolucion-casos [NUEVO]
│   │   ├── [ ] /solicitudes-revision-nota (Estudiante solicita revisión)
│   │   ├── [ ] /analizar-evidencia (Ver historial, comparar)
│   │   ├── [ ] /mantener-nota o /modificar-nota (Con justificación)
│   │   └── [ ] /historial-resoluciones (Auditoría de decisiones)
│   │
│   ├── /coordinador/gestion-egresados [NUEVO]
│   │   ├── [ ] /validar-requisitos-grado (Créditos, UC aprobadas, servicio)
│   │   ├── [ ] /autorizar-tramite-titulo (Aprobación para iniciar proceso)
│   │   └── [ ] /seguimiento-egresados (Estadísticas post-titulación)
│   │
│   ├── /coordinador/sincronizacion-moodle
│   │   ├── [ ] /estado-sync (Última sincronización por período)
│   │   ├── [ ] /forzar-sync-manual (Ejecutar ETL bajo demanda)
│   │   └── [ ] /logs-errores (Diagnosticar fallos de integración)
│   │
│   └── /coordinador/reportes-academicos
│       ├── [ ] /rendimiento-por-uc (Índice aprobación/reprobación)
│       ├── [ ] /desercion-temprana (Alertas por cohorte)
│       ├── [ ] /rendimiento-docente (Por sección y período)
│       └── [ ] /estadisticas-convenios (Análisis por tipo de ingreso)
│
├── 📋 MÓDULO SECRETARÍA DE CONTROL DE ESTUDIOS [NUEVO]
│   ├── /secretaria/dashboard
│   │   ├── [ ] Trámites del día pendientes
│   │   ├── [ ] Expedientes incompletos (alertas)
│   │   ├── [ ] Actas por validar
│   │   └── [ ] Estadísticas de emisión de certificados
│   │
│   ├── /secretaria/expedientes [PROCESO CRÍTICO]
│   │   ├── [ ] /gestionar/:id_estudiante (Carga de documentos escaneados)
│   │   ├── [ ] /digitalizar (Subir: cédula, partida, título, notas OPSU)
│   │   ├── [ ] /verificar-integridad (Checklist automático por PNF/cohorte)
│   │   ├── [ ] /estatus-documental (Completo/Incompleto con detalle)
│   │   └── [ ] /historial-documentos (Versiones anteriores)
│   │
│   ├── /secretaria/emision-certificados [PROCESO CRÍTICO]
│   │   ├── [ ] /generar-constancia (De estudio)
│   │   ├── [ ] /generar-certificacion-notas (Histórico completo oficial)
│   │   ├── [ ] /generar-record-academico (Para uso interno)
│   │   ├── [ ] /validar-qr-externo (Verificar autenticidad)
│   │   └── [ ] /reporte-emisiones (Por período, tipo, usuario)
│   │
│   ├── /secretaria/control-actas
│   │   ├── [ ] /recibir-actas-docentes (Cola de actas firmadas digitalmente)
│   │   ├── [ ] /verificar-firmas (Validación criptográfica)
│   │   ├── [ ] /archivar-acta (En expediente definitivo)
│   │   └── [ ] /consultar-historial-actas (Por sección/período)
│   │
│   ├── /secretaria/tramites-estudiantiles
│   │   ├── [ ] /procesar-cambio-pnf (Validar convalidaciones, migrar historial)
│   │   ├── [ ] /gestionar-retiro-temporal (Cambio estado, reserva cupo)
│   │   ├── [ ] /procesar-reclamos (Quejas sobre notas o procesos)
│   │   └── [ ] /historial-tramites (Por estudiante y período)
│   │
│   ├── /secretaria/gestion-pagos [NUEVO]
│   │   ├── [ ] /registrar-pago-arancel (Inscripción, certificados, carnets)
│   │   ├── [ ] /conciliar-pagos (Cierre diario)
│   │   ├── [ ] /estado-cuenta-estudiante (Consulta de saldos)
│   │   └── [ ] /reporte-financiero (Ingresos por concepto y período)
│   │
│   └── /secretaria/reportes-operativos
│       ├── [ ] /expedientes-incompletos (Listado masivo)
│       ├── [ ] /tramites-por-periodo (Estadísticas de gestión)
│       └── [ ] /alertas-documentos-vencidos
│
└── ⚙️ MÓDULO ADMINISTRADOR (Rol: ADMINISTRADOR - CÉLULA 01)
    ├── /admin/dashboard
    │   ├── [ ] Estado general del sistema
    │   ├── [ ] Estadísticas de usuarios activos
    │   ├── [ ] Alertas de seguridad
    │   └── [ ] Estado de sincronización con Moodle
    │
    ├── /admin/seguridad [RESPONSABILIDAD CÉLULA 01]
    │   ├── /usuarios
    │   │   ├── [ ] /listado
    │   │   ├── [ ] /crear
    │   │   ├── [ ] /:id_usuario/editar
    │   │   ├── [ ] /:id_usuario/cambiar-rol
    │   │   ├── [ ] /:id_usuario/bloquear
    │   │   └── [ ] /:id_usuario/auditoria-accesos
    │   │
    │   ├── /roles-y-permisos
    │   │   ├── [ ] /gestionar-roles
    │   │   ├── [ ] /asignar-permisos
    │   │   └── [ ] /matriz-permisos
    │   │
    │   └── /politicas-seguridad
    │       ├── [ ] /configurar-passwords
    │       ├── [ ] /2fa
    │       └── [ ] /bloqueo-geografico
    │
    ├── /admin/auditoria [RESPONSABILIDAD CÉLULA 01 - RNF6]
    │   ├── /logs-sistema
    │   │   ├── [ ] /visualizador
    │   │   ├── [ ] /filtrar
    │   │   ├── [ ] /buscar-en-json
    │   │   └── [ ] /exportar
    │   │
    │   ├── /trazabilidad-calificaciones
    │   │   ├── [ ] /buscar-por-estudiante
    │   │   ├── [ ] /buscar-por-docente
    │   │   └── [ ] /reporte-forense
    │   │
    │   ├── /auditoria-base-datos
    │   │   ├── [ ] /estado-integrity
    │   │   ├── [ ] /consultas-lentas
    │   │   └── [ ] /conexiones-activas
    │   │
    │   └── /alertas-seguridad
    │       ├── [ ] /intentos-fallidos
    │       ├── [ ] /accesos-fuera-horario
    │       └── [ ] /modificaciones-masivas
    │
    ├── /admin/configuracion-sistema
    │   ├── /parametros-generales
    │   │   ├── [ ] /institucion (Nombre, logo, datos de contacto)
    │   │   ├── [ ] /periodo-activo (Definir período académico vigente)
    │   │   ├── [ ] /fechas-importantes (Inscripción, retiro, cierre actas)
    │   │   └── [ ] /umbrales-alertas (% deserción, notas mínimas, etc.)
    │   │
    │   ├── /gestion-academica-global
    │   │   ├── [ ] /pnf (Crear nuevos programas)
    │   │   ├── [ ] /planes-estudio (Versiones por cohorte)
    │   │   └── [ ] /equivalencias-uc (Convalidaciones entre carreras)
    │   │
    │   └── /infraestructura
    │       ├── [ ] /espacios-fisicos (Aulas, laboratorios, auditorios)
    │       ├── [ ] /recursos-equipamiento (Proyectores, computadoras)
    │       └── [ ] /asignacion-aulas (Scheduler)
    │
    ├── /admin/finanzas [NUEVO]
    │   ├── [ ] /conceptos-pago
    │   ├── [ ] /reporte-ingresos
    │   ├── [ ] /conciliacion-bancaria
    │   └── [ ] /proyecciones-financieras
    │
    ├── /admin/nomina-docente [NUEVO]
    │   ├── [ ] /registro-docentes
    │   ├── [ ] /carga-horaria
    │   ├── [ ] /pagos-docentes
    │   └── [ ] /reportes-nomina
    │
    └── /admin/herramientas-sistema
        ├── [ ] /backup-restauracion
        ├── [ ] /logs-servidor
        ├── [ ] /estado-apis
        └── [ ] /mantenimiento-programado
