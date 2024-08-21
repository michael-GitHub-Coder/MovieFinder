import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import ToggleBnt from './ToggleBnt';

const Movie = () => {
   
    const [movies,setMovies] = useState([]);
    const popularMovies = useLoaderData();
    
    console.log(popularMovies);

    
    useEffect(()=>{

        const fetchdataPopular = async () => {
            const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=2b53c6ccaff11ee5f7b4bad4655c55fa")
            const data = await res.json();
            setMovies(data.results)
        }
        fetchdataPopular();
        
    },[])

    
  return (
   <div>
        <ToggleBnt title="Trending Movies..."/>
        <div className="flex flex-col-4 mx-24 bg-white shadow-lg  overflow-hidden overflow-x-auto">
             {
                movies.map(data => (
                    <img key={data.id} className="h-52 mr-2 object-cover hover:transform hover:translate-x-4 hover:translate-y-2 transition-transform duration-300" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="Card image" />
                ))
            }
        </div>  
   </div>
  )
}

const loadPopularMovies = async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
    const data = await res.json();
    return data;
}
export {Movie as default, loadPopularMovies}