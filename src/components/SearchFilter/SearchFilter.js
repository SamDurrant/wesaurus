import React, { useState, useEffect, createRef } from 'react'
import './SearchFilter.css'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BasicInput from '../BasicInput/BasicInput'

const StyledIcon = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gold};
`

const StyledBackground = styled.div`
  background: ${({ theme }) => theme.body};
`

function SearchFilter({ searchFor }) {
  const [searchValue, setSearchValue] = useState('')
  const [inputClass, setInputClass] = useState('')
  const searchRef = createRef()

  const showSearch = () => {
    setInputClass('slide-right')
  }

  const hideSearch = () => {
    setInputClass('slide-left')
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    searchFor(e.target.value)
  }

  useEffect(() => {
    if (inputClass.includes('slide-right')) {
      const timer = setTimeout(() => {
        searchRef.current.focus()
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [inputClass, searchRef])

  return (
    <>
      <StyledBackground className="search-icon-container">
        <StyledIcon className="search-icon" onClick={showSearch}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </StyledIcon>
      </StyledBackground>
      <StyledBackground className={`search-input ${inputClass}`}>
        <BasicInput
          value={searchValue}
          onChange={handleSearch}
          ref={searchRef}
          placeholder="search"
          className={`input-variation-1 ${inputClass + '-input'}`}
          onBlur={hideSearch}
        />
      </StyledBackground>
    </>
  )
}

export default SearchFilter
