<div align="center">
  <img src="https://github.com/user-attachments/assets/8ea70b44-b464-42e8-b9cd-211a65ba37f8" alt="Logo UNETI" width="250"/>
  <h1>SIS-UNETI: Sistema Integral de Gestión Universitaria</h1>
  <p><em>Célula 01 - Arquitectura y Seguridad</em></p>
</div>

Este repositorio contiene el ecosistema digital del SIS-UNETI, estructurado bajo un modelo de **Monorepo** y arquitectura de microservicios.

## 🛠 Stack Tecnológico Oficial
- **Frontend:** React 18, Vite 7.3, Tailwind CSS 4.2
- **Backend:** Node.js 24.14.0, NestJS 11
- **Base de Datos:** PostgreSQL 18 + TypeORM
- **Comunicación:** Redis (Mensajería entre microservicios)
- **Infraestructura:** Docker + Docker Compose

## 📁 Estructura del Proyecto
- `/assets`: Recursos gráficos y multimedia globales del proyecto.
- `/database`: Scripts de inicialización y esquema de "Data Soberana".
- `/sis-uneti-frontend`: Interfaz de usuario (Célula 01/03).
- `/sis-uneti-backend`: API Gateway y Microservicios (Célula 01/02/04).
- `docker-compose.yml`: Orquestador principal de la infraestructura local.

## 🌲 GitFlow de Trabajo
1. `main`: Rama de producción (Solo lectura para líderes).
2. `develop`: Integración de todas las células.
3. `feature/nombre-tarea`: Ramas de desarrollo individual para nuevas características.
4. `chore/nombre-tarea`: Ramas de mantenimiento, configuración o actualización de infraestructura.

## ⚙️ Configuración Inicial
1. Clonar el repositorio.
2. Crear archivos `.env` en los respectivos directorios basados en sus `.env.template` (Nunca subir secretos al control de versiones).
3. Ejecutar `docker compose up -d` en la raíz para levantar los servicios base (Postgres, Redis).
