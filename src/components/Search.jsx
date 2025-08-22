import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search relative w-full max-w-md'>
        <img src="search.svg" alt="search" 
        className='absolute left-5 top-6 transform -translate-y-0.5 w-5 h-5 text-gray-400'
        />
    <input 
    type="text" 
    placeholder='search through thousands of movies'
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}
    />
    </div>
  )
}

export default Search
