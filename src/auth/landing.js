import './scss/landing.scss'

export function renderLanding(container) {
  container.innerHTML = ''
  container.classList.add('landing-container')

  const logo = document.createElement('img')
  logo.src =
    'https://res.cloudinary.com/dye4qdrys/image/upload/v1748368336/arianvision/arianvisionlogo_xhjcy2.png'
  logo.alt = 'ArianVision'
  logo.classList.add('landing-logo')
  container.appendChild(logo)

  const btnEvents = document.createElement('button')
  btnEvents.textContent = 'Ver eventos'
  btnEvents.classList.add('login-fx')

  const btnLogin = document.createElement('button')
  btnLogin.textContent = 'Iniciar sesión'
  btnLogin.classList.add('login-fx')

  const wrapper = document.createElement('div')
  wrapper.classList.add('landing-buttons')
  wrapper.append(btnEvents, btnLogin)
  container.appendChild(wrapper)

  btnEvents.addEventListener('click', () => {
    window.location.hash = '#events'
    window.location.reload()
  })

  btnLogin.addEventListener('click', () => {
    window.location.hash = '#login'
    import('./loginForm.js').then((m) => m.renderLoginForm(container))
  })
}
