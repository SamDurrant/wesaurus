import React, { useContext } from 'react'
import styled from 'styled-components'
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import './Dictionary.css'
import MainContext from '../../contexts/MainContext'

const StyledHeading = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gold};
`

function Dictionary() {
  const { words } = useContext(MainContext)
  return (
    <section className="section section-dictionary">
      <StyledHeading className="announce-box">
        <h1>Hello Sam!</h1>
      </StyledHeading>
      <section className="word-box">
        {words.map((word) => (
          <WordDisplay key={word.word_id} word={word.word} id={word.word_id} />
        ))}
      </section>
    </section>
  )
}

export default Dictionary
