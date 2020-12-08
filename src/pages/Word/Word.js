import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './Word.css'
import styled from 'styled-components'
import useUserDictionary from '../../hooks/useUserDictionary'
import WordApiService from '../../services/word-api-service'
import UserWordApiService from '../../services/user-word-api-service'
import TokenService from '../../services/token-service'
import routes from '../../utilities/routes'

// components
import HeartIcon from '../../components/HeartIcon/HeartIcon'
import SolidButton from '../../components/SolidButton/SolidButton'
import DefinitionList from '../../components/DefinitionList/DefinitionList'
import useModal from '../../hooks/useModal'
import Modal from '../../components/Modal/Modal'
import useAlertModal from '../../hooks/useAlertModal'
import AddDefinitionForm from '../../components/AddDefinitionForm/AddDefinitionForm'
import AlertModal from '../../components/AlertModal/AlertModal'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

function Word({ userDictionary }) {
  const history = useHistory()
  const {
    error,
    setError,
    displayWord,
    setDisplayWord,
    sortDefinitions,
    displayWordSaved,
    setDisplayWordSaved,
  } = useUserDictionary()

  const { wordid } = useParams()
  const { isVisible, toggleModal } = useModal()
  const { isAlert, toggleAlert } = useAlertModal()
  let [isLoading, setIsLoading] = useState(false)

  const isWordLiked = displayWordSaved.word.id === displayWord.word.id

  const handleWordLike = async (word_id) => {
    if (TokenService.hasAuthToken()) {
      setError(null)
      try {
        // if user likes word, remove it
        if (!!displayWordSaved.word.id) {
          let res = await UserWordApiService.deleteWord(word_id)
          await displayWordSaved.definitions.map((d) =>
            UserWordApiService.deleteDefinition(d.id)
          )
          setDisplayWordSaved({
            word: res,
            definitions: [],
          })
          history.push(`${routes.dictionary}`)
        } else {
          // if user doesn't like word, add it
          let res = await UserWordApiService.postWord(word_id)
          setDisplayWordSaved({
            ...displayWordSaved,
            word: res,
          })
        }
      } catch (error) {
        setError(error)
      }
    } else {
      setError('You need to be logged in to add this to your dictionary.')
      toggleAlert()
    }
  }

  async function fetchData() {
    setIsLoading(true)
    setError(null)

    try {
      let word = await WordApiService.getWord(wordid)
      let definitions = await WordApiService.getWordDefinitions(wordid)
      setDisplayWord({ word, definitions })
    } catch (error) {
      setError(error.error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchUserData() {
    setIsLoading(true)

    try {
      // get user word & def history from api
      let userWordHistory = await UserWordApiService.getWord(wordid)
      let userDefHistory = await UserWordApiService.getWordDefinitions(wordid)
      setDisplayWordSaved({
        word: userWordHistory,
        definitions: userDefHistory,
      })
    } catch (err) {
      if (err.error.message === 'This word does not exist in your dictionary') {
        setDisplayWordSaved({
          word: {},
          definitions: [],
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    if (TokenService.hasAuthToken()) {
      fetchUserData()
    }
  }, [])

  return (
    <section className="word-page">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <section className="word-section">
            <StyledCard className="card word-card">
              <h1>{displayWord.word.text}</h1>
              <HeartIcon
                handleClick={() => handleWordLike(displayWord.word.id)}
                liked={isWordLiked}
              />
            </StyledCard>
            <div className="def-controls">
              <SolidButton
                text="most liked"
                handleClick={() => sortDefinitions('like_count')}
              />
              <SolidButton
                text="most recent"
                handleClick={() => sortDefinitions('date_created')}
              />
            </div>
            {!userDictionary && TokenService.hasAuthToken() && (
              <SolidButton
                margin="0 auto"
                text="add definition"
                handleClick={toggleModal}
              />
            )}
          </section>
          <section className="def-section">
            {!userDictionary ? (
              <DefinitionList
                word={displayWord}
                wordHistory={displayWordSaved}
              />
            ) : (
              <DefinitionList
                word={displayWordSaved}
                wordHistory={displayWordSaved}
              />
            )}
            <Modal isVisible={isVisible} hide={toggleModal}>
              <AddDefinitionForm wordid={wordid} hideModal={toggleModal} />
            </Modal>
            <AlertModal isAlert={isAlert} hide={toggleAlert}>
              <p>{error}</p>
            </AlertModal>
          </section>
        </>
      )}
    </section>
  )
}

export default Word
