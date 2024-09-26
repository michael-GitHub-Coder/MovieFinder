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
      // return movieData.results;
      setselectedData(movieData.results);
     
    }
    geetDat();
  },[])
  const {id} = useParams();
 console.log(selectedData);
 console.log(id)

  return (
    <>
      <Navbar />
      
      <div className="flex flex-row space-x-5 mx-64 my-24">
          
            {
              
              selectedData.map((data) => 
                 data.id == id ? ( 
                <>
                <div className=" w-64 h-80 rounded overflow-hidden shadow-xl">
                  <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='h-full w-full'/>
                </div>
                  <div className="w-5/6 px-6 rounded overflow-hidden ">
                      <div className=" font-bold text-xl text-black">{data.title}</div>
                      <p> {data.release_date}</p>
                      <p className="mt-2 flex flex-row">
                        <FaListAlt className="bg-gray-300 rounded-full text-4xl p-1 mr-2"/>
                        <MdFavoriteBorder className="bg-gray-300 rounded-full text-4xl p-1 mr-2"/>
                      </p>
                  </div>  
                </>
                )
                : null
              )
            }
          </div>
       
    </>
  )
}

export default ShowInfo