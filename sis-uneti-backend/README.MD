# SIS-UNETI Backend (Monorepo) ⚙️

Este directorio aloja el código fuente y la arquitectura de fondo del **Sistema Integral de Gestión Universitaria (SIS-UNETI)**. Está estructurado como un Monorepo utilizando NestJS, permitiendo dividir dominios lógicos masivos en pequeños microservicios autónomos que se comunican entre sí.

## 🚀 Arquitectura y Tecnologías

El backend de **SIS-UNETI** está diseñado bajo un modelo de microservicios escalables y seguros.

<div align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node24" />
</div>

<br/>

### 🛠️ Stack Detallado
* **Framework Core:** NestJS 11 (Arquitectura modular basada en Express).
* **Lenguaje:** TypeScript 5.7+ (Tipado estricto para misión crítica).
* **Base de Datos:** PostgreSQL 18 con TypeORM (Gestión de **Data Soberana**).
* **Transmisión de Datos:** Redis como Broker de mensajería asíncrona.
* **Seguridad:** bcrypt (Hashing de grado militar) y JWT para sesiones.
* **Entorno:** Node.js 24.x LTS (Optimizado en imágenes Multi-stage).

## 📁 Estructura del Ecosistema (Apps)

Bajo el directorio `/apps` radican los microservicios principales:

1.  **`api-gateway`:** Puerta de enlace pública. Expone los endpoints HTTP/REST al frontend de SIS-UNETI y enruta el tráfico hacia los microservicios correspondientes a través de Redis.
2.  **`auth-service`:** Microservicio privado de seguridad. Maneja inicios de sesión, roles (seguridad.roles), validación de JWT y encriptación de claves.
3.  **`control-estudio`:** Microservicio en cargado del esquema y procesos de *académico* (Notas, carreras, materias).
4.  **`inscripciones`:** Microservicio destinado a la matriculación y periodos académicos.

## 📦 Instalación Local

Debido a que las dependencias de producción se gestionan mediante el contenedor de Docker, siempre que desees desarrollar y activar el autocompletado en tu editor (IntelliSense/TS Server), debes descargar los paquetes localmente:

```bash
# Navegar a la carpeta del backend
cd sis-uneti-backend

# Instalar dependencias completas
npm install
```

*(Nota: Evita ejecutar el comando automático `npm audit fix --force` ya que podría degradar versiones críticas de @nestjs/cli necesarias para compilar el Monorepo en Webpack).*

## 🐳 Ejecución y Compilación (Producción)

En producción, el backend se orquesta desde la raíz global del proyecto, pero se rige enteramente por las estrictas reglas de `backend.dockerfile`:

1.  **Stage 1 (Builder):** Compila toda la nube de microservicios mediante `ts-loader` y `webpack` formando binarios (dist) reducidos.
2.  **Stage 2 (Runtime):** Ejecuta código final limitándose únicamente a `npm prune --omit=dev` dentro de un usuario bloqueado y sin privilegios de root (`nodejs`).

Si deseas construir de manera manual la pieza o servicio:

```bash
# Compilar todos los microservicios individualmente
nest build api-gateway
nest build auth-service
```
