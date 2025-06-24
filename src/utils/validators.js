export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
export function isValidPassword(pw) {
  if (typeof pw !== 'string') return false
  const minLength = pw.length >= 8
  const hasNumber = /\d/.test(pw)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pw)
  return minLength && hasNumber && hasSpecial
}
