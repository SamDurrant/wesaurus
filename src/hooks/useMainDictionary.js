import { useContext } from 'react'
import { MainContext } from '../contexts/MainContext'

const useMainDictionary = () => {
  const [state, setState] = useContext(MainContext)

  const getDefinitions = (id) => {
    return state.definitions.filter((def) => def.word_id === id)
  }

  return {
    definitions: state.definitions,
    getDefinitions,
  }
}

export default useMainDictionary
