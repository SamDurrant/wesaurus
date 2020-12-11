import React, { useState, useEffect, useContext } from 'react'
import './Explore.css'
import routes from '../../utilities/routes'
import WordApiService from '../../services/word-api-service'
import TokenService from '../../services/token-service'
import { MainContext } from '../../contexts/MainContext'
import useModal from '../../hooks/useModal'

// components
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import AlphabetFilter from '../../components/AlphabetFilter/AlphabetFilter'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Modal from '../../components/Modal/Modal'
import AddWordForm from '../../components/AddWordForm/AddWordForm'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Explore() {
  let { state, dispatch } = useContext(MainContext)
  const [displayWords, setDisplayWords] = useState(state.dictionary)
  const [isLoading, setIsLoading] = useState(false)
  const { isVisible, toggleModal } = useModal()
  const searchForWords = (query) => {
    const filtered = state.dictionary.filter((word) =>
      word.text.toLowerCase().includes(query.toLowerCase())
    )
    setDisplayWords(filtered)
  }

  const filterForWords = (letter) => {
    const filtered = state.dictionary.filter((word) => {
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
        let words = await WordApiService.getWords()
        dispatch({ type: 'set-dictionary', payload: words })
      } catch (error) {
        dispatch({ type: 'set-error', payload: error })
      }
      setIsLoading(false)
    }

    fetchData()
  }, [dispatch])

  useEffect(() => {
    setDisplayWords(state.dictionary)
  }, [state.dictionary])

  return (
    <section className="section-dictionary">
      <div className="dictionary-controls">
        <div className="controls-flex">
          <SearchFilter searchFor={searchForWords} />
          {TokenService.hasAuthToken() && (
            <button className="icon-round icon-med" onClick={toggleModal}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
        <AlphabetFilter filterFor={filterForWords} />
      </div>
      <div className="word-box">
        {state.error && <ErrorDisplay error={state.error} fontSize="20px" />}
        {isLoading ? (
          <div>Loading</div>
        ) : (
          displayWords
            .sort((a, b) =>
              a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1
            )
            .map((word) => (
              <WordDisplay
                key={word.id}
                word={word.text}
                path={`${routes.word}/${word.id}`}
              />
            ))
        )}
      </div>
      <Modal isVisible={isVisible} hide={toggleModal}>
        <AddWordForm />
      </Modal>
    </section>
  )
}

export default Explore
