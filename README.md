# Proyecto personal: Gestor de Imágenes y Hoteles (Front-end)

Este repositorio contiene el código fuente del front-end de una aplicación web diseñada para la **gestión de hoteles e imágenes asociadas**. El proyecto se enfoca en proporcionar una interfaz de usuario cómoda para manejar diferentes tipos de imágenes (estándar, 180°, 360°) y interactuar con una API backend para las operaciones CRUD.

## Características Principales

* **Autenticación de Usuario:** Funcionalidad de login que valida usuarios.
* **Gestión de Hoteles (CRUD):** Interfaz para crear, leer, actualizar y eliminar datos de hoteles.
* **Gestión de Imágenes:** Manejo de imágenes de portada y galerías de imágenes asociadas a cada hotel, incluyendo previsualización de distintos tipos (estándar, 180°, 360°).
* **Tabla Interactiva:** Visualización de hoteles en una `DataTable` con ID, nombre e imagen de portada.
* **Funcionalidades de Búsqueda y Filtrado:** `SearchBar` para filtrar la lista de hoteles.
* **Temas Personalizables:** Alternancia entre tema claro y oscuro (`light/dark theme`).

## Tecnologías Utilizadas

### Front-End

* **React (^19.0):** 
* **Vite:** 
* **React Router DOM:** 
* **Redux Toolkit y React Redux:** 
* **TypeScript:**
* **Tailwind CSS 4.0:**

### Back-End

* **Spring Boot (Java):** La API backend, gestionada por un compañero. [Enlace aquí](https://github.com/thewisedreams/trainee-image-content-backend)

---

## **Requisitos Previos**

Para el desarrollo y funcionamiento de este proyecto, necesitarás tener instalado:

* **Node.js LTS:** (Versión de Soporte a Largo Plazo recomendada). Puedes descargarlo desde [nodejs.org](https://nodejs.org/es).
* **npm:** Gestor de paquetes de Node.js (viene incluido con Node.js).
* **Git:** Sistema de control de versiones. Descarga desde [git-scm.com](https://git-scm.com/).

---

## **Configuración y Ejecución del Backend (¡IMPORTANTE!)**

Este front-end interactúa con una API backend para su funcionalidad principal. **No podrás utilizar todas las características de este front-end completamente sin tener el backend en ejecución.**

El código del backend es mantenido por un colaborador y se encuentra en su propio repositorio.


## Clonar directorio

1. Realizar un clonado del repositorio

```bash
git clone git@github.com:Victor-Plagaro/Hotel-management-app-frontend.git
cd Hotel-management-app-frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Configuración de Variables de Entorno:

  3.1. Crea un archivo llamado `.env` en la raíz de este proyecto (si no existe ya).

  3.2. Copia el siguiente contenido en tu nuevo archivo `.env`:

```.env
VITE_BACKEND_URL=http://localhost:8080 # O la URL donde esté tu backend
```
### Tecnologías de Front-End

- _React(^19.0)_ usando el empaquetador de Vite (**recomendado**)

```bash
npm create vite@latest my-project -- --template react
cd my-project
npm install
```

- React Router DOM

```bash
npm install react-router-dom
```

- Redux Toolkit y React Redux

```bash
npm install @reduxjs/toolkit react-redux
```

- _Typescript_
  Si quieres crear el proyecto desde el principio con Typescript:

```bash
npm create vite@latest my-project -- --template react-ts
```

Añadir Typescript al proyecto ya inicializado:

```bash
npm install --save typescript @types/node @types/react @types/react-dom
```

- _Tailwind CSS 4.0_ con Vite

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Tras instalar la dependecia, tendremos que configurar el fichero `vite.config.ts`

```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// ↓↓↓ ESTA LÍNEA ↓↓↓
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ↓↓↓ ESTA LÍNEA ↓↓↓
    tailwindcss(),
  ],
})
```
Importa los estilos de tailwind en el `index.css`:
```css
@import "tailwindcss";
```

## Ejecutar el proyecto

```bash
npm run dev
```
**Notas adicionales:**

- Si usas Typescript, elimina `@types/jest` si no vas a usar Jest para testing.
- Consulta la [documentación oficial de Tailwind CSS](https://tailwindcss.com/docs/guides/vite) para más detalles.