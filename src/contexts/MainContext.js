import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/Theme/Theme'
import GlobalStyleTheme from '../components/Theme/GlobalStyleTheme'

const MainContext = createContext()
// export const useTheme = () => React.useContext(MainContext)
export default MainContext

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [mountedComponent, setMountedComponent] = useState(false)
  const [words, setWord] = useState([
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
    },
    {
      word: 'memory leaks',
      word_id: 25,
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
  ])

  const addWord = (word) => {
    setWord([...words, word])
  }

  const getWord = (id) => {
    return words.find((word) => word.word_id === id)
  }

  const setMode = (mode) => {
    // sets color mode in local storage
    window.localStorage.setItem('theme', mode)
    // then sets local state
    setTheme(mode)
  }

  const toggleTheme = () => {
    // switches the theme to the opposite
    theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    // retrieves color mode from local storage
    const localTheme = window.localStorage.getItem('theme')
    // sets the theme to the color mode, if found in local storage
    localTheme && setTheme(localTheme)

    // component mounts once, sets variable to true
    setMountedComponent(true)
  }, [])

  const value = {
    toggleTheme: toggleTheme,
    mountedComponent: mountedComponent,
    words: words,
    addWord: addWord,
    getWord: getWord,
  }

  const themeMode = theme === 'light' ? lightTheme : darkTheme
  return (
    <MainContext.Provider value={value}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyleTheme />
        {children}
      </ThemeProvider>
    </MainContext.Provider>
  )
}
