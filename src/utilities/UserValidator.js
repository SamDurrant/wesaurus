export const validateUsername = (usernameVal) => {
  const username = usernameVal.trim()
  if (username.length === 0) {
    return 'Username is required'
  } else if (username.length < 5) {
    return 'Username must be at least 5 characters long'
  }
}

export const validatePassword = (passwordInput) => {
  const password = passwordInput.trim()
  if (password.length === 0) {
    return 'Password is required'
  } else if (password.length < 8 || password.length > 24) {
    return 'Password must be between 8 and 24 characters long'
  } else if (!password.match(/[0-9]/)) {
    return 'Password must contain at least one number'
  }
}

export const validatePasswordMatch = (passwordInput, passwordMatch) => {
  if (passwordInput.trim() !== passwordMatch.trim()) {
    return 'Passwords do not match'
  }
}

export const validateEmail = (emailInput) => {
  const email = emailInput.trim()
  if (email.length === 0) {
    return 'Email is required'
  }
}
