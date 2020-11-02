import React, { useState } from 'react'
import './Register.css'
import TextButton from '../../components/TextButton/TextButton'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'
import AuthApiService from '../../services/auth-api-service'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'
import {
  validatePassword,
  validatePasswordMatch,
  validateUsername,
  validateEmail,
} from '../../utilities/UserValidator'

function Register(props) {
  const [state, setState] = useState({
    email: '',
    user_name: '',
    password: '',
    confirmPassword: '',
    error: null,
    emailError: null,
    usernameError: null,
    passwordError: null,
    confirmPasswordError: null,
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, user_name, password, confirmPassword } = state
    setState({
      ...state,
      error: null,
      emailError: null,
      usernameError: null,
      passwordError: null,
      confirmPasswordError: null,
    })

    const emailError = validateEmail(email)
    if (emailError) {
      setState({
        ...state,
        emailError,
      })
      return
    }
    const usernameError = validateUsername(user_name)
    if (usernameError) {
      setState({
        ...state,
        usernameError,
      })
      return
    }
    const passwordError = validatePassword(password)
    if (passwordError) {
      setState({
        ...state,
        passwordError,
      })
      return
    }
    const confirmPasswordError = validatePasswordMatch(
      password,
      confirmPassword
    )
    if (confirmPasswordError) {
      setState({
        ...state,
        confirmPasswordError,
      })
      return
    }

    AuthApiService.postUser({
      email,
      user_name,
      password,
      confirmPassword,
    })
      .then(() => {
        setState({
          ...state,
          email: '',
          user_name: '',
          password: '',
        })
        props.history.push('/login')
      })
      .catch((res) => {
        setState({
          ...state,
          error: res.error.message,
        })
      })
  }

  return (
    <section className="section">
      <form className="form-card" onSubmit={handleSubmit}>
        <ErrorDisplay error={state.emailError} fontSize="12px" />
        <InputWithLabel
          id="register-email"
          value={state.email}
          type="email"
          name="email"
          onInputChange={handleChange}
          labelText="email"
          placeholderText="email"
          required
        />
        <ErrorDisplay error={state.usernameError} fontSize="12px" />
        <InputWithLabel
          id="register-username"
          value={state.user_name}
          type="text"
          name="user_name"
          onInputChange={handleChange}
          labelText="username"
          placeholderText="username"
          required
        />
        <ErrorDisplay error={state.passwordError} fontSize="12px" />
        <InputWithLabel
          id="register-password"
          value={state.password}
          type="password"
          name="password"
          onInputChange={handleChange}
          labelText="password"
          placeholderText="password"
          required
        />
        <ErrorDisplay error={state.confirmPasswordError} fontSize="12px" />
        <InputWithLabel
          id="register-confirm-password"
          value={state.confirmPassword}
          type="password"
          name="confirmPassword"
          onInputChange={handleChange}
          labelText="confirm password"
          placeholderText="password"
          required
        />
        <TextButton text="register" />
        <ErrorDisplay error={state.error} />
      </form>
    </section>
  )
}

export default Register
