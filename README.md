# Proyecto personal

Este proyecto está enfocado a la creación de un CRUD de imágenes estándar, imágenes de 180º y de 360º. El front-end se encargará de poder manejar las imágenes con una interfaz cómoda, junto con la llamada a las diferentes acciones a la API la cual estará hecha con Spring Boot Java.

## Clonación

1. Realizar un clonado del repositorio

```bash
git clone git@github.com:thewisedreams/trainee-image-content-frontend.git
```

```bash
cd trainee-image-content-frontend
```

## **Requisitos** para el desarrollo y funcionamiento del proyecto

### Herramientas principales descargadas

- [Node.js LTS](https://nodejs.org/es)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Tecnologías de Front-End

- _React(^19.0)_ usando el empaquetador de Vite (**recomendado**)

```bash
npm create vite@latest my-project -- --template react
```

```bash
cd my-project
```

```bash
npm install
```

- React _router_

```bash
npm install react-router
```

- React _redux_ toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

- _Typescript_
  Si quieres crearlo desde un principio con Typescript:

```bash
npm create vite@latest my-project -- --template react-ts
```

Añadir Typescript al proyecto ya inicializado:

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

- _Tailwind CSS 4.0_ con Vite

```bash
npm install -D tailwindcss postcss autoprefixer
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

```bash
npm tailwindcss init -p
```

## Ejecutar el proyecto

```bash
npm run dev
```
