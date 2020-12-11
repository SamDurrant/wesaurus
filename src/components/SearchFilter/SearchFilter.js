import React, { useState } from 'react'
import './SearchFilter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel'

function SearchFilter({ searchFor }) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    searchFor(e.target.value)
  }

  return (
    <div className="search-filter">
      <InputWithLabel
        id="search"
        value={searchValue}
        type="text"
        name="search"
        placeholderText="search"
        onInputChange={handleSearch}
        inputMargin=".3rem auto"
        hideLabel
        required
      />
      <button className="icon-round icon-light">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}

export default SearchFilter
