import React from 'react'
import { FaChild, FaListAlt } from 'react-icons/fa'
import { useLoaderData, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { MdFavoriteBorder } from 'react-icons/md'


const ShowInfo = () => {

  const selectedData = useLoaderData();
  const {id} = useParams()
 
  return (
    <>
      <Navbar />
      <div className="flex flex-row space-x-5 mx-64 my-24">
          <div className="w-64 h-80 rounded overflow-hidden shadow-xl">
            {
              selectedData.map(data => (
                 data.id === id ? 
                <>
                  <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='h-full w-full'/>
                </>
                : null
              ))
            }
          </div>
          <div className="w-5/6 px-6 rounded overflow-hidden ">
                <div className=" font-bold text-xl">name</div>
                <p> PG Date category duration</p>
                <p className="mt-2 flex flex-row">
                  <FaListAlt className="bg-gray-300 rounded-full text-4xl p-1 mr-2"/>
                  <MdFavoriteBorder className="bg-gray-300 rounded-full text-4xl p-1 mr-2"/>
                </p>
            </div>   
       </div>
    </>
  )
}

export default ShowInfo