import React, { useState, useContext, useEffect, Fragment } from 'react'
import './Dictionary.css'
import routes from '../../utilities/routes'
import UserWordApiService from '../../services/user-word-api-service'
import TokenService from '../../services/token-service'
import { MainContext } from '../../contexts/MainContext'

// components
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import AlphabetFilter from '../../components/AlphabetFilter/AlphabetFilter'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

function Dictionary() {
  let { state, dispatch } = useContext(MainContext)
  const [displayWords, setDisplayWords] = useState(state.userDictionary)
  const [isLoading, setIsLoading] = useState(false)

  const searchForWords = (query) => {
    const filtered = state.userDictionary.filter((word) =>
      word.text.toLowerCase().includes(query.toLowerCase())
    )
    setDisplayWords(filtered)
  }

  const filterForWords = (letter) => {
    const filtered = state.userDictionary.filter((word) => {
      if (letter === 'All') return word
      return word.text.toUpperCase().startsWith(letter)
    })
    setDisplayWords(filtered)
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      dispatch({ type: 'set-error', payload: null })
      try {
        let words = await UserWordApiService.getWords()
        dispatch({ type: 'set-userDictionary', payload: words })
        dispatch({
          type: 'set-userName',
          payload: TokenService.readJwtToken().sub,
        })
      } catch (error) {
        dispatch({ type: 'set-error', payload: error })
      }
      setIsLoading(false)
    }

    fetchData()
  }, [dispatch])

  useEffect(() => {
    setDisplayWords(state.userDictionary)
  }, [state.userDictionary])

  return (
    <section className="section-dictionary">
      {state.error && <ErrorDisplay error={state.error} fontSize="20px" />}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <div className="announce-box">
            <h1>Hello {state.userName}!</h1>
          </div>
          <div className="dictionary-controls">
            <SearchFilter searchFor={searchForWords} />
            <AlphabetFilter filterFor={filterForWords} />
          </div>
          <div className="word-box">
            {displayWords
              .sort((a, b) =>
                a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1
              )
              .map((word) => (
                <WordDisplay
                  key={word.id}
                  word={word.text}
                  path={`${routes.userWord}/${word.id}`}
                />
              ))}
          </div>
        </Fragment>
      )}
    </section>
  )
}

export default Dictionary
