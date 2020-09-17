import React, { useEffect, useContext, useState } from 'react'
import './Word.css'
import MainContext from '../../contexts/MainContext'

function Word(props) {
  const { getWord } = useContext(MainContext)
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
