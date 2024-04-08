import React, { useState } from 'react'

import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({ handleSearch }) => {
  const [input, setInput] = useState("")

  const handleChange = (value) => {
    setInput(value)
    handleSearch(value)
  }

  return (
    <div className='input-wrapper'>
      <div className='search-icon-wrapper'>
        <FaSearch id='search-icon'/>
      </div>
      <div className='inpt-field-wrapper'>
        <input 
          placeholder='Search for a friend...' 
          value={input} 
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
