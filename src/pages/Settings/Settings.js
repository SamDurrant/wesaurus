import React, { useContext } from 'react'
import styled from 'styled-components'
import './Settings.css'
import Button from '../../components/Button/Button'
import MainContext from '../../contexts/MainContext'

function Settings() {
  const { toggleTheme } = useContext(MainContext)
  const StyledButton = styled(Button)`
    color: ${({ theme }) => theme.text};
  `
  return (
    <section className="section">
      <StyledButton text="toggle" onClick={toggleTheme} />
    </section>
  )
}

export default Settings
