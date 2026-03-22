##Por que node en el docker file del frontend?
##Es necesario node para poder:
##Ejecutar VITE
##Transformar JSX
##Procesar Tailwidncss
##En general, para construir la aplicación frontend antes de servirla con nginx.

FROM node:24.14.0-slim AS build-stage

##Mismo flujo de trabajo que el backend

##Establecemos el directorio de trabajo dentro del contenedor a /app. Esto significa que todos los comandos siguientes se ejecutarán desde este directorio.
WORKDIR /app

##Copiamos archivos de dependencias
COPY package*.json ./

COPY package-lock.json ./

##Una vez se haga el pase a produccion se puede usar npm ci para instalar las dependencias exactamente como se especifica en el package-lock.json, lo que garantiza que se instalen las mismas versiones de las dependencias en cada construcción. Esto es especialmente útil para evitar problemas de compatibilidad y asegurar que la aplicación funcione de manera consistente en diferentes entornos.
RUN npm install


#copiamos el resto del código
COPY . .

#contruimos la app
RUN npm run build

FROM nginx:stable-alpine

##Creamos un usuario no root para ejecutar nginx de forma segura dentro del contenedor. Esto es una buena práctica de seguridad para evitar que nginx se ejecute con privilegios elevados, lo que podría ser explotado por atacantes si hay vulnerabilidades en nginx o en la aplicación que está sirviendo.
RUN sed -i 's/user  nginx;/user  nginx;/g' /etc/nginx/nginx.conf && \
    # Aseguramos que los logs sean escribibles por nginx
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid


#Copiamos los archivos construidos desde la etapa de construcción al directorio donde nginx espera encontrar los archivos estáticos para servir. El flag --chown=nginx:nginx asegura que los archivos copiados sean propiedad del usuario nginx, lo que es necesario para que nginx pueda leerlos y servirlos correctamente.
COPY --from=build-stage --chown=nginx:nginx /app/dist /usr/share/nginx/html


# Configuración mínima para S
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

##PUERTO QUE VAMOS SE VA A EXPONER PARA QUE EL CONTENEDOR PUEDA RECIBIR PETICIONES EN ESE PUERTO. En este caso, el puerto 80 es el puerto por defecto en el que nginx escucha las peticiones HTTP.
EXPOSE 80


#Cambiamos al usuario no-root
USER nginx

CMD ["nginx", "-g", "daemon off;"]