import './src/styles/main.scss'
import './src/ui/scss/ui.scss'
import { renderHeader } from './src/ui/header.js'
import { renderFooter } from './src/ui/footer.js'
import { renderEventList } from './src/events/index.js'
import { renderLanding } from './src/auth/landing.js'

const app = document.getElementById('app')

renderHeader(document.body)

const slideshow = document.createElement('div')
slideshow.classList.add('background-slideshow')
app.appendChild(slideshow)

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

const mainContent = document.createElement('div')
mainContent.classList.add('main-content')
app.appendChild(mainContent)

const token = localStorage.getItem('token')
if (window.location.hash === '#events' || token) {
  renderEventList(mainContent)
} else {
  renderLanding(mainContent)
}

renderFooter(document.body)
