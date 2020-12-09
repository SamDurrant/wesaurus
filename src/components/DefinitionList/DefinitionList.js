import React, { useContext, Fragment } from 'react'
import './DefinitionList.css'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UserWordApiService from '../../services/user-word-api-service'
import TokenService from '../../services/token-service'
import useAlertModal from '../../hooks/useAlertModal'
import { MainContext } from '../../contexts/MainContext'

// components
import HeartIcon from '../../components/HeartIcon/HeartIcon'
import AlertModal from '../AlertModal/AlertModal'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

export default function DefinitionList({ word, wordHistory }) {
  let { state, dispatch } = useContext(MainContext)
  const { isAlert, toggleAlert } = useAlertModal()
  const isWordLiked = word.word.id === wordHistory.word.id

  async function handleDefLike(def_id) {
    if (TokenService.hasAuthToken()) {
      dispatch({ type: 'set-error', payload: null })
      try {
        // unlike definition
        if (isDefLiked(def_id)) {
          await UserWordApiService.deleteDefinition(def_id)
          dispatch({
            type: 'set-displayWordSaved',
            payload: {
              ...state.displayWordSaved,
              definitions: state.displayWordSaved.definitions.filter(
                (def) => def.id !== def_id
              ),
            },
          })
          dispatch({
            type: 'set-def-like',
            payload: { like: false, id: def_id },
          })
        } else {
          // like definition
          let def = await UserWordApiService.postDefinition(def_id)
          dispatch({
            type: 'set-displayWordSaved',
            payload: {
              word: isWordLiked ? word.word : state.displayWord.word,
              definitions: [...state.displayWordSaved.definitions, def],
            },
          })
          dispatch({
            type: 'set-def-like',
            payload: { like: true, id: def_id },
          })
        }
      } catch (error) {
        dispatch({ type: 'set-error', payload: error.error.message })
        toggleAlert()
      }
    } else {
      dispatch({
        type: 'set-error',
        payload: 'You need to be logged in to add this to your dictionary.',
      })

      toggleAlert()
    }
  }

  const isDefLiked = (id) =>
    Boolean(wordHistory.definitions.find((def) => def.id === id))

  const makeDefinitions = () => (
    <Fragment>
      {word.definitions.map((def) => (
        <StyledCard key={def.id} className="card def-card">
          <p>{def.text}</p>
          <div className="def-likes">
            <span>{def.like_count}</span>
            <HeartIcon
              handleClick={() => handleDefLike(def.id)}
              liked={isDefLiked(def.id)}
            />
          </div>
        </StyledCard>
      ))}
    </Fragment>
  )

  const makeEmpty = () => (
    <StyledCard className="card def-card empty-card">
      <div>
        <h3>We don't see any definitions for this word yet!</h3>
      </div>
    </StyledCard>
  )

  return (
    <Fragment>
      {word.definitions.length > 0 ? makeDefinitions() : makeEmpty()}
      <AlertModal isAlert={isAlert} hide={toggleAlert}>
        <p>{state.error}</p>
      </AlertModal>
    </Fragment>
  )
}

DefinitionList.propTypes = {
  word: PropTypes.object.isRequired,
  wordHistory: PropTypes.object.isRequired,
}
