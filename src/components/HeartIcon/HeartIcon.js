import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HeartIcon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons'
import { useEffect } from 'react'

export default function HeartIcon({ handleClick, liked = false }) {
  const [heart, setHeart] = useState(false)

  useEffect(() => {
    setHeart(liked)
  }, [liked])

  return (
    <FontAwesomeIcon
      className="heart-icon"
      onMouseEnter={() => setHeart(heartSolid)}
      onMouseLeave={() => setHeart(liked)}
      onClick={handleClick}
      icon={heart ? heartSolid : heartOutline}
    />
  )
}

HeartIcon.propTypes = {
  handleClick: PropTypes.func,
}
