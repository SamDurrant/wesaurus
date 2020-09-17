import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import routes from '../../utilities/routes'

const StyledWord = styled.div`
  background: ${({ theme }) => theme.opal};
  color: ${({ theme }) => theme.text};
`

function WordDisplay(props) {
  return (
    <Link to={`${routes.word}/${props.id}`}>
      <StyledWord className="word">{props.word}</StyledWord>
    </Link>
  )
}

export default WordDisplay
