import React, { useState, createRef } from 'react'
import './SearchFilter.css'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BasicInput from '../BasicInput/BasicInput'

const StyledIcon = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gold};
`

function SearchFilter() {
  const [inputClasses, setInputClasses] = useState('search-input')
  const searchRef = createRef()

  const showSearch = () => {
    setInputClasses('search-input slide-right')
    searchRef.current.focus()
  }

  const hideSearch = () => {
    setInputClasses('search-input slide-left')
  }

  return (
    <>
      <StyledIcon className="search-icon" onClick={showSearch}>
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </StyledIcon>
      <div className={inputClasses}>
        <BasicInput
          ref={searchRef}
          placeholder="search"
          className="input-variation-1"
          onBlur={hideSearch}
        />
      </div>
    </>
  )
}

export default SearchFilter
