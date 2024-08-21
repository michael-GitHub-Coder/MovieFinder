import React from 'react'
import imagee from '../components/Moviefinder logo.png'
import { FaChild } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'

const ShowInfo = () => {

  const movieInfo = useLoaderData();

  console.log(movieInfo)

  return (
    <div className="flex flex-row space-x-5 mx-64 my-24">
         <div className="w-64 h-80 rounded overflow-hidden shadow-xl">
                <img src={imagee} className='h-full w-full'/>
        </div>
        <div className="w-5/6 px-6 rounded overflow-hidden ">
            <div className=" font-bold text-xl">name</div>
            <span><FaChild /></span><p className=" ">name</p>
            
            <div className="mt-8 py-2">
                <button className="text-white mr-12 pl-4 pr-4 p-2 bg-indigo-500 rounded-full">EDIT</button>
                <button className="text-white mr-12 pl-4 pr-4 p-2 bg-indigo-500 rounded-full">DELETE</button>
            </div>
        </div>
    </div>
  )
}

export default ShowInfo