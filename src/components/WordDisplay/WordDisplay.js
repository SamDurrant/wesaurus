import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledWord = styled.div`
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.text};
`

function WordDisplay({ word, path }) {
  return (
    <Link to={path}>
      <StyledWord className="word">{word}</StyledWord>
    </Link>
  )
}

WordDisplay.propTypes = {
  word: PropTypes.string,
  path: PropTypes.string,
}

export default WordDisplay
