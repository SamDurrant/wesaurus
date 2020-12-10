import React, { useState } from 'react'
import './Login.css'
import TextButton from '../../components/TextButton/TextButton'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'
import AuthApiService from '../../services/auth-api-service'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'
import {
  validatePassword,
  validateUsername,
} from '../../utilities/UserValidator'

function Login(props) {
  const [formState, setFormState] = useState({
    user_name: '',
    password: '',
    error: null,
    usernameError: null,
    passwordError: null,
  })

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitJwtAuth = async (e) => {
    e.preventDefault()
    setFormState({
      ...formState,
      error: null,
      usernameError: null,
      passwordError: null,
    })

    const usernameError = validateUsername(formState.user_name)
    if (usernameError) {
      setFormState({
        ...formState,
        usernameError,
      })
      return
    }
    const passwordError = validatePassword(formState.password)
    if (passwordError) {
      setFormState({
        ...formState,
        passwordError,
      })
      return
    }
    try {
      await AuthApiService.postLogin({
        user_name: formState.user_name,
        password: formState.password,
      })
      setFormState({
        user_name: '',
        password: '',
        error: null,
        usernameError: null,
        passwordError: null,
      })
      const { location, history } = props
      const destination = (location.formState || {}).from || '/'
      history.push(destination)
    } catch (error) {
      setFormState({
        ...formState,
        error: error.error.message,
        usernameError: null,
        passwordError: null,
      })
    }
  }

  return (
    <section className="section">
      <form className="form-card" onSubmit={handleSubmitJwtAuth}>
        <ErrorDisplay error={formState.usernameError} fontSize="12px" />
        <InputWithLabel
          id="login-username"
          value={formState.user_name}
          type="text"
          name="user_name"
          onInputChange={handleChange}
          labelText="username"
          placeholderText="username"
          required
        />
        <ErrorDisplay error={formState.passwordError} fontSize="12px" />
        <InputWithLabel
          id="login-password"
          value={formState.password}
          type="password"
          name="password"
          onInputChange={handleChange}
          labelText="password"
          placeholderText="password"
          required
        />
        <TextButton text="login" />
        <ErrorDisplay error={formState.error} />
      </form>
    </section>
  )
}

export default Login
