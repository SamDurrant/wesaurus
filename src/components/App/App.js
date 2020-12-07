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
    // remove token from localStorage
    TokenService.clearAuthToken()
    // remove queued calls to refresh endpoint
    TokenService.clearCallbackBeforeExpiry()
    // remove timeouts that auto logout when idle
    IdleService.unRegisterIdleResets()
  }

  useEffect(() => {
    // set callback function for logging out idle user
    IdleService.setIdleCallback(logoutFromIdle)

    // if user is logged in
    if (TokenService.hasAuthToken()) {
      // tell idle service to register event listeners. If these are not triggered, user is idle and idleCallback will be invoked
      IdleService.registerIdleTimerResets()
      // tell token service to read JWT, look at exp and queue a timer before the expiry time
      TokenService.queueCallbackBeforeExpiry(() => {
        // timeout will call this just before token expires
        AuthApiService.postRefreshToken()
      })
    }
    return () => {
      // when app unmounts, stop event  listeners that clear  token from storage
      IdleService.unRegisterIdleResets()
      // remove refresh endpoint request
      TokenService.clearCallbackBeforeExpiry()
    }
  }, [])

  // if component hasn't mounted, return empty div
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
        <PrivateRoute path={`${routes.userWord}/:wordid`}>
          <Word dictionary={true} />
        </PrivateRoute>
        <PrivateRoute path={routes.settings} component={Settings} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default App
