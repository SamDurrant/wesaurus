import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './AddWordForm.css'
import WordApiService from '../../services/word-api-service'
import useUserDictionary from '../../hooks/useUserDictionary'
import routes from '../../utilities/routes'

// components
import TextButton from '../../components/TextButton/TextButton'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

export default function AddWordForm() {
  const history = useHistory()
  const { addWord } = useUserDictionary()
  const [state, setState] = useState({
    text: '',
    textError: null,
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddWord = async (e) => {
    e.preventDefault()
    setState({
      ...state,
      textError: null,
    })

    try {
      let word = await WordApiService.postWord({ text: state.text })
      addWord(word)
      history.push(`${routes.word}/${word.id}`)
    } catch (error) {
      let err = error.error.message
      if (err === 'Unauthorized request') {
        err = 'Oops! You must create an account first'
      }
      setState({
        ...state,
        textError: err,
      })
    }
  }

  return (
    <form className="add-form" onSubmit={handleAddWord}>
      <h3>Add a new word:</h3>
      <InputWithLabel
        id="add-word-text"
        value={state.text}
        type="text"
        name="text"
        onInputChange={handleChange}
        labelText="word"
        placeholderText="word"
        required
      />
      <ErrorDisplay error={state.textError} fontSize="12px" />
      <TextButton text="add" />
    </form>
  )
}
