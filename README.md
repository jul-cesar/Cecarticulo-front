
# Cecarticulo Frontend

Este proyecto es el frontend de Cecarticulo, una aplicación para explorar y buscar artículos académicos.

## Requisitos previos

- Node.js (v18 o superior recomendado)
- pnpm (recomendado) o npm/yarn

## Instalación de dependencias

1. **Clona el repositorio:**

  ```sh
  git clone https://github.com/jul-cesar/Cecarticulo-front.git
  cd Cecarticulo-front
  ```

2. **Instala las dependencias:**

  Usando pnpm (recomendado):
  ```sh
  pnpm install
  ```
  O usando npm:
  ```sh
  npm install
  ```
  O usando yarn:
  ```sh
  yarn install
  ```

## Ejecución del proyecto

1. **Inicia el servidor de desarrollo:**

  Usando pnpm:
  ```sh
  pnpm dev
  ```
  O usando npm:
  ```sh
  npm run dev
  ```
  O usando yarn:
  ```sh
  yarn dev
  ```

2. **Abre la aplicación:**

  Ve a [http://localhost:5173](http://localhost:5173) en tu navegador.

## Notas adicionales

- El frontend espera que el backend esté corriendo en `http://localhost:8080`.
- Si necesitas cambiar la URL del backend, edita la constante `API_URL` en `src/services/ArticlesService.ts`.
- Si tienes problemas con dependencias, asegúrate de tener la versión correcta de Node.js y de haber borrado la carpeta `node_modules` antes de reinstalar.

## Scripts útiles

- `pnpm dev` / `npm run dev` / `yarn dev`: Inicia el servidor de desarrollo.
- `pnpm build` / `npm run build` / `yarn build`: Genera la versión de producción.
- `pnpm preview` / `npm run preview` / `yarn preview`: Previsualiza la build de producción localmente.

---

¡Listo! Ahora puedes comenzar a trabajar en el proyecto Cecarticulo Frontend.
