import React, { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/Theme/Theme'
import GlobalStyleTheme from '../components/Theme/GlobalStyleTheme'

const UserContext = createContext([{}, () => {}])

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    settings: {
      theme: 'light',
    },
    mountedComponent: false,
    dictionary: [
      {
        word: 'virtual DOM',
        word_id: 1,
      },
      {
        word: 'middleware',
        word_id: 2,
      },
      {
        word: 'provider',
        word_id: 3,
      },
      {
        word: 'state',
        word_id: 4,
      },
      {
        word: 'lifecycle methods',
        word_id: 5,
      },
      {
        word: 'mounting',
        word_id: 6,
      },
      {
        word: 'unmounting',
        word_id: 7,
      },
      {
        word: 'history',
        word_id: 8,
      },
      {
        word: 'closure',
        word_id: 9,
      },
      {
        word: 'DOM',
        word_id: 10,
      },
      {
        word: 'Encapsulation',
        word_id: 11,
      },
      {
        word: 'Factory function',
        word_id: 12,
      },
      {
        word: 'Function declaration',
        word_id: 13,
      },
      {
        word: 'Function expression',
        word_id: 14,
      },
      {
        word: 'HOF',
        word_id: 15,
      },
      {
        word: 'Hoisting',
        word_id: 16,
      },
      {
        word: 'HTTP',
        word_id: 17,
      },
      {
        word: 'Inline caching',
        word_id: 18,
      },
      {
        word: 'Instanceof',
        word_id: 19,
      },
      {
        word: 'lexical environment',
        word_id: 20,
      },
      {
        word: 'javascript runtime',
        word_id: 21,
      },
      {
        word: 'javascript engine',
        word_id: 22,
      },
      {
        word: 'primitive type',
        word_id: 23,
      },
      {
        word: 'pure function',
        word_id: 24,
        definition: `a function that has no side effects like affecting another part of a program and always return something based on an input. Same input results in same output.`,
      },
      {
        word: 'memory leaks',
        word_id: 25,
        definition: `pieces of memory that the application has used in the past but is not needed any longer but has not yet been returned back to us.`,
      },
      {
        word: 'memory heap',
        word_id: 26,
      },
      {
        word: 'object',
        word_id: 27,
      },
      {
        word: 'string',
        word_id: 28,
      },
      {
        word: 'inheritance',
        word_id: 29,
      },
      {
        word: 'polymorphism',
        word_id: 30,
      },
      {
        word: 'abstraction',
        word_id: 31,
      },
    ],
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
