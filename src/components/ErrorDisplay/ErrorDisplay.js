import React from 'react'
import styled from 'styled-components'

const StyledError = styled.div`
  color: var(--color-accent);
  font-size: ${(props) => props.fontSize};
  letter-spacing: 1px;
  font-weight: 600;
  text-align: center;
`

function ErrorDisplay({ error, fontSize = '14px' }) {
  return (
    <>
      {error && (
        <StyledError role="alert" fontSize={fontSize}>
          <p>{error}</p>
        </StyledError>
      )}
    </>
  )
}

export default ErrorDisplay
