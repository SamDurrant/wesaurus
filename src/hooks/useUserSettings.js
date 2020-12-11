import { useContext, useEffect, useCallback } from 'react'
import { MainContext } from '../contexts/MainContext'
import SettingsApiService from '../services/settings-api-service'
import TokenService from '../services/token-service'

const useUserSettings = () => {
  const { state, dispatch } = useContext(MainContext)

  const setMode = useCallback(
    (mode) => {
      window.localStorage.setItem('theme', mode)
      dispatch({
        type: 'set-theme',
        payload: mode,
      })
    },
    [dispatch]
  )

  const toggleTheme = () => {
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
        const localTheme = window.localStorage.getItem('theme')
        localTheme && setMode(localTheme)
      }
    }
    getUserSettings()
    dispatch({ type: 'set-mounted', payload: true })
  }, [dispatch, setMode, state.userName])

  return {
    toggleTheme,
    mountedComponent: state.mountedComponent,
  }
}

export default useUserSettings
