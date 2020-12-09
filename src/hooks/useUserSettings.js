import { useContext, useEffect, useCallback } from 'react'
import { MainContext } from '../contexts/MainContext'

const useUserSettings = () => {
  const { state, dispatch } = useContext(MainContext)

  const setMode = useCallback(
    (mode) => {
      // sets color mode in local storage
      window.localStorage.setItem('theme', mode)
      // then sets local state
      dispatch({
        type: 'set-theme',
        payload: { theme: mode },
      })
    },
    [dispatch]
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
    dispatch({ type: 'set-mounted', payload: true })
  }, [dispatch, setMode])

  return {
    toggleTheme,
    mountedComponent: state.mountedComponent,
  }
}

export default useUserSettings
