import React from 'react'
import './Login.css'
import BasicInput from '../../components/BasicInput/BasicInput'
import BasicLabel from '../../components/BasicLabel/BasicLabel'
import Button from '../../components/Button/Button'

function Login() {
  return (
    <section className="section">
      <form className="form-card">
        <div>
          <BasicLabel htmlFor="login-email">email</BasicLabel>
          <BasicInput
            id="login-email"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <BasicLabel htmlFor="login-password">password</BasicLabel>
          <BasicInput
            id="login-password"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <Button type="submit" text="login" />
      </form>
    </section>
  )
}

export default Login
