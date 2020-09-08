import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../utilities/animations/slide-and-appear.css'
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
        <Link
          to={routes.explore}
          className={`word-link ${menuOpen && 'hidden'}`}
        >
          explore
        </Link>
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
