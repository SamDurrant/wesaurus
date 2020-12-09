import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './AddWordForm.css'
import WordApiService from '../../services/word-api-service'
import routes from '../../utilities/routes'
import { MainContext } from '../../contexts/MainContext'

// components
import TextButton from '../../components/TextButton/TextButton'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

export default function AddWordForm() {
  let { dispatch } = useContext(MainContext)
  const history = useHistory()

  const [formState, setFormState] = useState({
    text: '',
    textError: null,
  })

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddWord = async (e) => {
    e.preventDefault()
    setFormState({
      ...formState,
      textError: null,
    })

    try {
      let word = await WordApiService.postWord({ text: formState.text })
      dispatch({ type: 'add-word', payload: word })
      history.push(`${routes.word}/${word.id}`)
    } catch (error) {
      let err = error.error.message
      setFormState({
        ...formState,
        textError: err,
      })
    }
  }

  return (
    <form className="add-form" onSubmit={handleAddWord}>
      <h3>Add a new word:</h3>
      <InputWithLabel
        id="add-word-text"
        value={formState.text}
        type="text"
        name="text"
        onInputChange={handleChange}
        labelText="word"
        placeholderText="word"
        required
      />
      <ErrorDisplay error={formState.textError} fontSize="12px" />
      <TextButton text="add" />
    </form>
  )
}
