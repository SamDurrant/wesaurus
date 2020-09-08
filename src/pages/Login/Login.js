import React from 'react'
import './Login.css'
import {
  Label,
  Input,
  Button,
  Section,
} from '../../utilities/utility-components'

function Login() {
  return (
    <Section>
      <form className="form-card">
        <div>
          <Label htmlFor="login-email">email</Label>
          <Input id="login-email" placeholder="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="login-password">password</Label>
          <Input
            id="login-password"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <Button type="submit" text="login" />
      </form>
    </Section>
  )
}

export default Login
