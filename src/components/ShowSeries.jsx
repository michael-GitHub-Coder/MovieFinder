import React from 'react'
import { useState,useEffect } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ShowSeries = () => {

    const [movies,setSeries] = useState([]);
    const [pages,setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const location = useLocation();
    const series = location.state?.movies || [];

    useEffect(()=>{
        const fectMovies = async () =>{
            const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
            const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa&page=${currentPage}${genreQuery}`);
            const data = await res.json();
            setPages(data.total_pages)
            setSeries(data.results)
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
            alert(`Enter a number between 1 and ${pages}`);
        }
    }
    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setCurrentPage(1); 
    }
    const movieList =  movies.map((m) => (
        <Link to={`/showInfo/${m.id}`} key={m.id}>
            <div  className="h-52 mb-8 object-cover shadow-lg bg-gray-400 relative">
                <img key={m.id} className="h-52 w-full" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
                {/* <h1 className="p-2 font-bold text-center">{m.original_name}</h1> */}
                <div className="absolute bottom-7 translate-y-10 bg-white bg-opacity-30 w-full py-1.5">
                    <p className="pl-2  pb-2 text-[11px]  text-black">{m.first_air_date}</p>
                </div>
            </div>
        </Link>
    ))
    const seriesSearched = series.map(data => (
        <div  className="h-68 mb-8 object-cover shadow-lg rounded">
            <img key={m.id} className="h-52 w-full" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
            <h1 className="p-2 font-bold text-center">{m.original_name}</h1>
            <p className="pl-2  pb-2 text-center">{m.first_air_date}</p>
        </div>
    ))

    return (

        <>
            <Navbar />
            <div className="hidden lg:block mx-24 mt-6">
                <button onClick={() => handleGenreClick(10759)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Action & Adventure</button>
                <button onClick={() => handleGenreClick(16)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Animation</button>
                <button onClick={() => handleGenreClick(35)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Comedy</button>
                <button onClick={() => handleGenreClick(80)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Crime</button>
                <button onClick={() => handleGenreClick(99)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Documentary</button>
                <button onClick={() => handleGenreClick(10767)} className="bg-blue-700 rounded-full p-2 text-white mr-3">Talk</button>
                <button onClick={() => handleGenreClick(10763)} className="bg-blue-700 rounded-full p-2 text-white">News</button>
            </div>
            <div key={movieList.id} className="lg:max-w-7xl md:gap-2 lg:gap-4 mx-24 mt-12 grid-cols-1 md:grid grid-cols-3 lg:grid-cols-7 overflow-hidden">
                {series.length > 0 ? (
                    seriesSearched
                ): movieList.slice(0, 14) 
                }
            </div>
            <div className="flex justify-center mt-4 mb-10">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <GoArrowLeft className="text-4xl"/>
                </button>
                <form onSubmit={handlePageInputSubmit} className="mx-4">
                    <input
                        type="number"
                        value={inputPage}
                        onChange={handlePageInputChange}
                        placeholder={`Page ${currentPage} of ${pages}`}
                        className="border p-1 w-40 text-center rounded-full"
                    />
                    <button type="submit" className="-ml-6 p-1 rounded-full bg-blue-700 text-white">Go</button>
                </form>
                <button onClick={handleNextPage} disabled={currentPage === pages}>
                    <GoArrowRight className="text-4xl"/>
                </button>
            </div>
        </>

    )
}

export default ShowSeries