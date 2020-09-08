import React from 'react'
import './Register.css'
import {
  Section,
  Label,
  Input,
  Button,
} from '../../utilities/utility-components'

function Register() {
  return (
    <Section>
      <form className="form-card">
        <div>
          <Label htmlFor="register-email">email</Label>
          <Input
            id="register-email"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div>
          <Label htmlFor="register-name">name</Label>
          <Input id="register-name" placeholder="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="register-password">password</Label>
          <Input
            id="register-password"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <div>
          <Label htmlFor="register-password-confirm">confirm password</Label>
          <Input
            id="register-password-confirm"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <Button type="submit" text="register" />
      </form>
    </Section>
  )
}

export default Register
