import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import routes from '../../utilities/routes'
import Nav from '../Nav/Nav'
import Landing from '../../pages/Landing/Landing'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import Dictionary from '../../pages/Dictionary/Dictionary'
import Settings from '../../pages/Settings/Settings'

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <>
          <Route exact path={routes.landing} component={Landing} />
          <Route exact path={routes.register} component={Register} />
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.dictionary} component={Dictionary} />
          <Route exact path={routes.settings} component={Settings} />
        </>
      </Switch>
    </div>
  )
}

export default App
