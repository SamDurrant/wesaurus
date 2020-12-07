import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './AddDefinitionForm.css'
import DefinitionApiService from '../../services/definition-api-service'
import useUserDictionary from '../../hooks/useUserDictionary'
import routes from '../../utilities/routes'

// components
import TextButton from '../../components/TextButton/TextButton'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'
import TextAreaWithLabel from '../TextAreaWithLabel/TextAreaWithLabel'

export default function AddDefinitionForm({ wordid, hideModal }) {
  const history = useHistory()
  const { addDefinition } = useUserDictionary()
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

  const handleAddDefinition = async (e) => {
    e.preventDefault()
    setState({
      ...state,
      textError: null,
    })

    try {
      let definition = await DefinitionApiService.postDefinition({
        text: state.text,
        word_id: wordid,
      })
      console.log({ definition, history, n: `${routes.word}/${wordid}` })
      addDefinition(definition)
      hideModal()
      history.push(`${routes.word}/${wordid}`)
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
    <form className="add-form def-form" onSubmit={handleAddDefinition}>
      <h3>Add a new definition:</h3>
      <TextAreaWithLabel
        id="add-word-text"
        value={state.text}
        name="text"
        onInputChange={handleChange}
        labelText="definition"
        placeholderText="definition"
        required
      />
      <ErrorDisplay error={state.textError} fontSize="12px" />
      <TextButton text="add" />
    </form>
  )
}
