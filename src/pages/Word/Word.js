import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Word.css'
import styled from 'styled-components'
import useUserDictionary from '../../hooks/useUserDictionary'
import WordApiService from '../../services/word-api-service'
import UserWordApiService from '../../services/user-word-api-service'
import TokenService from '../../services/token-service'

// components
import HeartIcon from '../../components/HeartIcon/HeartIcon'
import SolidButton from '../../components/SolidButton/SolidButton'
import DefinitionList from '../../components/DefinitionList/DefinitionList'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

function Word({ dictionary }) {
  const {
    setError,
    displayWord,
    setDisplayWord,
    displayWordHistory,
    setDisplayWordHistory,
  } = useUserDictionary()
  const { wordid } = useParams()

  let [pageWord, setPageWord] = useState(displayWord)
  let [wordHistory, setWordHistory] = useState(displayWordHistory)
  let [isLoading, setIsLoading] = useState(false)

  const sortBy = (type) => {
    setPageWord((word) => ({
      ...word,
      definitions: pageWord.definitions.sort((a, b) =>
        a[type] > b[type] ? -1 : 1
      ),
    }))
  }

  const handleWordLike = async (word_id) => {
    if (TokenService.hasAuthToken()) {
      setError(null)
      try {
        // if user likes word, remove it
        if (!!wordHistory.word.id) {
          let res = await UserWordApiService.deleteWord(word_id)
          setDisplayWordHistory({
            ...displayWordHistory,
            word: res,
          })
        } else {
          // if user doesn't like word, add it
          let res = await UserWordApiService.postWord(word_id)
          setDisplayWordHistory({
            ...displayWordHistory,
            word: res,
          })
        }
      } catch (error) {
        setError(error)
      }
    } else {
      console.log('not logged in')
    }
  }

  async function fetchData() {
    // let wordid = parseInt(wordid)
    setIsLoading(true)
    setError(null)

    try {
      // get word & defs from api
      let word = await WordApiService.getWord(wordid)
      let definitions = await WordApiService.getWordDefinitions(wordid)
      setDisplayWord({ word, definitions })
    } catch (error) {
      setError(error.error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchUserData() {
    // const wordid = parseInt(wordid)
    setIsLoading(true)

    try {
      // get user word & def history from api
      let userWordHistory = await UserWordApiService.getWord(wordid)
      let userDefHistory = await UserWordApiService.getWordDefinitions(wordid)
      setDisplayWordHistory({
        word: userWordHistory,
        definitions: userDefHistory,
      })
    } catch (error) {
      if (
        error.error.message === 'This word does not exist in your dictionary'
      ) {
        setDisplayWordHistory({
          word: {},
          definitions: [],
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    if (TokenService.hasAuthToken()) {
      fetchUserData()
    }
  }, [])

  useEffect(() => {
    setPageWord(displayWord)
    setWordHistory(displayWordHistory)
  }, [displayWord, displayWordHistory])

  return (
    <section className="word-page">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <section className="word-section">
            <StyledCard className="card word-card">
              <h1>{pageWord.word.text}</h1>
              <HeartIcon
                handleClick={() => handleWordLike(pageWord.word.id)}
                liked={wordHistory.word.id === pageWord.word.id}
              />
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
            {!dictionary ? (
              <DefinitionList word={pageWord} wordHistory={wordHistory} />
            ) : (
              <DefinitionList word={wordHistory} wordHistory={wordHistory} />
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default Word
