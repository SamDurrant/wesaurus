import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import './Dictionary.css'
import MainContext from '../../contexts/MainContext'
import AlphabetFilter from '../../components/AlphabetFilter/AlphabetFilter'
import SearchFilter from '../../components/SearchFilter/SearchFilter'

const StyledHeading = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gold};
`

function Dictionary() {
  const { words } = useContext(MainContext)
  const [displayWords, setDisplayWords] = useState(words)

  const searchForWords = (query) => {
    const filtered = words.filter((word) => word.contains(query))
    setDisplayWords(filtered)
  }

  const filterForWords = (letter) => {
    const filtered = words.filter((word) => {
      if (letter === 'All') return word
      return word.word.toUpperCase().startsWith(letter)
    })
    setDisplayWords(filtered)
  }

  return (
    <section className="section-dictionary">
      <StyledHeading className="announce-box">
        <h1>Hello Sam!</h1>
      </StyledHeading>
      <div className="dictionary-controls">
        <SearchFilter searchFor={searchForWords} />
        <AlphabetFilter filterFor={filterForWords} />
      </div>
      <div className="word-box">
        {displayWords
          .sort((a, b) =>
            a.word.toLowerCase() < b.word.toLowerCase() ? -1 : 1
          )
          .map((word) => (
            <WordDisplay
              key={word.word_id}
              word={word.word}
              id={word.word_id}
            />
          ))}
      </div>
    </section>
  )
}

export default Dictionary
