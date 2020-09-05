import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Nav from '../Nav/Nav'
import Landing from '../../pages/Landing/Landing'

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact to="/" component={Landing} />
        <Route exact to="/landing" component={Landing} />
      </Switch>
    </div>
  )
}

export default App
