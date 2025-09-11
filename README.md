# Cecarticulo Frontend

Cecarticulo es una aplicación frontend desarrollada con **React + TypeScript + Vite** que permite buscar, explorar y visualizar artículos científicos procesados por el backend de Cecarticulo.

## Características principales

- **Búsqueda de artículos** por palabra clave (con integración a arXiv vía backend).
- **Visualización de artículos** con metadatos, texto, imágenes y palabras clave.
- **Paginación** y navegación amigable.
- **Monitoreo de progreso** del procesamiento de artículos.
- **Interfaz moderna y responsiva**.

## Arquitectura

- **React 19** + **TypeScript**
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **TanStack Query** para manejo de datos remotos
- **Axios** para peticiones HTTP

## Estructura de carpetas

- `src/components/` - Componentes reutilizables y páginas principales
- `src/services/` - Lógica de conexión con la API backend
- `src/models/` - Tipos y modelos TypeScript
- `public/` - Archivos estáticos

## Instalación y ejecución

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/jul-cesar/Cecarticulo-front.git
   cd Cecarticulo-front
   ```
2. **Instala las dependencias**
   - Usando pnpm (recomendado):
     ```sh
     pnpm install
     ```
   - O usando npm:
     ```sh
     npm install
     ```
   - O usando yarn:
     ```sh
     yarn install
     ```
3. **Ejecuta el servidor de desarrollo**
   - Usando pnpm:
     ```sh
     pnpm dev
     ```
   - O usando npm:
     ```sh
     npm run dev
     ```
   - O usando yarn:
     ```sh
     yarn dev
     ```

   La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## Configuración

- El frontend espera que el backend esté corriendo en `http://localhost:8080`.
- Si necesitas cambiar la URL del backend, edita la constante `API_URL` en `src/services/ArticlesService.ts`.

## Scripts útiles

- `pnpm dev` / `npm run dev` / `yarn dev`: Inicia el servidor de desarrollo.
- `pnpm build` / `npm run build` / `yarn build`: Genera la build de producción.
- `pnpm preview` / `npm run preview` / `yarn preview`: Previsualiza la build de producción localmente.

## Ejemplo de uso

1. **Buscar artículos:**  
   Escribe una palabra clave en la barra de búsqueda y presiona Enter. El sistema consultará el backend y mostrará los resultados paginados.
2. **Ver detalles de un artículo:**  
   Haz clic en un artículo para ver su texto completo, imágenes y metadatos.
3. **Monitorear progreso:**  
   Si hay una búsqueda en curso, se mostrará el progreso en tiempo real.

---

¡Listo! Ahora puedes comenzar a trabajar y contribuir en el frontend de Cecarticulo.
