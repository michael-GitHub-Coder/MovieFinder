import React from 'react'
import { useState,useEffect } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ShowMovies = () => {

    const [movies,setMovies] = useState([]);
    const [pages,setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(()=>{
        const fectMovies = async () =>{
            const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa&page=${currentPage}${genreQuery}`);
            const data = await res.json();
            setPages(data.total_pages)
            setMovies(data.results)
        }
        fectMovies();
    },[currentPage, selectedGenre])

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

    const handlePageInputChange = (e) => {
        setInputPage(e.target.value);
    }

    const handlePageInputSubmit = (e) => {
        e.preventDefault();
        const page = Number(inputPage);
        if (page >= 1 && page <= pages) {
            setCurrentPage(page);
            setInputPage('');
        } else {
            alert(`Please enter a page number between 1 and ${pages}`);
        }
    }
    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setCurrentPage(1); 
    }
    const movieList =  movies.map((m) => (
        <img className="h-52 mb-8 object-cover" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
    ))

    return (

        <>
            <div className="mx-24 mt-6">
                <button onClick={() => handleGenreClick(12)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Adventure</button>
                <button onClick={() => handleGenreClick(14)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Fantasy</button>
                <button onClick={() => handleGenreClick(18)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Drama</button>
                <button onClick={() => handleGenreClick(878)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Science Fiction</button>
                <button onClick={() => handleGenreClick(27)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Horror</button>
                <button onClick={() => handleGenreClick(10749)} className="bg-blue-700 rounded-full p-2 text-white">Romance</button>
            </div>
            <div key={movieList.id} className="mx-24 mt-6 flex grid grid-cols-9 overflow-hidden">
                {movieList.slice(0,18) }
            </div>
            <div className="flex justify-center mt-4 mb-10">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <GoArrowLeft className="text-4xl"/>
                </button>
                {/* <span className="mx-4">Page {currentPage} of {pages}</span> */}
                <form onSubmit={handlePageInputSubmit} className="mx-4">
                    <input
                        type="number"
                        value={inputPage}
                        onChange={handlePageInputChange}
                        placeholder={`Page ${currentPage} of ${pages}`}
                        className="border p-1 w-40 text-center rounded-full"
                    />
                    <button type="submit" className="ml-2 p-1 rounded-full bg-blue-700 text-white">Go</button>
                </form>
                <button onClick={handleNextPage} disabled={currentPage === pages}>
                    <GoArrowRight className="text-4xl"/>
                </button>
            </div>
        </>

    )
}

export default ShowMovies