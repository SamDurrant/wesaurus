import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const useUserDictionary = () => {
  const [state, setState] = useContext(UserContext)

  const addWord = (word) => {
    setState((state) => ({ ...state, dictionary: [...state.dictionary, word] }))
  }

  const getWord = (id) => {
    return state.dictionary.find((word) => word.word_id === id)
  }

  return {
    addWord,
    getWord,
    dictionary: state.dictionary,
  }
}

export default useUserDictionary
