import React, { useState } from 'react'
import './Register.css'
import TextButton from '../../components/TextButton/TextButton'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'

function Register() {
  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
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
          id="register-email"
          value={state.email}
          type="email"
          name="email"
          onInputChange={handleChange}
          labelText="email"
          placeholderText="email"
          required
        />
        <InputWithLabel
          id="register-name"
          value={state.name}
          type="text"
          name="name"
          onInputChange={handleChange}
          labelText="name"
          placeholderText="name"
          required
        />
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
      </form>
    </section>
  )
}

export default Register
