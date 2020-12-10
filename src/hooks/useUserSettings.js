import { useContext, useEffect, useCallback } from 'react'
import { MainContext } from '../contexts/MainContext'
import SettingsApiService from '../services/settings-api-service'
import TokenService from '../services/token-service'

const useUserSettings = () => {
  const { state, dispatch } = useContext(MainContext)

  const setMode = useCallback(
    (mode) => {
      // sets color mode in local storage
      window.localStorage.setItem('theme', mode)
      // then sets local state
      dispatch({
        type: 'set-theme',
        payload: mode,
      })
    },
    [dispatch]
  )

  const toggleTheme = () => {
    // switches the theme to the opposite
    state.settings.theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    async function getUserSettings() {
      if (TokenService.hasAuthToken() && state.userName) {
        try {
          const settings = await SettingsApiService.getSettings()
          settings.dark_mode === true ? setMode('dark') : setMode('light')
        } catch (error) {
          setMode('light')
        }
      } else {
        // retrieves color mode from local storage
        const localTheme = window.localStorage.getItem('theme')
        // sets the theme to the color mode, if found in local storage
        localTheme && setMode(localTheme)
      }
    }
    getUserSettings()

    // component mounts once, sets variable to true
    dispatch({ type: 'set-mounted', payload: true })
  }, [dispatch, setMode, state.userName])

  return {
    toggleTheme,
    mountedComponent: state.mountedComponent,
  }
}

export default useUserSettings
