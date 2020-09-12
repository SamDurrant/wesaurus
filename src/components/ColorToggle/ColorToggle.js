import React from 'react'
import styled from 'styled-components'

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  display: block;
  margin: 1rem auto;
  padding: 0.6rem;
`

const ColorToggle = ({ theme, toggleTheme }) => {
  return <ToggleButton onClick={toggleTheme}>Switch Theme</ToggleButton>
}

export default ColorToggle
