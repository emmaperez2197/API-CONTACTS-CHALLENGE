<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# 🚀 API de Contactos con Nest.JS

## 🏗️ Arquitectura y Patrones Utilizados

### 📦 **NestJS**: Framework para Backend

NestJS es un framework para construir aplicaciones escalables del lado del servidor utilizando TypeScript y Node.js, inspirado en Angular.

### 🧩 **Inyección de Dependencias (DI)**

Utilizamos el patrón de Inyección de Dependencias para gestionar automáticamente las dependencias de servicios y controladores, promoviendo el desacoplamiento del código.

### 🏛️ **Patrón Repository**

Aplicamos el patrón Repository para abstraer la lógica de acceso a la base de datos, utilizando **TypeORM** para interactuar con una base de datos **PostgreSQL**.

### 🌐 **Controladores (Controllers)**

Los controladores gestionan las rutas HTTP, delegando la lógica de negocio a los servicios. Cada controlador se encarga de un conjunto de rutas relacionadas.

### 🔑 **Patrón Singleton**

NestJS asegura que cada servicio tenga una única instancia durante el ciclo de vida de la aplicación, utilizando el patrón Singleton.

### 🛠️ **Middlewares**

Los middlewares permiten interceptar las solicitudes antes de que lleguen a los controladores, utilizados para validaciones o logueo de información.

### 🗂️ **DTO (Data Transfer Object)**

Los DTOs son utilizados para definir y validar la estructura de los datos que se reciben y envían a través de las rutas, garantizando que la información sea válida.

### 🛡️ **Guards y Decoradores**

Los **guards** controlan el acceso a las rutas, mientras que los **decoradores** permiten añadir metadatos a clases y métodos, facilitando la validación y autorización.

### 🔍 **Pipes y Filters**

Los **pipes** transforman y validan datos de entrada, mientras que los **filters** gestionan excepciones y errores globales.

### ⚙️ **Configuración y Variables de Entorno**

El proyecto usa variables de entorno para manejar configuraciones como la conexión a la base de datos y otros parámetros sensibles, facilitando la portabilidad.

### 🧑‍💻 **Testing (Pruebas)**

Se emplea **Jest** y **Supertest** para realizar pruebas de integración, asegurando que los controladores y servicios funcionen correctamente.

Este proyecto sigue una estructura modular y desacoplada, usando las mejores prácticas de NestJS para asegurar escalabilidad y mantenimiento eficiente.

## 🚀 Tecnologías Utilizadas

## Technologies Used

- 🐱‍🏍 **NestJS** - Framework backend de Node.js
- 🍃 **Mongoose** - ORM for MongoDB
- 🐳 **Docker** - Application containerization
- 🧪 **Jest and SuperTest** - Framewors the test

## 📁 Estructura del Proyecto

La estructura del proyecto sigue una arquitectura modular para facilitar el mantenimiento y la escalabilidad.

```plaintext
📦 proyecto
├── 📁 src                       # Código fuente principal de la aplicación.
│   ├── 📁 app                   # Módulo raíz de la aplicación, generalmente contiene el app.module.ts.
│   ├── 📁 common                # Funcionalidades comunes y reutilizables en la aplicación (decoradores, filtros, servicios, etc.).
│   ├── 🗂️ main.ts               # Archivo principal para iniciar la aplicación NestJS.
│   ├── 📁 modules               # Módulos específicos de funcionalidades de la aplicación.
│   ├── 📁 settings              # Configuración y entorno de la aplicación (como base de datos y variables de entorno).
│   └── 📁 utils                 # Funciones y utilidades generales para la aplicación.
├── 📁 test                      # Archivos relacionados con pruebas y tests de integracion.
│   ├── 📁 factories             # Fábricas para crear datos de prueba.
│   ├── 🗂️ jest.setup.ts         # Configuración adicional para Jest antes de ejecutar las pruebas.
│   ├── 📁 spec                  # Especificaciones de pruebas para distintos módulos y funcionalidades.
│   └── 📁 utils                 # Utilidades específicas para las pruebas.
├── 📁 tsconfig.build.json       # Configuración de TypeScript para la construcción de la aplicación.
└── 📁 tsconfig.json             # Configuración global de TypeScript para todo el proyecto.
├── 📝 README.md                 # Documentación general del proyecto.
├── 📁 package.json              # Dependencias y scripts de Node.js.
├── 📁 package-lock.json         # Registra las versiones exactas de las dependencias.
├── 🐳 docker-compose.yml        # Archivo para configurar y ejecutar los servicios con Docker.
├── 🐳 Dockerfile                # Archivo de configuración para crear la imagen Docker de la aplicación.



```

