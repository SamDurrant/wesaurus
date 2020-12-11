import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// utilities
import routes from '../../utilities/routes'
import PublicOnlyRoute from '../../utilities/PublicOnlyRoute'
import PrivateRoute from '../../utilities/PrivateRoute'
import useUserSettings from '../../hooks/useUserSettings'

// components & pages
import Nav from '../Nav/Nav'
import Landing from '../../pages/Landing/Landing'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import Dictionary from '../../pages/Dictionary/Dictionary'
import Contributions from '../../pages/Contributions/Contributions'
import Explore from '../../pages/Explore/Explore'
import Settings from '../../pages/Settings/Settings'
import Word from '../../pages/Word/Word'
import NotFoundPage from '../../pages/NotFound/NotFound'

// services
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import AuthApiService from '../../services/auth-api-service'

function App() {
  const { mountedComponent } = useUserSettings()

  const logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }

  useEffect(() => {
    IdleService.setIdleCallback(logoutFromIdle)

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
    return () => {
      IdleService.unRegisterIdleResets()
      TokenService.clearCallbackBeforeExpiry()
    }
  }, [])

  if (!mountedComponent) return <div />
  return (
    <div className="App">
      <Nav />
      <Switch>
        <PublicOnlyRoute exact path={routes.landing} component={Landing} />
        <PublicOnlyRoute path={routes.register} component={Register} />
        <PublicOnlyRoute path={routes.login} component={Login} />
        <Route exact path={routes.explore} component={Explore} />
        <Route path={`${routes.word}/:wordid`} component={Word} />
        <PrivateRoute exact path={routes.dictionary} component={Dictionary} />
        <PrivateRoute
          exact
          path={routes.contributions}
          component={Contributions}
        />
        <PrivateRoute path={`${routes.userWord}/:wordid`}>
          <Word userDictionary />
        </PrivateRoute>
        <PrivateRoute path={routes.settings} component={Settings} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default App
