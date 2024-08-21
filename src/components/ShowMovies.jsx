import React from 'react'
import { useState,useEffect } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ShowMovies = () => {

    const [movies,setMovies] = useState([]);
    const [pages,setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        const fectMovies = async () =>{
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa&page=${currentPage}`);
            const data = await res.json();
            setPages(data.total_pages)
            setMovies(data.results)
        }
        fectMovies();
    },[currentPage])

    const handleNextPage = () => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const movieList =  movies.map((m) => (
        <img className="h-52 mb-8 object-cover" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
    ))

    return (

        <>
            <div className="mx-24 mt-12 flex grid grid-cols-9 overflow-hidden">
                {movieList.slice(0,18) }
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <GoArrowLeft />
                </button>
                <span className="mx-4">Page {currentPage} of {pages}</span>
                <button onClick={handleNextPage} disabled={currentPage === pages}>
                    <GoArrowRight />
                </button>
            </div>
        </>

    )
}

export default ShowMovies