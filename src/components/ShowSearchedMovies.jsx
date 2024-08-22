import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { useLocation } from 'react-router-dom';

const ShowSearchedMovies = ({ moviesProp }) => {

    const location = useLocation();
    const movies = location.state?.movies || [];

    
    const searchedMovielist =  movies.map(m => (
        <div  className="h-68 mb-8 object-cover mr-2 shadow-lg rounded">
            <img key={m.id} className="h-52" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
            <h1 className="p-2 font-bold">{m.title}</h1>
            <p className="pl-2  pb-2">{m.release_date}</p>
    </div>
    ))
   

    return (
        <>  
            <Navbar />
            <div className="mx-24 mt-6 flex grid grid-cols-9 overflow-hidden">
                {movies.length > 0 ? searchedMovielist : "" }
            </div>
        </>
    );
};

export default ShowSearchedMovies;



