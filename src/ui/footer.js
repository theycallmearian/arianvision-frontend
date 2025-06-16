export function renderFooter(container) {
  const footer = document.createElement('footer')
  footer.classList.add('main-footer')
  footer.innerHTML = `
    <p>Developed by <a href="https://ariancastroportfolio.netlify.app/" target="_blank">Àrian Castro</a> © ${new Date().getFullYear()}</p>
  `
  container.appendChild(footer)
}
