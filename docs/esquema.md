apps/
├── auth-ms/                    # Microservicio de autenticación (ya existe)
│   └── src/
│       └── ...
│
├── admin-ms/                   # NUEVO: Microservicio de administración
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.service.ts
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── crear-coordinador.dto.ts
│   │   │   │   ├── crear-secretario.dto.ts
│   │   │   │   ├── crear-docente.dto.ts
│   │   │   │   └── crear-estudiante.dto.ts
│   │   │   │
│   │   │   ├── interfaces/
│   │   │   │   └── i-usuario-creado.interface.ts
│   │   │   │
│   │   │   └── decoradores/
│   │   │       └── roles.decorator.ts (compartido)
│   │   │
│   │   ├── usuarios/           # Repositorios compartidos
│   │   │   ├── usuarios.module.ts
│   │   │   ├── usuarios.repository.ts
│   │   │   └── entidades/
│   │   │       └── usuario.entity.ts
│   │   │
│   │   ├── docentes/
│   │   │   ├── docentes.module.ts
│   │   │   ├── docentes.repository.ts
│   │   │   └── entidades/
│   │   │       └── docente.entity.ts
│   │   │
│   │   ├── estudiantes/
│   │   │   ├── estudiantes.module.ts
│   │   │   ├── estudiantes.repository.ts
│   │   │   └── entidades/
│   │   │       └── estudiante.entity.ts
│   │   │
│   │   └── common/
│   │       ├── enums/
│   │       │   └── role.enum.ts
│   │       ├── dto/
│   │       │   └── crear-usuario-base.dto.ts
│   │       └── redis/
│   │           ├── redis.module.ts
│   │           └── redis.service.ts
│   │
│   └── Dockerfile
│
└── api-gateway/                # NUEVO: API Gateway con Redis
    ├── src/
    │   ├── main.ts
    │   ├── app.module.ts
    │   ├── gateway/
    │   │   ├── gateway.module.ts
    │   │   ├── gateway.controller.ts
    │   │   ├── gateway.service.ts
    │   │   └── dto/
    │   │       └── crear-usuario.dto.ts
    │   └── common/
    │       └── redis/
    │           ├── redis.module.ts
    │           └── redis.service.ts
    └── Dockerfile