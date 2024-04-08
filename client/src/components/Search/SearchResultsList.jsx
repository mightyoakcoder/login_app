import React from 'react'
import { SearchResult } from './SearchResult';

import "./SearchResultsList.css"

export const SearchResultsList = ({ results }) => {
  return (
    <div className='results-list'>
      {results.map((user) => {
          return <SearchResult 
          firstname={user.firstname}
          lastname={user.lastname} 
          key={user._id}/>
        })}
    </div>
  );
};
