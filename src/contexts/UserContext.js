import React, { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/Theme/Theme'
import GlobalStyleTheme from '../components/Theme/GlobalStyleTheme'

const UserContext = createContext([{}, () => {}])

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    userName: null,
    settings: {
      theme: 'light',
    },
    mountedComponent: false,
    dictionary: [],
    definitions: [],
    displayWord: {
      word: {},
      definitions: [],
    },
    displayWordHistory: {
      word: {},
      definitions: [],
    },
    error: null,
  })

  const themeMode = state.settings.theme === 'light' ? lightTheme : darkTheme
  return (
    <UserContext.Provider value={[state, setState]}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyleTheme />
        {children}
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
