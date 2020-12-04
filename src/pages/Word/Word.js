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
  const {
    setError,
    setDisplayWord,
    displayWord,
    displayWordHistory,
    setDisplayWordHistory,
  } = useUserDictionary()

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
          // if user doesn't likes definition, remove it
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

  async function handleDefLike(def_id) {
    if (TokenService.hasAuthToken()) {
      setError(null)
      try {
        // if user likes definition, remove it
        if (!!findLikedDef(def_id)) {
          let def = await UserWordApiService.deleteDefinition(def_id)
          let filtered = displayWordHistory.definitions.filter(
            (def) => def.id !== def_id
          )

          setDisplayWordHistory({
            ...displayWordHistory,
            definitions: filtered,
          })
        } else {
          // if user doesn't likes definition, remove it
          let def = await UserWordApiService.postDefinition(def_id)
          setDisplayWordHistory({
            ...displayWordHistory,
            definitions: [...displayWordHistory.definitions, def],
          })
        }
      } catch (error) {
        setError(error.error.message)
      }
    } else {
      console.log('not logged in')
    }
  }

  const findLikedDef = (id) =>
    wordHistory.definitions.find((def) => def.id === id)

  async function fetchData() {
    let wordid = parseInt(props.match.params.wordid)
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
    let { wordid } = props.match.params
    wordid = parseInt(wordid)
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
        setError(null)
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
                liked={!!wordHistory.word.id}
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
            {pageWord.definitions.map((def) => (
              <StyledCard key={def.id} className="card def-card">
                <p>{def.text}</p>
                <div className="def-likes">
                  <span>{def.like_count}</span>
                  <HeartIcon
                    handleClick={() => handleDefLike(def.id)}
                    liked={!!findLikedDef(def.id)}
                  />
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
