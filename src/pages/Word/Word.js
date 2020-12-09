import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './Word.css'
import styled from 'styled-components'
import WordApiService from '../../services/word-api-service'
import UserWordApiService from '../../services/user-word-api-service'
import TokenService from '../../services/token-service'
import routes from '../../utilities/routes'
import useModal from '../../hooks/useModal'
import useAlertModal from '../../hooks/useAlertModal'
import { MainContext } from '../../contexts/MainContext'

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import HeartIcon from '../../components/HeartIcon/HeartIcon'
import SolidButton from '../../components/SolidButton/SolidButton'
import DefinitionList from '../../components/DefinitionList/DefinitionList'
import Modal from '../../components/Modal/Modal'
import AddDefinitionForm from '../../components/AddDefinitionForm/AddDefinitionForm'
import AlertModal from '../../components/AlertModal/AlertModal'

const StyledCard = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

function Word({ userDictionary }) {
  let { state, dispatch } = useContext(MainContext)
  const history = useHistory()
  const { wordid } = useParams()
  const { isVisible, toggleModal } = useModal()
  const { isAlert, toggleAlert } = useAlertModal()
  let [isLoading, setIsLoading] = useState(false)

  const isWordLiked =
    state.displayWordSaved.word.id === state.displayWord.word.id

  const handleWordLike = async (word_id) => {
    if (TokenService.hasAuthToken()) {
      dispatch({ type: 'set-error', payload: null })
      try {
        // if user likes word, remove it
        if (!!state.displayWordSaved.word.id) {
          let res = await UserWordApiService.deleteWord(word_id)
          // remove associated definitions
          await state.displayWordSaved.definitions.map((d) =>
            UserWordApiService.deleteDefinition(d.id)
          )
          dispatch({
            type: 'set-displayWordSaved',
            payload: {
              word: res,
              definitions: [],
            },
          })
          history.push(`${routes.dictionary}`)
        } else {
          // if user doesn't like word, add it
          let res = await UserWordApiService.postWord(word_id)
          dispatch({
            type: 'set-displayWordSaved',
            payload: {
              ...state.displayWordSaved,
              word: res,
            },
          })
        }
      } catch (error) {
        dispatch({ type: 'set-error', payload: error })
      }
    } else {
      dispatch({
        type: 'set-error',
        payload: 'You need to be logged in to add this to your dictionary.',
      })

      toggleAlert()
    }
  }

  const handleDeleteWord = async (word_id) => {
    if (TokenService.hasAuthToken()) {
      dispatch({ type: 'set-error', payload: null })
      try {
        await WordApiService.deleteWord(word_id)
        dispatch({ type: 'delete-word', payload: word_id })
        history.push(`${routes.explore}`)
      } catch (error) {
        dispatch({ type: 'set-error', payload: error })
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      dispatch({ type: 'set-error', payload: null })

      try {
        let word = await WordApiService.getWord(wordid)
        let definitions = await WordApiService.getWordDefinitions(wordid)
        dispatch({ type: 'set-displayWord', payload: { word, definitions } })
      } catch (error) {
        dispatch({ type: 'set-error', payload: error.error.message })
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
        dispatch({
          type: 'set-displayWordSaved',
          payload: {
            word: userWordHistory,
            definitions: userDefHistory,
          },
        })
      } catch (err) {
        if (
          err.error.message === 'This word does not exist in your dictionary'
        ) {
          dispatch({
            type: 'set-displayWordSaved',
            payload: {
              word: {},
              definitions: [],
            },
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    if (TokenService.hasAuthToken()) {
      fetchUserData()
    }
  }, [dispatch, wordid])

  const showDeleteButton = () =>
    !userDictionary &&
    TokenService.hasAuthToken() &&
    state.displayWord.definitions.length === 0

  return (
    <section className="word-page">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <section className="word-section">
            <StyledCard className="card word-card">
              <h1>{state.displayWord.word.text}</h1>
              <HeartIcon
                handleClick={() => handleWordLike(state.displayWord.word.id)}
                liked={isWordLiked}
              />
              {showDeleteButton() && (
                <button className="appear-icon">
                  <FontAwesomeIcon
                    className="heart-icon"
                    onClick={() => handleDeleteWord(state.displayWord.word.id)}
                    icon={faTrashAlt}
                  />
                </button>
              )}
            </StyledCard>
            <div className="def-controls">
              <SolidButton
                text="most liked"
                handleClick={() =>
                  dispatch({ type: 'sort-dictionary', payload: 'like_count' })
                }
              />
              <SolidButton
                text="most recent"
                handleClick={() =>
                  dispatch({ type: 'sort-dictionary', payload: 'date_created' })
                }
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
                word={state.displayWord}
                wordHistory={state.displayWordSaved}
              />
            ) : (
              <DefinitionList
                word={state.displayWordSaved}
                wordHistory={state.displayWordSaved}
              />
            )}
            <Modal isVisible={isVisible} hide={toggleModal}>
              <AddDefinitionForm wordid={wordid} hideModal={toggleModal} />
            </Modal>
            <AlertModal isAlert={isAlert} hide={toggleAlert}>
              <p>{state.error}</p>
            </AlertModal>
          </section>
        </>
      )}
    </section>
  )
}

export default Word
