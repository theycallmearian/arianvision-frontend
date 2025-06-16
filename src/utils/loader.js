import '../ui/scss/loader.scss'

export function showLoader(container) {
  container.innerHTML = `<div class="loader"></div>`
}

export function hideLoader(container) {
  const loader = container.querySelector('.loader')
  if (loader) loader.remove()
}
