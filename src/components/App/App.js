import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../../utilities/routes'
import './App.css'
import { ThemeProvider } from 'styled-components'
import { useDarkMode } from '../../utilities/useDarkMode'
import GlobalStyleTheme from '../Theme/GlobalStyleTheme'
import { lightTheme, darkTheme } from '../Theme/Theme'
import ColorToggle from '../ColorToggle/ColorToggle'
import Nav from '../Nav/Nav'
import Landing from '../../pages/Landing/Landing'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import Dictionary from '../../pages/Dictionary/Dictionary'
import Explore from '../../pages/Explore/Explore'
import Settings from '../../pages/Settings/Settings'

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  // if component hasn't mounted, return empty div
  if (!mountedComponent) return <div />
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyleTheme />
        <div className="App">
          <Nav />
          <ColorToggle theme={theme} toggleTheme={themeToggler} />
          <Switch>
            <>
              <Route exact path={routes.landing} component={Landing} />
              <Route exact path={routes.register} component={Register} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.dictionary} component={Dictionary} />
              <Route exact path={routes.explore} component={Explore} />
              <Route exact path={routes.settings} component={Settings} />
            </>
          </Switch>
        </div>
      </>
    </ThemeProvider>
  )
}

export default App
