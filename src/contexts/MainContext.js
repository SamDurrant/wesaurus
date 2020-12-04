import React, { createContext, useState } from 'react'

const MainContext = createContext([{}, () => {}])

const MainProvider = ({ children }) => {
  const [state, setState] = useState({
    dictionary: [],
    definitions: [],
    displayWord: {},
    error: null,
  })

  return (
    <MainContext.Provider value={[state, setState]}>
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
