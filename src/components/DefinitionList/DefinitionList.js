import React, { Fragment } from 'react'
import './DefinitionList.css'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useUserDictionary from '../../hooks/useUserDictionary'
import UserWordApiService from '../../services/user-word-api-service'
import TokenService from '../../services/token-service'
import HeartIcon from '../../components/HeartIcon/HeartIcon'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

export default function DefinitionList({ word, wordHistory }) {
  const {
    error,
    setError,
    setDefLike,
    displayWord,
    displayWordSaved,
    setDisplayWordSaved,
  } = useUserDictionary()

  const isWordLiked = displayWordSaved.word.id === displayWord.word.id

  async function handleDefLike(def_id) {
    if (TokenService.hasAuthToken()) {
      setError(null)
      try {
        // unlike definition
        if (isDefLiked(def_id)) {
          await UserWordApiService.deleteDefinition(def_id)
          let filtered = displayWordSaved.definitions.filter(
            (def) => def.id !== def_id
          )

          setDisplayWordSaved({
            ...displayWordSaved,
            definitions: filtered,
          })
        } else {
          // like definition
          let def = await UserWordApiService.postDefinition(def_id)
          setDisplayWordSaved({
            word: isWordLiked ? word.word : displayWord.word,
            definitions: [...displayWordSaved.definitions, def],
          })
          setDefLike('add', def_id)
        }
      } catch (error) {
        setError(error.error.message)
      }
    } else {
      console.log('not logged in')
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
    </Fragment>
  )
}

DefinitionList.propTypes = {
  word: PropTypes.object.isRequired,
  wordHistory: PropTypes.object.isRequired,
}
