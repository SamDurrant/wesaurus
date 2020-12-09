import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import DefinitionApiService from '../../services/definition-api-service'
import routes from '../../utilities/routes'
import { MainContext } from '../../contexts/MainContext'

// components
import TextButton from '../../components/TextButton/TextButton'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'
import TextAreaWithLabel from '../TextAreaWithLabel/TextAreaWithLabel'

export default function AddDefinitionForm({ wordid, hideModal }) {
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

  const handleAddDefinition = async (e) => {
    e.preventDefault()
    setFormState({
      ...formState,
      textError: null,
    })

    try {
      let definition = await DefinitionApiService.postDefinition({
        text: formState.text,
        word_id: wordid,
      })
      dispatch({ type: 'add-def', payload: definition })
      hideModal()
      history.push(`${routes.word}/${wordid}`)
    } catch (error) {
      let err = error.error.message
      if (err === 'Unauthorized request') {
        err = 'Oops! You must create an account first'
      }
      setFormState({
        ...formState,
        textError: err,
      })
    }
  }

  return (
    <form className="add-form def-form" onSubmit={handleAddDefinition}>
      <h3>Add a new definition:</h3>
      <TextAreaWithLabel
        id="add-word-text"
        value={formState.text}
        name="text"
        onInputChange={handleChange}
        labelText="definition"
        placeholderText="definition"
        required
      />
      <ErrorDisplay error={formState.textError} fontSize="12px" />
      <TextButton text="add" />
    </form>
  )
}
