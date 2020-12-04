import React, { useState, useEffect } from 'react'
import routes from '../../utilities/routes'
import WordDisplay from '../../components/WordDisplay/WordDisplay'
import './Dictionary.css'
import AlphabetFilter from '../../components/AlphabetFilter/AlphabetFilter'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import UserWordApiService from '../../services/user-word-api-service'
import useUserDictionary from '../../hooks/useUserDictionary'

function Dictionary() {
  const { dictionary, setWords, setError } = useUserDictionary()

  const [displayWords, setDisplayWords] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
      let res = await UserWordApiService.getWords()
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
      <div className="announce-box">
        <h1>Hello Sam!</h1>
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
    </section>
  )
}

export default Dictionary
