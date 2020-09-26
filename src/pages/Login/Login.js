import React from 'react'
import styled from 'styled-components'
import './Login.css'
import BasicInput from '../../components/BasicInput/BasicInput'
import BasicLabel from '../../components/BasicLabel/BasicLabel'
import Button from '../../components/Button/Button'

const StyledLabel = styled(BasicLabel)`
  color: ${({ theme }) => theme.text};
`

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.text};
`

function Login() {
  return (
    <section className="section">
      <form className="form-card">
        <div>
          <StyledLabel htmlFor="login-email">email</StyledLabel>
          <BasicInput
            id="login-email"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <StyledLabel htmlFor="login-password">password</StyledLabel>
          <BasicInput
            id="login-password"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <StyledButton type="submit" text="login" />
      </form>
    </section>
  )
}

export default Login
