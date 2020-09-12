import React from 'react'
import './Register.css'
import BasicInput from '../../components/BasicInput/BasicInput'
import BasicLabel from '../../components/BasicLabel/BasicLabel'
import Button from '../../components/Button/Button'

function Register() {
  return (
    <section className="section">
      <form className="form-card">
        <div>
          <BasicLabel htmlFor="register-email">email</BasicLabel>
          <BasicInput
            id="register-email"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <BasicLabel htmlFor="register-name">name</BasicLabel>
          <BasicInput
            id="register-name"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <BasicLabel htmlFor="register-password">password</BasicLabel>
          <BasicInput
            id="register-password"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <div>
          <BasicLabel htmlFor="register-password-confirm">
            confirm password
          </BasicLabel>
          <BasicInput
            id="register-password-confirm"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <Button type="submit" text="register" />
      </form>
    </section>
  )
}

export default Register
