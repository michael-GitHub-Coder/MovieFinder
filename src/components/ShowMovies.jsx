import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ShowMovies = () => {


    const [movie, setMovies] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const location = useLocation();
    const movies = location.state && location.state.movies ? location.state.movies : [];

    useEffect(() => {
        const fetchMovies = async () => {
            const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa&page=${currentPage}${genreQuery}`);
            const data = await res.json();
            setPages(data.total_pages);
            setMovies(data.results);
        };
        fetchMovies();
    }, [currentPage, selectedGenre]);

    const handleNextPage = () => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageInputChange = (e) => {
        setInputPage(e.target.value);
    };

    const handlePageInputSubmit = (e) => {
        e.preventDefault();
        const page = Number(inputPage);
        if (page >= 1 && page <= pages) {
            setCurrentPage(page);
            setInputPage('');
        } else {
            alert(`Please enter a page number between 1 and ${pages}`);
        }
    };

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setCurrentPage(1);
    };
    const searchedMovielist =  movies.map((m,index) => (
        <Link to={`/showInfo/${m.id}`} key={m.id}>
            <div  className=" h-68 mb-8 object-cover shadow-lg rounded">
                <img key={m.id} className="h-52 w-full" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Card image" />
                <p className="pl-2  pb-2 text-[11px]">{m.release_date}</p>
            </div>
        </Link>
    ));
 
    const movieList = movie.map((m,index) => (
        <Link to={`/showInfo/${m.id}`} key={m.id}>
            <div key={index} className="h-52 w-full mb-8 object-cover shadow-lg bg-gray-400 relative ">
                {/* <div className="h-52 mb-8 object-cover mr-2 rounded"> */}
                    <img className="h-52 w-full" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} />
                    <div className="absolute bottom-7 translate-y-10 bg-white bg-opacity-30 w-full py-1.5">
                        <p className="pl-2  pb-2 text-[11px]  text-black">{m.release_date}</p>
                    </div>
                {/* </div> */}
            </div>
        </Link>
    ));
    

    return (
        <>  
            <Navbar />
            <div className="hidden lg:block container mx-auto mt-6">
                <button onClick={() => handleGenreClick(12)} className=" md:text-[15px] bg-blue-700 rounded-full p-2 text-white mr-3">Adventure</button>
                <button onClick={() => handleGenreClick(14)} className=" md:text-[15px] bg-blue-700 rounded-full p-2 text-white mr-3">Fantasy</button>
                <button onClick={() => handleGenreClick(18)} className=" md:text-[15px] bg-blue-700 rounded-full p-2 text-white mr-3">Drama</button>
                <button onClick={() => handleGenreClick(878)} className=" md:text-[15px] bg-blue-700 rounded-full p-2 text-white mr-3">Science Fiction</button>
                <button onClick={() => handleGenreClick(27)} className=" md:text-[15px] bg-blue-700 rounded-full p-2 text-white mr-3">Horror</button>
                <button onClick={() => handleGenreClick(10749)} className=" md:text-[15px] bg-blue-700 rounded-full p-2 text-white">Romance</button>
            </div>
            <div className="container px-5 mx-auto mt-12 grid-cols-1 grid md:grid-cols-3 lg:grid-cols-7 overflow-hidden md:gap-2 lg:gap-4">
                {movies.length > 0 ? searchedMovielist : movieList.slice(0,14) }
            </div>
            <div className="flex justify-center mt-4 mb-10">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <GoArrowLeft className="text-4xl"/>
                </button>
                <form onSubmit={handlePageInputSubmit} className="mx-4 relative">
                    <input
                        type="number"
                        value={inputPage}
                        onChange={handlePageInputChange}
                        placeholder={`Page ${currentPage} of ${pages}`}
                        className="border p-1 w-40 text-center rounded-full"
                    />
                    <button type="submit" className="absolute right-0.5 p-1 rounded-full bg-blue-700 text-white">Go</button>
                </form>
                <button onClick={handleNextPage} disabled={currentPage === pages}>
                    <GoArrowRight className="text-4xl"/>
                </button>
            </div>
        </>
    );
};

export default ShowMovies;
