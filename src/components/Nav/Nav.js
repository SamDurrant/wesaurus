import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import routes from '../../utilities/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

function Nav() {
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

  return (
    <div className="nav-container">
      <div className="wave-bar">
        <FontAwesomeIcon
          icon={menuClasses.icon}
          className="menu-icon"
          onClick={toggleMenu}
        />
      </div>
      <nav className={menuClasses.list}>
        <Link to={routes.login} onClick={toggleMenu}>
          login
        </Link>
        <Link to={routes.register} onClick={toggleMenu}>
          register
        </Link>
        <Link to={routes.dictionary} onClick={toggleMenu}>
          dictionary
        </Link>
        <Link to={routes.settings} onClick={toggleMenu}>
          settings
        </Link>
      </nav>
    </div>
  )
}

export default Nav
