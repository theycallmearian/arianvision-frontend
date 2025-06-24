# ArianVision Frontend

Frontend de la plataforma ArianVision para la gestión y visualización de eventos. Proyecto desarrollado con **Vite** (JavaScript, SCSS, HTML).

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
