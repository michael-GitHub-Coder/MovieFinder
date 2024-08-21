import React from 'react'
import { useState,useEffect } from 'react'

const ShowMovies = () => {

    const [movies,setMovies] = useState([]);

    useEffect(()=>{
        const fectMovies = async () =>{
            const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
            const data = await res.json();
            setMovies(data.results)
        }
        fectMovies();
    },[])
    return (

        <div className="mx-24 mt-12 flex grid grid-cols-7 overflow-hidden">
        {
            movies.map((m) => (
                <img className="h-52 mr-2 object-cover" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
            ))
        }
        </div>
    )
}

export default ShowMovies