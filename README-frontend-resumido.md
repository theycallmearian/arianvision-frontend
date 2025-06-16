# ArianVision Frontend

Frontend de la plataforma ArianVision para la gestión y visualización de eventos. Proyecto desarrollado con **Vite** (JavaScript, SCSS, HTML) como SPA sin frameworks JS pesados.

## 🚀 Tecnologías

- Vite (dev server & build)
- JavaScript ES6+
- SCSS
- Node.js (solo para herramientas)

## 🛠️ Instalación y desarrollo local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/theycallmearian/arianvision-frontend.git
   cd arianvision-frontend
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Arranca el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   - El frontend se abrirá en `http://localhost:5173`
   - **Importante:** Arranca el [backend](https://github.com/theycallmearian/arianvision-backend) en paralelo en `http://localhost:3000` para que funcionen los endpoints.

## ⚙️ Configuración

- **Sin .env necesario:** El frontend usa proxy de Vite para `/api` → `localhost:3000/api` en desarrollo (mira `vite.config.js`).
- Para producción, configura la URL de la API en el código o usando variables `VITE_API_URL` si lo necesitas.

## 🏗️ Build y despliegue

- **Construye para producción**
  ```bash
  npm run build
  ```
  Los archivos optimizados quedan en la carpeta `dist/`.

- **Deploy recomendado:**  
  - [Vercel](https://vercel.com/): conecta el repo y listo.
  - [Netlify](https://netlify.com/): también soportado.
  - **Importante:** Si backend y frontend están en dominios distintos, revisa CORS y la URL de la API.

## 📝 Comandos útiles

- `npm run dev` — desarrollo local
- `npm run build` — build de producción
- `npm run preview` — sirve el build localmente

## 🙌 Buenas prácticas

- Estructura modular en `src/`
- SCSS con variables y buenas prácticas de estilos
- Si crece el proyecto, añade ESLint/Prettier y tests (Jest/Cypress)

---

¿Dudas? Contacta al autor o revisa el repo del backend para detalles extra.
