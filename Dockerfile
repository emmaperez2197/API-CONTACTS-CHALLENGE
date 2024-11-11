# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copia el package.json y package-lock.json (si existe) e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente al contenedor
COPY . .

# Instala nodemon para recarga automática en desarrollo
RUN npm install -g @nestjs/cli nodemon

# Expone el puerto de la aplicación (por defecto, Nest usa el 3000)
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "start:dev"]
