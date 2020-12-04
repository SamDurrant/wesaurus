import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HeartIcon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons'

export default function HeartIcon({ handleClick }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <FontAwesomeIcon
      className="heart-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      icon={isHovered ? heartSolid : heartOutline}
    />
  )
}

HeartIcon.propTypes = {
  handleClick: PropTypes.func,
}
