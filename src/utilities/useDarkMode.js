import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light')
  const [mountedComponent, setMountedComponent] = useState(false)

  const setMode = (mode) => {
    // sets color mode in local storage
    window.localStorage.setItem('theme', mode)
    // then sets local state
    setTheme(mode)
  }

  const themeToggler = () => {
    // switches the theme to the opposite
    console.log(theme)
    theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    // retrieves color mode from local storage
    const localTheme = window.localStorage.getItem('theme')
    // sets the theme to the color mode, if found in local storage
    localTheme && setTheme(localTheme)

    // component mounts once, sets variable to true
    setMountedComponent(true)
  }, [])

  return [theme, themeToggler, mountedComponent]
}
