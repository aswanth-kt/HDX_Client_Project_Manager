import React, { useEffect, useState } from 'react'
import axios from "../api/axios";


const Search = ({ setProjects }) => {

  const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);

  useEffect(() => {
    const searchAPI = async () => {
      try {
        const res = await axios.get(
          `/api/project/get-project?name=${query}`
        );

        console.log("search res:", res.data);

        setProjects(res.data.projects);

      } catch (error) {
        console.error(error.response?.data?.message || error)
      }
    };

    const delay = setTimeout(() => {
      if (query) {
        searchAPI();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query, setProjects]);
  
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