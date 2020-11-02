import React, { useState } from 'react'
import './Login.css'
import TextButton from '../../components/TextButton/TextButton'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="section">
      <form className="form-card">
        <InputWithLabel
          id="login-email"
          value={state.email}
          type="email"
          name="email"
          onInputChange={handleChange}
          labelText="email"
          placeholderText="email"
          required
        />
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
      </form>
    </section>
  )
}

export default Login
