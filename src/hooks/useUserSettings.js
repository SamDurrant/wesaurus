import { useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../contexts/UserContext'

const useUserSettings = () => {
  const [state, setState] = useContext(UserContext)
  const setMode = useCallback(
    (mode) => {
      // sets color mode in local storage
      window.localStorage.setItem('theme', mode)
      // then sets local state
      setState((state) => ({
        ...state,
        settings: { ...state.settings, theme: mode },
      }))
    },
    [setState]
  )

  const toggleTheme = () => {
    // switches the theme to the opposite
    state.settings.theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    // retrieves color mode from local storage
    const localTheme = window.localStorage.getItem('theme')
    // sets the theme to the color mode, if found in local storage
    localTheme && setMode(localTheme)

    // component mounts once, sets variable to true
    setState((state) => ({
      ...state,
      mountedComponent: true,
    }))
  }, [setState, setMode])

  return {
    toggleTheme,
    mountedComponent: state.mountedComponent,
  }
}

export default useUserSettings
