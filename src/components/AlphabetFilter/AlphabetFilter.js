import React from 'react'
import './AlphabetFilter.css'
import styled from 'styled-components'

const alphabet = [
  'All',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

const StyledLetter = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gold};
`

function AlphabetFilter(props) {
  return (
    <div className="alphabet-filter">
      {alphabet.map((letter, i) => (
        <StyledLetter
          key={i}
          onClick={() => props.filterFor(letter)}
          className="alphabet-letter"
        >
          {letter}
        </StyledLetter>
      ))}
    </div>
  )
}

export default AlphabetFilter
