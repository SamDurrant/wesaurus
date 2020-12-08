import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 20rem;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.text};
  display: block;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto 0 auto;
  padding-left: 1rem;
  letter-spacing: 1px;
  font-size: 0.7rem;
`

const StyledInput = styled.textarea`
  width: 100%;
  max-width: 20rem;
  min-height: 7rem;
  border: 0.5px solid #99bdb8;
  border-radius: 1.2rem;
  background-color: var(--color-light);
  color: #333;
  font-size: 1rem;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  margin: ${(props) => props.margin};
  font-weight: 500;
  font-family: inherit;
  resize: none;

  &:focus {
    border-radius: 1.2rem;
    outline: none;
    -webkit-box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
    -moz-box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
    box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
  }

  &::placeholder {
    color: #555;
    letter-spacing: 1px;
  }
`

const TextAreaWithLabel = ({
  id,
  value,
  onInputChange,
  isFocused,
  labelText,
  name,
  placeholderText,
  hideLabel,
  inputMargin = `0.3rem auto 1rem`,
}) => {
  const inputRef = useRef()

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <StyledWrapper>
      {!hideLabel && <StyledLabel htmlFor={id}>{labelText}</StyledLabel>}
      <StyledInput
        ref={inputRef}
        id={id}
        value={value}
        name={name}
        placeholder={placeholderText}
        onChange={onInputChange}
        margin={inputMargin}
      />
    </StyledWrapper>
  )
}

export default TextAreaWithLabel
