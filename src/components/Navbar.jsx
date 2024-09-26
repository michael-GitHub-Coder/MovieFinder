import React, { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';

const Navbar = () => {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
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

        navigate('/search-results', { state: { movies: combinedResults } });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    const openMenu = () => {
        setMenuOpen(!menuOpen); 
    };

    return (
        <>
            <nav className="bg-blue-700 p-4 fixed w-full top-0 left-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white text-xl font-bold">MF</div>
                    <div className="">
                        <div className="relative w-full max-w-2xl md:hidden">
                            <form onSubmit={handleFormSubmit} className="relative">
                                <input
                                    className="w-full rounded-full p-1.5 md:p-3 pr-7  md:pr-34 text-black text-[15px] focus:outline-none"
                                    placeholder="Search for a movie, TV show, series..."
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                />
                                <button
                                    type="submit"
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-1.5 rounded-full bg-blue-800 text-white p-1.5 md:p-3 hover:bg-blue-900"
                                    onClick={() => {handleSearch()}}
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="space-x-4 hidden md:flex">
                        <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                        <Link to="/movies" className="text-white hover:text-gray-400">Movies</Link>
                        <Link to="/series" className="text-white hover:text-gray-400">TV Shows</Link>
                    </div>
                    <button onClick={openMenu} className="text-white md:hidden px-5">{menuOpen ?  <FaTimes className="text-2xl" /> : <CiMenuBurger className="text-2xl"/> }</button>
                </div>
                {menuOpen && (
                    <div className="md:hidden flex flex-col space-y-4 p-4 bg-blue-800">
                        <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                        <Link to="/movies" className="text-white hover:text-gray-400">Movies</Link>
                        <Link to="/series" className="text-white hover:text-gray-400">TV Shows</Link>
                    </div>
                )}
            </nav>

            <section className="container md:mx-auto bg-blue-600 lg:max-w-7xl text-white flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-24 h-2/3">
                <div className="hidden md:block md:relative md:text-center w-full max-w-[54rem]">
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 mt-8 md:mt-12">Welcome.</h1>
                    <div className="relative w-full md:max-w-2xl">
                        <form onSubmit={handleFormSubmit} className="relative">
                            <input
                                className="w-full rounded-full p-1.5 md:p-3 pl-7  md:pr-34 text-black text-[15px] focus:outline-none"
                                placeholder="Search for a movie, TV show, series..."
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-1.5 rounded-full bg-blue-800 text-white p-1.5 md:p-3 hover:bg-blue-900"
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

// const selected = async () => {
//     const movieRes = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
//     const movieData = await movieRes.json();
//     return movieData.results;
// };

// export { Navbar as default, selected };
export default Navbar
