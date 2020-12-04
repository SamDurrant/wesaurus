import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: ${({ theme }) => theme.body};
  background: ${({ theme }) => theme.background};
  display: block;
  border: 0.5px solid transparent;
  border-radius: 1.2rem;
  padding: 0.5rem 1rem;
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
  letter-spacing: 1px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    border: 0.5px solid #99bdb8;
    box-shadow: -1px 3px 10px 1px rgba(0, 0, 0, 0.14);
    color: #363537;
    background: var(--color-grey-light);
  }

  &:focus {
    border-radius: 1.2rem;
    outline: none;
    -webkit-box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
    -moz-box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
    box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
  }
`

function SolidButton({
  text,
  fontSize = '1rem',
  margin = '1rem auto',
  handleClick,
}) {
  return (
    <StyledButton fontSize={fontSize} margin={margin} onClick={handleClick}>
      {text}
    </StyledButton>
  )
}

export default SolidButton
