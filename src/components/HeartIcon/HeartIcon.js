import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HeartIcon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons'

export default function HeartIcon({ handleClick }) {
  const [heart, setHeart] = useState(heartOutline)

  return (
    <FontAwesomeIcon
      className="heart-icon"
      onMouseEnter={() => setHeart(heartSolid)}
      onMouseLeave={() => setHeart(heartOutline)}
      onClick={handleClick}
      icon={heart}
    />
  )
}

HeartIcon.propTypes = {
  handleClick: PropTypes.func,
}
