import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const useUserDictionary = () => {
  const [state, setState] = useContext(UserContext)

  const addWord = (word) => {
    setState((state) => ({ ...state, dictionary: [...state.dictionary, word] }))
  }

  const getWord = (id) => {
    return state.dictionary.find((word) => word.id === id)
  }

  const setWords = (words) => {
    setState((state) => ({ ...state, dictionary: words }))
  }

  const setDisplayWord = (word) => {
    setState((state) => ({ ...state, displayWord: word }))
  }

  const setDisplayWordHistory = (word) => {
    setState((state) => ({ ...state, displayWordHistory: word }))
  }

  const setError = (error) => {
    setState((state) => ({ ...state, error }))
  }

  return {
    addWord,
    getWord,
    setWords,
    setError,
    setDisplayWord,
    setDisplayWordHistory,
    dictionary: state.dictionary,
    definitions: state.definitions,
    displayWord: state.displayWord,
    displayWordHistory: state.displayWordHistory,
  }
}

export default useUserDictionary
