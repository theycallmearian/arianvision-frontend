// src/main.js

import './src/styles/main.scss'
import './src/ui/scss/ui.scss'

import { renderHeader } from './src/ui/header.js'
import { renderFooter } from './src/ui/footer.js'
import { renderEventList } from './src/events/index.js'
import { renderLanding } from './src/auth/landing.js'
import { renderMyEvents } from './src/events/myEvents.js'
import { renderProfileForm } from './src/auth/profileForm.js'
import { renderLoginForm } from './src/auth/loginForm.js'

const app = document.getElementById('app')

function initLayout() {
  renderHeader(app)

  const slideshow = document.createElement('div')
  slideshow.classList.add('background-slideshow')
  const urls = [
    'https://res.cloudinary.com/dye4qdrys/image/upload/e_grayscale/v1748775998/arianvision/backgrounds/gamescom-2676958_1920_tbqtkb.jpg',
    'https://res.cloudinary.com/dye4qdrys/image/upload/v1748802090/arianvision/backgrounds/hot-air-balloons-1867279_1920_nhmmxm.jpg',
    'https://res.cloudinary.com/dye4qdrys/image/upload/e_grayscale/v1748802125/arianvision/backgrounds/fireworks-4768501_1920_uukpqn.jpg'
  ]
  urls.forEach((url, i) => {
    const slide = document.createElement('div')
    slide.classList.add('slide')
    slide.style.backgroundImage = `url('${url}')`
    slide.style.animationDelay = `${i * 10}s`
    slideshow.appendChild(slide)
  })
  app.appendChild(slideshow)

  const mainContent = document.createElement('div')
  mainContent.id = 'main-content'
  mainContent.classList.add('main-content')
  app.appendChild(mainContent)

  renderFooter(app)
  app.dataset.initialized = 'true'
}

function route() {
  const main = document.getElementById('main-content')
  main.innerHTML = ''
  const hash = window.location.hash

  switch (hash) {
    case '#profile':
      renderProfileForm(main)
      break
    case '#my-events':
      renderMyEvents(main)
      break
    case '#events':
      renderEventList(main)
      break
    case '#login':
      renderLoginForm(main)
      break
    default:
      if (!hash || hash === '#') {
        const token = localStorage.getItem('token')
        token ? renderEventList(main) : renderLanding(main)
      } else {
        renderLanding(main)
      }
  }
}

window.addEventListener('load', () => {
  if (!app.dataset.initialized) initLayout()
  route()
})
window.addEventListener('hashchange', route)
