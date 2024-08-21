import React from 'react'
import { useState,useEffect } from 'react';
import { useParams,useLoaderData } from 'react-router-dom';

const Trailers = () => {

  const [movieTrailers, setTrailers] = useState([]);
  const [popIDs,setPOPIDs] = useState([]);

  const popularMovies = useLoaderData();

  popularMovies.map(popData => (
    setPOPIDs(popData.id)
  ))

  useEffect(()=>{

    const fectTrailers = async () => {

        const res = await fetch("https://api.themoviedb.org/3/movie/718821/videos?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
        const data = await res.json();
        setTrailers(data)
    }
    fectTrailers();
  },[])

  console.log(movieTrailers);
  console.log(popIDs);
  return (
    <>
    </>
  )
}

export default Trailers