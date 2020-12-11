import React, { useState, useContext, useEffect, Fragment } from 'react'
import './Contributions.css'
import styled from 'styled-components'
import { MainContext } from '../../contexts/MainContext'
import UserApiService from '../../services/user-api-service'
import DefinitionApiService from '../../services/definition-api-service'

// components
import HeartIcon from '../../components/HeartIcon/HeartIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import TextButton from '../../components/TextButton/TextButton'
import SolidButton from '../../components/SolidButton/SolidButton'
import AlertModal from '../../components/AlertModal/AlertModal'
import useAlertModal from '../../hooks/useAlertModal'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

const StyledTextArea = styled.textarea`
  width: 90%;
  display: block;
  margin: 1rem auto;
  min-height: 7rem;
  border: 0.5px solid #99bdb8;
  border-radius: 0.5rem;
  background: var(--color-light);
  color: var(--color-dark);
  font-size: 1rem;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-family: inherit;
  resize: vertical;

  &:focus {
    border-radius: 0.5rem;
    outline: none;
    -webkit-box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
    -moz-box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
    box-shadow: 0px 0px 4px 4px rgba(246, 189, 96, 0.7);
  }

  &::placeholder {
    color: #555;
    letter-spacing: 1px;
  }

  &:disabled {
    background: none;
    border: none;
    resize: none;
  }
`

function Contributions() {
  let { state, dispatch } = useContext(MainContext)
  const [isLoading, setIsLoading] = useState(false)
  const { isAlert, toggleAlert } = useAlertModal()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      dispatch({ type: 'set-error', payload: null })
      try {
        // get user submitted definitions
        const definitions = await UserApiService.getUserDefinitions()
        dispatch({ type: 'set-userDefinitions', payload: definitions })
        // store in context
      } catch (error) {
        dispatch({ type: 'set-error', payload: error })
      }
      setIsLoading(false)
    }

    fetchData()
  }, [dispatch])

  const handleDefChange = (e, id) => {
    dispatch({
      type: 'set-definitionDisplay',
      payload: { id, display: e.target.value },
    })
  }

  const cancelDefEdits = (id, display) => {
    setEditableDef(id, false)
    dispatch({
      type: 'set-definitionDisplay',
      payload: { id, display: display.text },
    })
  }

  const setEditableDef = (id, editable) => {
    dispatch({ type: 'set-definitionEditable', payload: { id, editable } })
  }

  const saveDefEdits = async (def) => {
    dispatch({ type: 'set-error', payload: null })
    try {
      const newDef = {
        word_id: def.word_id,
        text: def.display,
        id: def.id,
      }
      await DefinitionApiService.updateDefinition(newDef)
      setEditableDef(def.id, false)
      dispatch({
        type: 'set-definitionText',
        payload: { id: def.id, text: def.display },
      })
    } catch (error) {
      dispatch({ type: 'set-error', payload: error.error.message })
      toggleAlert()
    }
  }

  const deleteDef = async (def) => {
    dispatch({ type: 'set-error', payload: null })
    try {
      await DefinitionApiService.deleteDefinition(def)
      setEditableDef(def.id, false)
      dispatch({
        type: 'delete-userDefinition',
        payload: def.id,
      })
    } catch (error) {
      dispatch({ type: 'set-error', payload: error.message })
      toggleAlert()
    }
  }

  const makeDefinitions = (defs) => (
    <Fragment>
      {defs.map((def) => (
        <StyledCard key={def.id} className="card def-card def-card-editable">
          <div className="def-card-content">
            <div className="def-card-content-1">
              <button
                className="icon-round"
                onClick={() => setEditableDef(def.id, true)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className="icon-round icon-med"
                onClick={() => deleteDef(def)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            <h3>{def.word_text}:</h3>
            <div className="def-card-content-2">
              <StyledTextArea
                className="textarea-toggled"
                type="text"
                value={def.display}
                disabled={!def.editable}
                onChange={(e) => handleDefChange(e, def.id)}
              />
              <div className="def-likes">
                {!def.editable ? (
                  <Fragment>
                    <span>{def.like_count}</span>
                    <HeartIcon liked={true} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <TextButton
                      text="back"
                      margin=".5rem"
                      handleClick={() => cancelDefEdits(def.id, def)}
                    />
                    <SolidButton
                      text="save"
                      margin=".5rem"
                      handleClick={() => saveDefEdits(def)}
                    />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </StyledCard>
      ))}
    </Fragment>
  )

  return (
    <section className="section">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="def-section">
          {makeDefinitions(state.userDefinitions)}
        </div>
      )}
      <AlertModal isAlert={isAlert} hide={toggleAlert}>
        <p>{state.error}</p>
      </AlertModal>
    </section>
  )
}

export default Contributions
