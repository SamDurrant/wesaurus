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
    setError,
    displayWordHistory,
    setDisplayWordHistory,
  } = useUserDictionary()

  async function handleDefLike(def_id) {
    if (TokenService.hasAuthToken()) {
      setError(null)
      try {
        // if user likes definition, remove it
        if (!!findLikedDef(def_id)) {
          let def = await UserWordApiService.deleteDefinition(def_id)
          let filtered = displayWordHistory.definitions.filter(
            (def) => def.id !== def_id
          )

          setDisplayWordHistory({
            ...displayWordHistory,
            definitions: filtered,
          })
        } else {
          // if user doesn't likes definition, add it
          let def = await UserWordApiService.postDefinition(def_id)
          setDisplayWordHistory({
            ...displayWordHistory,
            definitions: [...displayWordHistory.definitions, def],
          })
        }
      } catch (error) {
        setError(error.error.message)
      }
    } else {
      console.log('not logged in')
    }
  }

  const findLikedDef = (id) =>
    wordHistory.definitions.find((def) => def.id === id)

  return (
    <Fragment>
      {word.definitions.map((def) => (
        <StyledCard key={def.id} className="card def-card">
          <p>{def.text}</p>
          <div className="def-likes">
            <span>{def.like_count}</span>
            <HeartIcon
              handleClick={() => handleDefLike(def.id)}
              liked={!!findLikedDef(def.id)}
            />
          </div>
        </StyledCard>
      ))}
    </Fragment>
  )
}

DefinitionList.propTypes = {
  word: PropTypes.object.isRequired,
  wordHistory: PropTypes.object.isRequired,
}
