import React, { useState, useEffect } from 'react';
import ToggleBnt from './ToggleBnt';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import 'react-slideshow-image/dist/styles.css'

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [changeValue, setChangeValue] = useState('day'); 

  useEffect(() => {
    const fetchdataPopular = async () => {
      const url =
        changeValue === 'day'
          ? 'https://api.themoviedb.org/3/trending/movie/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa'
          : 'https://api.themoviedb.org/3/trending/movie/week?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa';

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.log('Failed to fetch movies', error);
      }
    };

    fetchdataPopular();
  }, [changeValue]); 

  const movieData = movies.map((data) => (
    <Link to={`/showInfo/${data.id}`} key={data.id}>
      <div className="h-52  object-cover hover:transform hover:translate-x-4 hover:translate-y-2 transition-transform duration-300 relative">
        <img
          className="h-52 w-full mb-4 "
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="Card image"
        />
        <div className="absolute bottom-7 translate-y-10 bg-white bg-opacity-30 w-full py-1.5">
          <p className="pl-2  pb-2 text-[11px]  text-black">{data.release_date}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <ToggleBnt title="Trending Movies..." onChange={setChangeValue} />
        <div className="mx-10 md:mx-0 grid grid-cols-1 md:grid-cols-7 md:gap-2 lg:gap-4  bg-white shadow-lg overflow-hidden ">
            {movieData.slice(0,7)}
        </div>
        <div className="flex justify-end px-6 md:px-0">
            <Link to="/movies"><button className="flex cursor-pointer my-5 text-blue-700 font-semibold gap-2 px-4 py-2 hover:rounded-full hover:bg-blue-600 hover:text-white">See More <FaArrowRight className="mt-1.5" /></button></Link>
        </div>
      </div>
    </div>
  );
};




// const loadPopularMovies = async () => {
//   const res = await fetch('https://api.themoviedb.org/3/movie/discover?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa');
//   const data = await res.json();
//   return data;
// };

export default Movie;
