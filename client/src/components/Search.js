import React, { useState } from "react";
import { SearchBar } from "./Search/SearchBar";
import { SearchResultsList } from "./Search/SearchResultsList";

import styles from '../styles/Search.module.css'

function Search() {

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setResults([]);
    } else {
      fetchData(query);
    }  
  };

  const fetchData = (value) => {
    fetch("https://us-central1.gcp.data.mongodb-api.com/app/application-0-kynjp/endpoint/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          const match =
            user &&
            (user.firstname.toLowerCase().includes(value.toLowerCase()) ||
             user.lastname.toLowerCase().includes(value.toLowerCase()) ||
             user.username.toLowerCase().includes(value.toLowerCase()));

          return match;
        });

        setResults(results);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setResults([]);
      });
  };
  
  return (
     <div className='container mx-auto'>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "40%", paddingTop: "1em"}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Search</h4>
            <SearchBar handleSearch={handleSearch}/>
            {searchQuery.trim() !== '' && <SearchResultsList results={results} />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Search;