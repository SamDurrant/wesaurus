import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const useUserDictionary = () => {
  const [state, setState] = useContext(UserContext)

  const addWord = (word) => {
    setState((state) => ({ ...state, dictionary: [...state.dictionary, word] }))
  }

  const addDefinition = (def) => {
    console.log({ w: def.word_id, d: state.displayWord })
    if (parseInt(def.word_id) === parseInt(state.displayWord.word.id)) {
      console.log('samesies', state)
      setState((state) => ({
        ...state,
        definitions: [def, ...state.definitions],
        displayWord: {
          ...state.displayWord,
          definitions: [def, ...state.displayWord.definitions],
        },
      }))
    } else {
      setState((state) => ({
        ...state,
        definitions: [...state.definitions, def],
      }))
    }
  }

  const sortDefinitions = (type) => {
    setState((state) => ({
      ...state,
      displayWord: {
        ...state.displayWord,
        definitions: state.displayWord.definitions.sort((a, b) =>
          a[type] > b[type] ? -1 : 1
        ),
      },
      displayWordSaved: {
        ...state.displayWordSaved,
        definitions: state.displayWordSaved.definitions.sort((a, b) =>
          a[type] > b[type] ? -1 : 1
        ),
      },
    }))
  }

  const setDefLike = (type, id) => {
    setState((state) => ({
      ...state,
      displayWord: {
        ...state.displayWord,
        definitions: state.displayWord.definitions.map((def) =>
          def.id !== id
            ? def
            : {
                ...def,
                like_count:
                  type === 'add' ? def.like_count++ : def.like_count--,
              }
        ),
      },
    }))
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

  const setDisplayWordSaved = (word) => {
    setState((state) => ({ ...state, displayWordSaved: word }))
  }

  const setError = (error) => {
    setState((state) => ({ ...state, error }))
  }

  const setGreeting = (name) => {
    setState((state) => ({ ...state, userName: name }))
  }

  const clearGreeting = () => {
    setState((state) => ({ ...state, userName: null }))
  }

  return {
    addWord,
    getWord,
    setWords,
    addDefinition,
    sortDefinitions,
    setDefLike,
    setError,
    setDisplayWord,
    setDisplayWordSaved,
    setGreeting,
    clearGreeting,
    dictionary: state.dictionary,
    definitions: state.definitions,
    displayWord: state.displayWord,
    displayWordSaved: state.displayWordSaved,
    greeting: state.userName,
    error: state.error,
  }
}

export default useUserDictionary