## Instalaciones

### Clone el repositorio y ejecute el siguiente comando

```bash

$ git clone https://github.com/emmaperez2197/API-CONTACTS-CHALLENGE
$ cd proyecto
$ npm install
```

## Cambia el .env.example por .env

```

PORT=3000
DATABASE_NAME=api_challenge
DATABASE_HOST=localhost
DATABASE_PORT=27017

NODE_ENV=develop
```

## Ejecutar la aplicación

```bash

# watch mode
$ npm run start:dev


```

## Docker

En caso de que docker esté instalado puedes ejecutar el siguiente comando ejecutar `docker compose up -d`

## 📋 Endpoints de la API

#### 1. **Crear Contacto**

`POST /api/contacts`  
**Body (Request):**

```
{
 "name": "nuevo nombre",
 "company": "nueva empresa",
 "email": "nuevoemail@gmail.com",
 "birthDate": "2025-07-10",
 "phoneNumbers": {
   "personal": "1134567890",
   "work": "1134567891"
 },
 "address": "nueva direccion",
 "city": "nueva ciudad",
 "state": "nuevo estado"
}


```

---

### 2. **Actualizar Contacto**

`PUT /api/contact/:id`  
**Body (Request):** Todos los campos son opcionales. Puedes enviar solo los campos que desees actualizar.

```
{
 "name": "nuevo nombre",           // Opcional
 "company": "nueva empresa",       // Opcional
 "email": "nuevoemail@gmail.com",  // Opcional
 "birthDate": "2025-07-10",        // Opcional
 "phoneNumbers": {
   "personal": "1134567890",       // Opcional
   "work": "1134567891"            // Opcional
 },
 "address": "nueva direccion",    // Opcional
 "city": "nueva ciudad",          // Opcional
 "state": "nuevo estado"          // Opcional
}
```

---

### 3. **Obtener Contacto por ID**

`GET /api/contact/:id`  
**Body (Response):**

```
{
 "_id": "672e6ae16a9194a467cc2346",
 "__v": 0,
 "name": "nuevo nombre",
 "company": "nueva empresa",
 "email": "nuevoemail@gmail.com",
 "birthDate": "2025-07-10",
 "phoneNumbers": {
   "personal": "1134567890",
   "work": "1134567891"
 },
 "address": "nueva direccion",
 "city": "nueva ciudad",
 "state": "nuevo estado"
}

```

---

### 4. **Filtrar Contactos**

`GET /api/contact`
**Query Parameters**: Puedes filtrar los contactos utilizando cualquiera de los siguientes parámetros de consulta. Todos los filtros son opcionales y puedes combinarlos según necesites.

- `email` (string): Filtra por correo electrónico del contacto.
- `state` (string): Filtra por el estado del contacto.
- `city` (string): Filtra por la ciudad del contacto.
- `phoneNumbers.personal` (string): Filtra por el número de teléfono personal del contacto.
- `phoneNumbers.work` (string): Filtra por el número de teléfono de trabajo del contacto.

**Ejemplo de solicitud**:

`bash`
GET /contacts/filter?email=email@gmail.com&state=testState&city=testCity

---

---

### 6. **Eliminar Contacto**

`DELETE /contacts/:id`

## 🧪 Tests de Integración

Para ejecutar las pruebas de integración, asegúrate de tener configurado un entorno de prueba adecuado. Crea un archivo `.env.test` con las siguientes variables:

```env
PORT=3001
DATABASE_NAME=api_challenge_test
DATABASE_HOST=localhost
DATABASE_PORT=27017
NODE_ENV=test


## Contacto

- 📧 Email: emmanuelperezdev@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/emmaperez-dev/)
```
