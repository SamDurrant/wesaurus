import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import '../../utilities/animations.css'
import routes from '../../utilities/routes'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import { MainContext } from '../../contexts/MainContext'

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

function Nav() {
  let { dispatch } = useContext(MainContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClasses, setMenuClasses] = useState({
    list: 'menu-list',
    icon: faBars,
  })

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuClasses({
        list: 'menu-list slide-top',
        icon: faTimes,
      })
      setMenuOpen(!menuOpen)
    } else {
      setMenuClasses({
        list: 'menu-list slide-bottom',
        icon: faBars,
      })
      setMenuOpen(!menuOpen)
    }
  }
  const handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    dispatch({ type: 'set-userName', payload: null })
    toggleMenu()
  }

  const renderAuthLinks = () => {
    return (
      <>
        <NavLink exact to={routes.explore} onClick={toggleMenu}>
          explore
        </NavLink>
        <NavLink exact to={routes.dictionary} onClick={toggleMenu}>
          dictionary
        </NavLink>
        <NavLink exact to={routes.contributions} onClick={toggleMenu}>
          contributions
        </NavLink>
        <NavLink to={routes.settings} onClick={toggleMenu}>
          settings
        </NavLink>
        <NavLink exact to="/" onClick={handleLogoutClick}>
          logout
        </NavLink>
      </>
    )
  }

  const renderUnauthLinks = () => {
    return (
      <>
        <NavLink exact to={routes.explore} onClick={toggleMenu}>
          explore
        </NavLink>
        <NavLink to={routes.login} onClick={toggleMenu}>
          login
        </NavLink>
        <NavLink to={routes.register} onClick={toggleMenu}>
          register
        </NavLink>
      </>
    )
  }

  return (
    <div className="nav-container">
      <div className="wave-bar">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M-5.60,10.36 C161.42,115.95 356.49,-75.48 500.00,37.00 L500.00,150.00 L0.00,150.00 Z"
            className="wave"
          ></path>
        </svg>
        <FontAwesomeIcon
          icon={menuClasses.icon}
          className="menu-icon"
          onClick={toggleMenu}
        />
      </div>
      <div className="wave-items">
        <nav className={menuClasses.list}>
          {TokenService.hasAuthToken()
            ? renderAuthLinks()
            : renderUnauthLinks()}
        </nav>
      </div>
    </div>
  )
}

export default Nav
