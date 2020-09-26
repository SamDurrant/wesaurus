import React from 'react'
import styled from 'styled-components'
import './Settings.css'
import Button from '../../components/Button/Button'
import useUserSettings from '../../hooks/useUserSettings'

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.text};
`

function Settings() {
  const { toggleTheme } = useUserSettings()

  return (
    <section className="section">
      <StyledButton text="toggle" onClick={toggleTheme} />
    </section>
  )
}

export default Settings
