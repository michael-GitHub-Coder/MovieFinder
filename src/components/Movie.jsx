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
            const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
            const data = await res.json();
            setMovies(data.results)
        }
        fetchdataPopular();
        
    },[])

    
  return (
   <div>
        <ToggleBnt />
        <div className="flex flex-col-4 mx-24 bg-white shadow-lg  overflow-hidden overflow-x-auto">
             {
                movies.map(data => (
                    <img key={data.id} className="h-52 mr-2 object-cover hover:transform hover:translate-x-4 hover:translate-y-2 transition-transform duration-300" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="Card image" />
                ))
            }
        </div>
        {/* <div className="flex flex-col-4 mx-24 bg-white shadow-lg overflow-hidden overflow-x-auto">
        {movies.map(data => (
        <div key={data.id} className="relative group h-64 w-48 overflow-hidden">
        <img
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-4 text-white">
            <h3 className="text-lg font-bold">{data.title}</h3>
            <p className="text-sm">{data.overview.substring(0, 50)}...</p>
            </div>
        </div>
        </div>
  ))}
</div> */}
       
   </div>
  )
}

const loadPopularMovies = async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
    const data = await res.json();
    return data;
}
export {Movie as default, loadPopularMovies}