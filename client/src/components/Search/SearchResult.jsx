import React from 'react'

import "./SearchResult.css";

export const SearchResult = ({ firstname, lastname}) => {
  const handleClick = () => {
    console.log('hello, ninjas')
  }

  return (
    <div className='search-result' onClick={ handleClick }>
      {firstname} {lastname}
    </div>
  );
};
