import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [pages, setPages] = useState(1);

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {

        if (!searchQuery.trim()) return;

        const movieRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa&query=${encodeURIComponent(searchQuery)}`);
        const movieData = await movieRes.json();

        const tvRes = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa&query=${encodeURIComponent(searchQuery)}`);
        const tvData = await tvRes.json();

        const combinedResults = [...movieData.results, ...tvData.results]; 
        setMovies(combinedResults);
    

        navigate('/search-results', { state: { movies: movieData.results } });

    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <>
            <nav className="bg-blue-700 p-4 fixed w-full top-0 left-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white text-xl font-bold">MF</div>
                    <div className="space-x-4 hidden md:flex">
                        <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                        <Link to="/movies" className="text-white hover:text-gray-400">Movies</Link>
                        <Link to="/series" className="text-white hover:text-gray-400">TV Shows</Link>
                    </div>
                </div>
            </nav>

            <section className="bg-blue-600 mx-4 md:mx-24 text-white flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-24 h-2/3">
                <div className="relative text-center w-full max-w-[54rem]">
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 mt-8 md:mt-12">Welcome.</h1>
                    <div className="relative w-full md:max-w-2xl">
                        <form onSubmit={handleFormSubmit} className="relative">
                            <input
                                className="w-full rounded-full p-3 pl-7 pr-32 text-black focus:outline-none"
                                placeholder="Search for a movie, TV show, series..."
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 rounded-full bg-blue-800 text-white p-3 hover:bg-blue-900"
                                onClick={() => {handleSearch()}}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

// const loadSearch = async () => {
//     const res = await fetch("https://api.themoviedb.org/3/search/keyword?page=1&api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
//     const data = await res.json();
//     return data.results;
// };

export default Navbar 
