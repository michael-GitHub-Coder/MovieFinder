import React, { useEffect, useState } from 'react'
import { FaChild, FaListAlt } from 'react-icons/fa'
import { useLoaderData, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { MdFavoriteBorder } from 'react-icons/md'


const ShowInfo = () => {

  const [selectedData, setselectedData] = useState([]);
  //const selectedData = useLoaderData();

  useEffect(()=>{
    const  geetDat = async () =>{
      const movieRes = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const movieData = await movieRes.json();

      const seriesres = await fetch("https://api.themoviedb.org/3/discover/tv?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const seriesData = await seriesres.json();

      const seriesDay = await fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const seriesDayData = await seriesDay.json();

      const movieDay = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const movieDayData = await movieDay.json();

      

      const MovieSeries = [...movieData.results,...seriesData.results,...seriesDayData.results,...movieDayData.results];
      setselectedData(MovieSeries);
     
    }
    geetDat();
  },[])
  const {id} = useParams();
 console.log(selectedData);
 console.log(id)

 const hh = 
  selectedData.map((data) => 
     data.id == id ? ( 
    <>
    <div className="w-64 h-80 rounded overflow-hidden shadow-xl">
      <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='h-full w-full'/>
    </div>
      <div className="w-5/6 px-6 rounded overflow-hidden ">
        <div className="flex gap-2 text-xl">
          {console.log(data.title)}
          <p className=" font-semibold  text-black ">{data.title == "undefined" ? "Movie Title" : data.title }</p>
          {/* <p className=" text-gray-400">{"("+data.release_date != "Undefined" || data.first_air_date != "Undefined"  ? data.release_date.substring(0,4) : data.first_air_date.substring(0,4) + ")"}</p> */}
        </div>
        <div>
        <div className="flex gap-4 items-center">
          <div className="bg-white h-10 w-10 rounded-full mt-4 border-l-2  border-b-2 border-black text-[10px] text-center py-2.5 font-bold text-gray-400">
          {data.vote_average}
          </div>
          <h1 className="text-gray-600  text-[15px] mt-3">Score</h1>
        
        </div>
        {/* <div className="flex gap-2">
          <h1 className=" font-semibold  text-black ">Score :</h1>
            <p className="text-[15px]  text-gray-600 mt-0.5"></p>
        </div> */}
        </div>
        <h1 className=" font-semibold mt-4 text-black ">Overview</h1>
        <p className="text-[15px]  text-gray-600 mt-2">{data.overview}</p>
        
          {/* <p className="mt-2 flex flex-row">
            <FaListAlt className="bg-gray-300 rounded-full text-4xl p-1 mr-2"/>
            <MdFavoriteBorder className="bg-gray-300 rounded-full text-4xl p-1 mr-2"/>
          </p> */}
      </div>  
    </>
    )
    : null
  )

  return (
    <>
      <Navbar />
      
      <div className="grid grid-cols-1 md:flex flex-row space-x-5 md:mx-12 md:py-5 lg:mx-64 lg:my-24">
        {hh.slice(0,2)}
      </div>
       
    </>
  )
}

export default ShowInfo