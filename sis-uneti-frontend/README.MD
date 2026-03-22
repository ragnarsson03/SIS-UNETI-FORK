# SIS-UNETI Frontend

Este es el cliente web oficial del ecosistema SIS-UNETI, diseñado para ofrecer una interfaz administrativa y académica moderna, rápida y segura.

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
</div>

<br/>

## 🚀 Stack Detallado

- **Core:** React 18.3.1 (Hooks & Context API).
- **Build Tool:** Vite 7.3.1 (Optimizado para desarrollo ultra rápido).
- **Styling:** Tailwind CSS 4.2 (Diseño atómico y responsivo).
- **Language:** TypeScript (Strict Mode para evitar errores en producción).
- **Containerization:** Multi-stage Docker con Node 24.14.0-slim y Nginx Stable.

## 📦 Instalación y Desarrollo

**Requisitos:** Node.js 24.14.0 y npm 10.x.

**Clonar e instalar:**
```bash
cd sis-uneti-frontend
npm install
```

**Variables de Entorno:**
Copia el archivo `.env.template` a `.env` y configura la URL del API Gateway.

**Ejecución:**
```bash
npm run dev
```

## 🐳 Despliegue con Docker (Producción)

Hemos implementado una estrategia de seguridad perimetral en nuestra imagen de Docker:

- **Multi-stage Build:** Una etapa de construcción con Node para generar el `dist` y una etapa final ligera con Nginx.
- **Seguridad:** El contenedor corre bajo un usuario no-root (`nginx`) para mitigar vulnerabilidades de escalada de privilegios.
- **Optimización:** Uso de `.dockerignore` para evitar subir `node_modules` innecesarios al contexto del build.

Para levantar solo el frontend vía Docker:
```bash
docker build -t sis-uneti-frontend -f frontend.dockerfile .
```

## 🏗️ Estructura del Proyecto

- `src/components`: Componentes reutilizables de la UI.
- `src/context`: Gestión del estado global de la aplicación.
- `src/hooks`: Lógica de negocio extraída y reutilizable.
- `src/services`: Capa de comunicación con el API Gateway.
