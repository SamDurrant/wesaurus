import React from 'react'
import styled from 'styled-components'
import './Dictionary.css'

const words = [
  'virtual DOM',
  'middleware',
  'provider',
  'state',
  'lifecycle methods',
  'mounting',
  'unmounting',
  'history',
  'closure',
  'DOM',
  'Encapsulation',
  'Factory function',
  'Function declaration',
  'Function expression',
  'HOF',
  'Hoisting',
  'HTTP',
  'Inline caching',
  'Instanceof',
  'lexical environment',
  'javascript runtime',
  'javascript engine',
]

function Dictionary() {
  const StyledHeading = styled.div`
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.gold};
  `

  const StyledWord = styled.div`
    background: ${({ theme }) => theme.opal};
  `

  return (
    <section className="section section-dictionary">
      <StyledHeading className="announce-box">
        <h1>Hello Sam!</h1>
      </StyledHeading>
      <section className="word-box">
        {words.map((word, i) => (
          <StyledWord className="word" key={i}>
            {word}
          </StyledWord>
        ))}
      </section>
    </section>
  )
}

export default Dictionary
