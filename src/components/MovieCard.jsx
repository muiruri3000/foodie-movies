import React from 'react'

const MovieCard = ({movie:{title, vote_average, poster_path, release_date, original_language}}) => {
  return (
    <div className='movie-card'>
   <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} alt={title} />
   <div className='mt-4 text-white pl-2'>
    <h3>{title}</h3>

    <div className='content'>
    <div className='rating'>
    <img src="star.svg" className='inline' alt="star icon" style={{width:'20px', height:'20px'}}/>
    <p className='inline pl-2'>{vote_average? vote_average.toFixed(1) : 'N/A'} </p>
   
     <span className='pr-1 pl-1'>•</span>
    <p className='lang inline pr-1 pl-1'>{original_language}</p>
    <span>•</span>
    <p className='year inline pr-1 pl-1'>
        {release_date? release_date.split('-')[0]:'N/A'}
    </p>
    </div>

  
    </div>
   </div>
    </div>
  )
}

export default MovieCard
