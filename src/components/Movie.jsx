import React, { useState, useEffect } from 'react';
import ToggleBnt from './ToggleBnt';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

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
      <div className="h-52 w-32 mr-2 object-cover">
        <img
          className="h-52 hover:transform hover:translate-x-4 hover:translate-y-2 transition-transform duration-300"
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="Card image"
        />
      </div>
    </Link>
  ));

  return (
    <div>
      <Navbar />
      <ToggleBnt title="Trending Movies..." onChange={setChangeValue} />
      <div className="flex mx-24 bg-white shadow-lg overflow-hidden overflow-x-auto">
        {movieData}
      </div>
    </div>
  );
};




const loadPopularMovies = async () => {
  const res = await fetch('https://api.themoviedb.org/3/movie/discover?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa');
  const data = await res.json();
  return data;
};

export { Movie as default, loadPopularMovies };
