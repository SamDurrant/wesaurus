import React from 'react'
import './AlphabetFilter.css'

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

function AlphabetFilter(props) {
  return (
    <div className="alphabet-filter">
      {alphabet.map((letter, i) => (
        <div
          key={i}
          onClick={() => props.filterFor(letter)}
          className="alphabet-letter"
        >
          {letter}
        </div>
      ))}
    </div>
  )
}

export default AlphabetFilter
