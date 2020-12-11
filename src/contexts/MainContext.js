import React, { createContext, useReducer } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/Theme/Theme'
import GlobalStyleTheme from '../components/Theme/GlobalStyleTheme'

const MainContext = createContext()

let initialState = {
  userName: null,
  settings: {
    theme: 'light',
  },
  mountedComponent: false,
  dictionary: [],
  userDictionary: [],
  userDefinitions: [],
  displayWord: {
    word: {},
    definitions: [],
  },
  displayWordSaved: {
    word: {},
    definitions: [],
  },
  error: null,
}

let reducer = (state, action) => {
  switch (action.type) {
    case 'set-dictionary':
      return { ...state, dictionary: action.payload }
    case 'sort-dictionary':
      return {
        ...state,
        displayWord: {
          ...state.displayWord,
          definitions: state.displayWord.definitions.sort((a, b) =>
            a[action.payload] > b[action.payload] ? -1 : 1
          ),
        },
        displayWordSaved: {
          ...state.displayWordSaved,
          definitions: state.displayWordSaved.definitions.sort((a, b) =>
            a[action.payload] > b[action.payload] ? -1 : 1
          ),
        },
      }
    case 'set-userDictionary':
      return { ...state, userDictionary: action.payload }
    case 'set-userDefinitions':
      return {
        ...state,
        userDefinitions: action.payload.map((def) => ({
          ...def,
          editable: false,
          display: def.text,
        })),
      }
    case 'delete-userDefinition':
      return {
        ...state,
        userDefinitions: state.userDefinitions.filter(
          (def) => def.id !== action.payload
        ),
      }
    case 'set-definitionEditable':
      return {
        ...state,
        userDefinitions: state.userDefinitions.map((def) =>
          def.id !== action.payload.id
            ? def
            : { ...def, editable: action.payload.editable }
        ),
      }
    case 'set-definitionDisplay':
      return {
        ...state,
        userDefinitions: state.userDefinitions.map((def) =>
          def.id !== action.payload.id
            ? def
            : { ...def, display: action.payload.display }
        ),
      }
    case 'set-definitionText':
      return {
        ...state,
        userDefinitions: state.userDefinitions.map((def) =>
          def.id !== action.payload.id
            ? def
            : { ...def, text: action.payload.text }
        ),
      }
    case 'set-error':
      return { ...state, error: action.payload }
    case 'set-userName':
      return { ...state, userName: action.payload }
    case 'add-word':
      return { ...state, dictionary: [...state.dictionary, action.payload] }
    case 'delete-word':
      return {
        ...state,
        dictionary: state.dictionary.filter(
          (word) => word.id !== action.payload
        ),
      }
    case 'set-displayWord':
      return { ...state, displayWord: action.payload }
    case 'set-displayWordSaved':
      return { ...state, displayWordSaved: action.payload }
    case 'add-def':
      return {
        ...state,
        displayWord: {
          ...state.displayWord,
          definitions: [action.payload, ...state.displayWord.definitions],
        },
      }
    case 'set-def-like':
      return {
        ...state,
        displayWord: {
          ...state.displayWord,
          definitions: state.displayWord.definitions.map((def) =>
            def.id !== action.payload.id
              ? def
              : {
                  ...def,
                  like_count:
                    action.payload.like === true
                      ? def.like_count++
                      : def.like_count--,
                }
          ),
        },
      }
    case 'set-theme':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload,
        },
      }
    case 'set-mounted':
      return {
        ...state,
        mountedComponent: action.payload,
      }
    default:
      return state
  }
}

const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  const themeMode = state.settings.theme === 'light' ? lightTheme : darkTheme
  return (
    <MainContext.Provider value={value}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyleTheme />
        {children}
      </ThemeProvider>
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
