import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../../utilities/routes'
import './App.css'
import Nav from '../Nav/Nav'
import Landing from '../../pages/Landing/Landing'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import Dictionary from '../../pages/Dictionary/Dictionary'
import Explore from '../../pages/Explore/Explore'
import Settings from '../../pages/Settings/Settings'
import MainContext from '../../contexts/MainContext'
import Word from '../../pages/Word/Word'

function App() {
  const { mountedComponent } = useContext(MainContext)
  // if component hasn't mounted, return empty div
  if (!mountedComponent) return <div />
  return (
    // <ThemeProvider theme={themeMode}>
    //   <>
    //     <GlobalStyleTheme />
    <div className="App">
      <Nav />
      <Switch>
        <>
          <Route exact path={routes.landing} component={Landing} />
          <Route path={routes.register} component={Register} />
          <Route path={routes.login} component={Login} />
          <Route path={routes.dictionary} component={Dictionary} />
          <Route path={`${routes.word}/:wordid`} component={Word} />
          <Route path={routes.explore} component={Explore} />
          <Route path={routes.settings} component={Settings} />
        </>
      </Switch>
    </div>
    //   </>
    // </ThemeProvider>
  )
}

export default App
