import React, { useState, useEffect, useCallback } from 'react'
import './Explore.css'
import routes from '../../utilities/routes'
import useUserDictionary from '../../hooks/useUserDictionary'
import WordApiService from '../../services/word-api-service'

// components
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import AlphabetFilter from '../../components/AlphabetFilter/AlphabetFilter'
import SearchFilter from '../../components/SearchFilter/SearchFilter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import useModal from '../../hooks/useModal'
import Modal from '../../components/Modal/Modal'
import AddWordForm from '../../components/AddWordForm/AddWordForm'

function Explore() {
  const { dictionary, setWords, setError } = useUserDictionary()

  const [displayWords, setDisplayWords] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { isVisible, toggleModal } = useModal()

  const searchForWords = (query) => {
    const filtered = dictionary.filter((word) =>
      word.text.toLowerCase().includes(query.toLowerCase())
    )
    setDisplayWords(filtered)
  }

  const filterForWords = (letter) => {
    const filtered = dictionary.filter((word) => {
      if (letter === 'All') return word
      return word.text.toUpperCase().startsWith(letter)
    })
    setDisplayWords(filtered)
  }

  async function fetchData() {
    setIsLoading(true)
    setError(null)
    try {
      let res = await WordApiService.getWords()
      setWords(res)
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
    setDisplayWords(dictionary)
  }, [dictionary])

  return (
    <section className="section-dictionary">
      <div className="dictionary-controls">
        <div className="controls-flex">
          <SearchFilter searchFor={searchForWords} />
          <div className="icon-round icon-med" onClick={toggleModal}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <AlphabetFilter filterFor={filterForWords} />
      </div>
      <div className="word-box">
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
