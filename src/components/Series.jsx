import React, { useEffect } from 'react'
import { useState } from 'react'
import ToggleBnt from './ToggleBnt';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Series = () => {
   
    const [series,setSeries] = useState([]);
    const [changeValue, setChangeValue] = useState('day'); 
    
    useEffect(()=>{
        const url =
        changeValue === 'day'
        ? 'https://api.themoviedb.org/3/trending/tv/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa'
        : 'https://api.themoviedb.org/3/trending/tv/week?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa';
      

        const fetchdataPopular = async () => {
            
            try {
            const res = await fetch(url);
            const data = await res.json();
            setSeries(data.results)
            } catch (error) {
            console.log('Failed to fetch movies', error);
            }
            
        }
        fetchdataPopular(); 
    },[changeValue])

    const seriesList = series.map((data) => (
        <Link to={`/showInfo/${data.id}`} key={data.id}>
            <div className="h-52 mr-2 object-cover hover:transform hover:translate-x-4 hover:translate-y-2 transition-transform duration-300 relative">
                <img key={data.id} className="h-52 w-full object-cover " src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="Card image" />
                <div className="absolute bottom-7 translate-y-10 bg-white bg-opacity-30 w-full py-1.5">
                    <p className="pl-2  pb-2 text-[11px]  text-black">{data.first_air_date}</p>
                </div>
            </div>
            
        </Link> 
    ))
    
  return (
   <div className="container mx-auto">
        <ToggleBnt title="Trending TV Shows..." onChange={setChangeValue} />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-2 lg:gap-4 bg-white shadow-lg overflow-hidden">
             {seriesList.slice(0,7)}  
        </div>  
        <div className="flex justify-end">
            <Link to="/series"><button className="flex my-5 text-blue-700 font-semibold gap-2 px-4 py-2 hover:rounded-full hover:bg-blue-600 hover:text-white cursor-pointer">See More <FaArrowRight className="mt-1.5" /></button></Link>
        </div>
   </div>
  )
}

export default Series 
