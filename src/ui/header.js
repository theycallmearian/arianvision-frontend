import { renderLoginForm } from '../auth/loginForm.js'
import { renderLanding } from '../auth/landing.js'
import { renderMyEvents } from '../events/myEvents.js'
import { renderEventList } from '../events/index.js'
import { renderProfileForm } from '../auth/profileForm.js'

export function renderHeader(container) {
  const token = localStorage.getItem('token')
  const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null

  const oldNav = container.querySelector('.main-header')
  oldNav?.remove()

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
          ? `
             <span class="user-name">Hola, ${user.name}</span>
             <button id="btn-events" class="btn-nav">
               <span class="icon">📅</span>
               <span class="label">Eventos</span>
             </button>
             <button id="btn-my-events" class="btn-nav">
               <span class="icon">📝</span>
               <span class="label">Mis eventos</span>
             </button>
             <button id="btn-profile" class="btn-nav">
               <span class="icon">👤</span>
               <span class="label">Mi perfil</span>
             </button>
             <button id="btn-logout" class="btn-nav">
               <span class="icon">❌</span>
               <span class="label">Salir</span>
             </button>`
          : `
             <button id="btn-events" class="btn-nav">
               <span class="icon">📅</span>
               <span class="label">Eventos</span>
             </button>
             <button id="btn-login" class="btn-nav">
               <span class="icon">🔑</span>
               <span class="label">Iniciar sesión</span>
             </button>`
      }
    </div>
  `
  container.prepend(nav)
  nav.querySelector('.user-controls').style.gap = '1rem'

  function markActive() {
    nav
      .querySelectorAll('.user-controls button')
      .forEach((btn) => btn.classList.remove('active'))
    const hash = window.location.hash
    if (hash === '#events') {
      nav.querySelector('#btn-events')?.classList.add('active')
    } else if (hash === '#my-events') {
      nav.querySelector('#btn-my-events')?.classList.add('active')
    } else if (hash === '#profile') {
      nav.querySelector('#btn-profile')?.classList.add('active')
    } else if (hash === '#login') {
      nav.querySelector('#btn-login')?.classList.add('active')
    }
  }

  const logoEl = nav.querySelector('#header-logo')
  if (!token) {
    logoEl.style.cursor = 'pointer'
    logoEl.addEventListener('click', () => {
      window.location.hash = ''
      const main = document.getElementById('main-content')
      renderLanding(main)
      markActive()
    })
  } else {
    logoEl.style.cursor = 'default'
  }

  if (token) {
    nav.querySelector('#btn-events').addEventListener('click', () => {
      window.location.hash = '#events'
      const main = document.getElementById('main-content')
      renderEventList(main)
      markActive()
    })
    nav.querySelector('#btn-my-events').addEventListener('click', () => {
      window.location.hash = '#my-events'
      const main = document.getElementById('main-content')
      renderMyEvents(main)
      markActive()
    })
    nav.querySelector('#btn-profile').addEventListener('click', () => {
      window.location.hash = '#profile'
      const main = document.getElementById('main-content')
      renderProfileForm(main)
      markActive()
    })
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
      window.location.hash = '#login'
      const main = document.getElementById('main-content')
      renderLoginForm(main)
      markActive()
    })
  }

  markActive()
}
