import React from 'react'
import styled from 'styled-components'
import './Register.css'
import BasicInput from '../../components/BasicInput/BasicInput'
import BasicLabel from '../../components/BasicLabel/BasicLabel'
import Button from '../../components/Button/Button'

function Register() {
  const StyledLabel = styled(BasicLabel)`
    color: ${({ theme }) => theme.text};
  `

  const StyledButton = styled(Button)`
    color: ${({ theme }) => theme.text};
  `

  return (
    <section className="section">
      <form className="form-card">
        <div>
          <StyledLabel htmlFor="register-email">email</StyledLabel>
          <BasicInput
            id="register-email"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <StyledLabel htmlFor="register-name">name</StyledLabel>
          <BasicInput
            id="register-name"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <StyledLabel htmlFor="register-password">password</StyledLabel>
          <BasicInput
            id="register-password"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <div>
          <StyledLabel htmlFor="register-password-confirm">
            confirm password
          </StyledLabel>
          <BasicInput
            id="register-password-confirm"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <StyledButton type="submit" text="register" />
      </form>
    </section>
  )
}

export default Register
