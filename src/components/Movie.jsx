import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

const Movie = () => {
   
    const [movies,setMovies] = useState([]);
    const popularMovies = useLoaderData();
    console.log(popularMovies);

    
    useEffect(()=>{

        const fetchdata = async () => {
            const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
            const data = await res.json();
            setMovies(data.results)
        }
        fetchdata();
        
    },[])

    
  return (
   <div>
        <div class="flex flex-col-4 mx-24 bg-white shadow-lg  overflow-hidden">
             {
                movies.map(data => (
                    <img className="h-48 object-cover hover:transform hover:translate-x-4 hover:translate-y-2 transition-transform duration-300" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="Card image" />
                ))
            }
            <div class="p-6">
                <h2 class="text-xl font-bold text-gray-800">Card Title</h2>
            </div>
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