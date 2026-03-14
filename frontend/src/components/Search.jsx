import React, { useEffect, useState } from 'react'

const Search = ({ setOnSearch }) => {

  const [query, setQuery] = useState("");

  useEffect(() => {

    const delay = setTimeout(() => {
      setOnSearch(query);
    }, 500);

    return () => clearTimeout(delay);

  }, [query, setOnSearch]);
  
  return (
    <input type="text"
      placeholder='Search here...'
      className='border p-2 mb-4 w-full md:w-64'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      />
  )
}

export default Search