import { useState,useEffect } from 'react'

import { useDebounce } from 'react-use';
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './appwrite';
// import { account,ID } from './lib/appwrite';

const BASE_URL = 'https://api.themoviedb.org/3'; 

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method:'GET',
  headers:{
    accept:'application/json', 
    Authorization: `Bearer ${API_KEY}`
  }
}



function App() {
const [errorMessage, setErrorMessage] = useState("")
const [searchTerm, setSearchTerm] = useState("")

const [isLoading, setIsLoading] = useState(false)
const [movieList, setMovieList] = useState([])
const [debounceSearchTerm, setdebounceSearchTerm] = useState("")
const [trendingMovies, setTrendingMovies] = useState([])



const fetchMovies = async(query='')=>{
  setIsLoading(true);
  setErrorMessage('')
  try{
    
    const endpoint = query
    ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    
    : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
    const response = await fetch(endpoint, API_OPTIONS)
    

    if(!response.ok){
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json()
    

 if (data.Response === 'false'){
      setErrorMessage(data.Error || 'failed to fetch movies')
      setMovieList([])
      return; 
    }

    setMovieList(data.results || [])

    if(query && data.results.length > 0){
      await updateSearchCount(query, data.results[0])
    }

   
  }catch(err){
    console.error(`Error fetching movies: ${err}`);
    
    setErrorMessage("Error fetching moves. Please try again later.")
    
  }finally{
    setIsLoading(false)
  }
}
const loadTrendingMovies = async()=>{
  try{
    const  movies = await getTrendingMovies()

    setTrendingMovies(movies)

  }catch(err){
    console.log(err)
  }
}
useDebounce(()=>setdebounceSearchTerm(searchTerm),500,[searchTerm])

useEffect(()=>{
  fetchMovies(debounceSearchTerm)

 

},[debounceSearchTerm])

useEffect(()=>{
loadTrendingMovies()
},[])
  return (
    <main>
      <div className='pattern'/>

      <div className="wrapper min-h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/hero-bg.png')" }}>


       <img src="/hero.png" alt="" style={{height:'300px', width:'400px'}} className='mx-auto'/>   
      <header className="p-10 text-white">
        <h1 className="text-4xl font-bold">Find <span className='text-gradient'>Movies</span> You'll enjoy</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>


      {trendingMovies.length > 0 &&(
        <section className='trending'>
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie,index)=>(
              <li key={movie.$id}>
                <p>{index +1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className='all-movies'>
      <h2>ALL MOVIES</h2>
      {
        isLoading? (
          <Spinner />
        
        ): errorMessage?(
        <p className='text-red-500'>{errorMessage}</p>
        ):(
          <ul>
            {movieList.map((movie)=>(
             <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
        )
      }
  </section>

    </div>
      
    </main>
  )
}

export default App
