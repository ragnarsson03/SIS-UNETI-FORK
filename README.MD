# SIS-UNETI - Sistema de Gestión Integrado

Este proyecto es un prototipo del sistema de gestión para la Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI).

## Estructura del Proyecto

El proyecto está organizado en una arquitectura de microservicios con la siguiente estructura:

```text
sis-uneti/
├── sis-uneti-frontend/     # Aplicación React + Vite + Tailwind
├── sis-uneti-backend/      # API Gateway + Microservicios (NestJS)
│   ├── src/                # Código fuente del backend
│   └── server.ts           # Punto de entrada (Orquestador)
├── docker-compose.yml      # Configuración de PostgreSQL y Redis
├── package.json            # Gestión de dependencias del proyecto
└── .env.example            # Plantilla de variables de entorno
```

## Stack Tecnológico

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Motion.
- **Backend**: NestJS, TypeORM, PostgreSQL, Redis (Microservicios), JWT, Swagger.
- **DevOps**: Docker, GitHub.

## Guía de Instalación Paso a Paso

Siga estos pasos para ejecutar la aplicación en su equipo local:

### 1. Requisitos Previos
Asegúrese de tener instalado:
- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Docker** y **Docker Compose**

### 2. Clonar y Preparar el Proyecto
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd sis-uneti

# Instalar dependencias globales del proyecto
npm install
```

### 3. Configuración de Entorno
Cree el archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
```
*Nota: Los valores por defecto en `.env.example` funcionan con la configuración de Docker proporcionada.*

### 4. Levantar Servicios de Infraestructura
Utilice Docker para iniciar la base de datos PostgreSQL y el servidor Redis:
```bash
docker-compose up -d
```

### 5. Ejecutar la Aplicación
Inicie el servidor de desarrollo que orquesta tanto el backend como el frontend:
```bash
npm run dev
```

### 6. Acceso al Sistema
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Documentación de API (Swagger)**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Desarrollo y Contribución
- El frontend se encuentra en `sis-uneti-frontend`.
- El backend se encuentra en `sis-uneti-backend`.
- El archivo `server.ts` dentro de `sis-uneti-backend` es el encargado de servir el frontend mediante Vite y actuar como Gateway para los microservicios.

## Autores
- Equipo de Desarrollo UNETI Célula 01
