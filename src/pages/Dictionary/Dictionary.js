import React, { useState } from 'react'
import styled from 'styled-components'
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import './Dictionary.css'
import AlphabetFilter from '../../components/AlphabetFilter/AlphabetFilter'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import useUserDictionary from '../../hooks/useUserDictionary'

const StyledHeading = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gold};
`

const StyledBackground = styled.div`
  background: ${({ theme }) => theme.body};
`

function Dictionary() {
  const { dictionary } = useUserDictionary()
  const [displayWords, setDisplayWords] = useState(dictionary)

  const searchForWords = (query) => {
    const filtered = dictionary.filter((word) =>
      word.word.toLowerCase().includes(query.toLowerCase())
    )
    setDisplayWords(filtered)
  }

  const filterForWords = (letter) => {
    const filtered = dictionary.filter((word) => {
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
      <StyledBackground className="dictionary-controls">
        <SearchFilter searchFor={searchForWords} />
        <AlphabetFilter filterFor={filterForWords} />
      </StyledBackground>
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
