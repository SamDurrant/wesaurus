import React, { useEffect, useState } from 'react'
import './Word.css'
import styled from 'styled-components'
import useUserDictionary from '../../hooks/useUserDictionary'
import useMainDictionary from '../../hooks/useMainDictionary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

function Word(props) {
  const { getWord } = useUserDictionary()
  const { getDefinitions } = useMainDictionary()
  let [word, setWord] = useState('')

  useEffect(() => {
    const { wordid } = props.match.params
    let word = getWord(parseInt(wordid))
    word.definitions = getDefinitions(parseInt(wordid))
    setWord(word)
  }, [props])

  return (
    <section className="word-page">
      <section className="word-section">
        <StyledCard className="card word-card">
          <h1>{word.word}</h1>
          <p>
            {word.definitions &&
              word.definitions.length > 0 &&
              word.definitions[0].text}
          </p>
        </StyledCard>
      </section>
      <section className="def-section">
        {word.definitions &&
          word.definitions.map((def, i) => {
            if (i !== 0) {
              return (
                <StyledCard key={i} className="card def-card">
                  <p>{def.text}</p>
                  <div className="controls">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </StyledCard>
              )
            }
          })}
      </section>
    </section>
  )
}

export default Word
