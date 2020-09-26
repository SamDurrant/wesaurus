import React, { useEffect, useState } from 'react'
import './Word.css'
import useUserDictionary from '../../hooks/useUserDictionary'

function Word(props) {
  const { getWord } = useUserDictionary()
  let [word, setWord] = useState('')

  useEffect(() => {
    const { wordid } = props.match.params
    const word = getWord(parseInt(wordid))
    setWord(word)
  }, [props, getWord])

  return (
    <section className="word-page">
      <h1>{word.word}</h1>
      <p>some definition</p>
    </section>
  )
}

export default Word
