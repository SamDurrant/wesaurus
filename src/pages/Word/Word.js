import React, { useEffect, useState } from 'react'
import './Word.css'
import styled from 'styled-components'
import useUserDictionary from '../../hooks/useUserDictionary'
import WordApiService from '../../services/word-api-service'
import TokenService from '../../services/token-service'

// components
import HeartIcon from '../../components/HeartIcon/HeartIcon'
import SolidButton from '../../components/SolidButton/SolidButton'
import UserWordApiService from '../../services/user-word-api-service'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

function Word(props) {
  const { setError, setDisplayWord, displayWord } = useUserDictionary()
  let [pageWord, setPageWord] = useState(displayWord)
  let [isLoading, setIsLoading] = useState(false)

  const sortBy = (type) => {
    setPageWord((word) => ({
      ...word,
      definitions: pageWord.definitions.sort((a, b) =>
        a[type] > b[type] ? -1 : 1
      ),
    }))
  }

  const handleHeartClick = async () => {
    if (TokenService.hasAuthToken()) {
      setError(null)
      try {
        let res = await UserWordApiService.postWord(pageWord.word.id)
        console.log({ res })
      } catch (error) {
        setError(error)
      }
    } else {
      console.log('not logged in')
    }
  }

  async function fetchData() {
    const { wordid } = props.match.params
    setIsLoading(true)
    setError(null)

    try {
      let word = await WordApiService.getWord(parseInt(wordid))
      let definitions = await WordApiService.getWordDefinitions(
        parseInt(wordid)
      )
      setDisplayWord({ word, definitions })
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setPageWord(displayWord)
  }, [displayWord])

  return (
    <section className="word-page">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <section className="word-section">
            <StyledCard className="card word-card">
              <h1>{pageWord.word.text}</h1>
              <HeartIcon handleClick={handleHeartClick} />
            </StyledCard>
            <div className="def-controls">
              <SolidButton
                text="most liked"
                handleClick={() => sortBy('like_count')}
              />
              <SolidButton
                text="most recent"
                handleClick={() => sortBy('date_created')}
              />
            </div>
          </section>
          <section className="def-section">
            {pageWord.definitions &&
              pageWord.definitions.map((def, i) => (
                <StyledCard key={i} className="card def-card">
                  <p>{def.text}</p>
                  <div className="def-likes">
                    <span>{def.like_count}</span>
                    <HeartIcon />
                  </div>
                </StyledCard>
              ))}
          </section>
        </>
      )}
    </section>
  )
}

export default Word
