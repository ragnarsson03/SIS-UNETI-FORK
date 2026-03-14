# SIS-UNETI: Sistema Integral de Gestión Universitaria

## 🚀 Célula 01 - Arquitectura y Seguridad
Este repositorio contiene el ecosistema digital del SIS-UNETI, estructurado bajo un modelo de **Monorepo** y arquitectura de microservicios.

## 🛠 Stack Tecnológico Oficial
- **Frontend:** React 18, Vite 7.3, Tailwind CSS 4.2
- **Backend:** Node.js 20.11 (LTS), NestJS 11
- **Base de Datos:** PostgreSQL 18 + TypeORM
- **Comunicación:** Redis (Mensajería entre microservicios)
- **Infraestructura:** Docker + Docker Compose

## 📁 Estructura del Proyecto
- `/sis-uneti-frontend`: Interfaz de usuario (Célula 01/03).
- `/sis-uneti-backend`: API Gateway y Microservicios (Célula 01/02/04).
- `/docker`: Archivos de configuración de contenedores.

## 🌲 GitFlow de Trabajo
1. `main`: Rama de producción (Solo lectura para líderes).
2. `develop`: Integración de todas las células.
3. `feature/nombre-tarea`: Ramas de desarrollo individual.

## ⚙️ Configuración Inicial
1. Clonar el repositorio.
2. Crear archivos `.env` basados en `.env.template` (No subir secretos).
3. Ejecutar `docker-compose up -d` para levantar servicios base (Postgres, Redis).