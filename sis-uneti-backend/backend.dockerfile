# ETAPA 1: BUILDER (Corre como root por defecto)
FROM node:24-slim AS builder

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos TODAS las dependencias (producción + desarrollo) para construir
RUN npm install

# Copiamos el resto del código y construimos
COPY . .

# Argumento para definir qué microservicio construir (por defecto: api-gateway)
ARG APP_NAME=api-gateway
RUN npm run build ${APP_NAME}

# 🔥 Toque Senior: Limpiamos las dependencias de desarrollo (Nest CLI, schematics, etc.)
# Esto elimina las vulnerabilidades (ajv, tar) antes de pasar a la etapa de producción,
# haciendo que la imagen final sea limpia y apta para auditorías de seguridad.
RUN npm prune --omit=dev


# ETAPA 2: PRODUCCIÓN (Corre seguro y sin root)
FROM node:24-slim AS production

# Creamos el usuario no-root en el sistema de manera segura
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nodejs

WORKDIR /app

# Copiamos solo los node_modules podados (sin devDependencies) 
# y la carpeta dist construida, cambiando el dueño al usuario nodejs.
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Variables de entorno por defecto
ENV NODE_ENV=production

# AHORA SÍ, bajamos los privilegios
USER nodejs

# Puerto del microservicio
EXPOSE 3000

# Argumento para saber qué microservicio levantar
ARG APP_NAME=api-gateway

# Comando de ejecución
CMD ["node", "dist/apps/api-gateway/main.js"]

