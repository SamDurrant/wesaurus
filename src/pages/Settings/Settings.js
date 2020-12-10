import React, { useContext } from 'react'
import './Settings.css'
import useUserSettings from '../../hooks/useUserSettings'
import { MainContext } from '../../contexts/MainContext'

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import SettingsApiService from '../../services/settings-api-service'

function Settings() {
  const { toggleTheme } = useUserSettings()
  const { state, dispatch } = useContext(MainContext)

  const handleThemeToggle = async (e) => {
    dispatch({ type: 'set-error', payload: null })
    try {
      let dark_mode = e.target.checked ? true : false
      await SettingsApiService.updateSettings(dark_mode)
      toggleTheme()
    } catch (error) {
      dispatch({ type: 'set-error', payload: error })
    }
  }

  return (
    <section className="section">
      <div className="button-cover">
        <div className="button" id="button-toggle" tabIndex={0}>
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleThemeToggle}
            checked={state.settings.theme === 'dark'}
          />
          <div className="knob knob-light">
            <FontAwesomeIcon icon={faSun} />
          </div>
          <div className="knob knob-dark">
            <FontAwesomeIcon icon={faMoon} />
          </div>
          <div className="layer" />
        </div>
      </div>
    </section>
  )
}

export default Settings
