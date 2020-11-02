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
  const [state, setState] = useState({
    user_name: '',
    password: '',
    error: null,
    usernameError: null,
    passwordError: null,
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitJwtAuth = (e) => {
    e.preventDefault()
    setState({
      ...state,
      error: null,
      usernameError: null,
      passwordError: null,
    })

    const usernameError = validateUsername(state.user_name)
    if (usernameError) {
      setState({
        ...state,
        usernameError,
      })
      return
    }
    const passwordError = validatePassword(state.password)
    if (passwordError) {
      setState({
        ...state,
        passwordError,
      })
      return
    }

    AuthApiService.postLogin({
      user_name: state.user_name,
      password: state.password,
    })
      .then(() => {
        setState({
          user_name: '',
          password: '',
          error: null,
          usernameError: null,
          passwordError: null,
        })
        const { location, history } = props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
      })
      .catch((res) => {
        console.log(res)
        setState({
          ...state,
          error: res.error.message,
          usernameError: null,
          passwordError: null,
        })
      })
  }

  return (
    <section className="section">
      <form className="form-card" onSubmit={handleSubmitJwtAuth}>
        <ErrorDisplay error={state.usernameError} fontSize="12px" />
        <InputWithLabel
          id="login-username"
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
          id="login-password"
          value={state.password}
          type="password"
          name="password"
          onInputChange={handleChange}
          labelText="password"
          placeholderText="password"
          required
        />
        <TextButton text="login" />
        <ErrorDisplay error={state.error} />
      </form>
    </section>
  )
}

export default Login
