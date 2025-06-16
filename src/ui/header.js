import { renderLoginForm } from '../auth/loginForm.js'
import { renderLanding } from '../auth/landing.js'

export function renderHeader(container) {
  const token = localStorage.getItem('token')
  const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null

  const nav = document.createElement('nav')
  nav.classList.add('main-header')
  nav.innerHTML = `
    <div class="logo">
      <img
        id="header-logo"
        src="https://res.cloudinary.com/dye4qdrys/image/upload/v1748368336/arianvision/arianvisionlogo_xhjcy2.png"
        alt="ArianVision logo"
      />
    </div>
    <div class="user-controls">
      ${
        token
          ? `<span class="user-name">Hola, ${user.name}</span>
             <button id="btn-logout">Cerrar sesión</button>`
          : `
             <button id="btn-events">Ver eventos</button>
             <button id="btn-login">Iniciar sesión</button>`
      }
    </div>
  `
  container.appendChild(nav)

  nav.querySelector('.user-controls').style.gap = '1rem'

  const logoEl = nav.querySelector('#header-logo')
  logoEl.style.cursor = 'pointer'
  if (!token) {
    logoEl.addEventListener('click', () => {
      const mainContent = document.querySelector('.main-content')
      renderLanding(mainContent)
    })
  }

  if (token) {
    nav.querySelector('#btn-logout').addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.hash = ''
      window.location.reload()
    })
  } else {
    nav.querySelector('#btn-events').addEventListener('click', () => {
      window.location.hash = '#events'
      window.location.reload()
    })
    nav.querySelector('#btn-login').addEventListener('click', () => {
      const mainContent = document.querySelector('.main-content')
      renderLoginForm(mainContent)
    })
  }
}
