import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { MdFavoriteBorder } from 'react-icons/md';

const ShowInfo = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [bgImage, setBgImage] = useState(""); // Use useState instead of useRef
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const movieRes = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const movieData = await movieRes.json();

      const seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const seriesData = await seriesRes.json();

      const seriesDay = await fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const seriesDayData = await seriesDay.json();

      const movieDay = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa");
      const movieDayData = await movieDay.json();

      const MovieSeries = [...movieData.results, ...seriesData.results, ...seriesDayData.results, ...movieDayData.results];
      
      const seenIds = new Set();
      const uniqueMovieSeries = MovieSeries.filter((item) => {
        if (seenIds.has(item.id)) {
          return false; 
        }
        seenIds.add(item.id); 
        return true; 
      });
      setSelectedData(uniqueMovieSeries);
    };
    getData();
  }, []);

  useEffect(() => {
    // Set the background image when the relevant data is found
    const foundData = selectedData.find(data => data.id == id);
    if (foundData) {
      setBgImage(`https://image.tmdb.org/t/p/w500${foundData.backdrop_path}`);
    }
  }, [selectedData, id]); // Dependency array to trigger this effect when selectedData or id changes

  // style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: "center",backgroundRepeat: "no-repeat",backgroundSize: "cover" }}
  return (
    <>
      <Navbar />
      <div  className="grid grid-cols-1 md:flex flex-row md:space-x-5 mx-5 md:mx-12 md:py-5 lg:mx-64 my-10 md:my-24">
        {
          selectedData.map((data) => 
            data.id == id ? ( 
              <div key={data.id} className="md:flex flex-row">
                <div className="md:w-64 w-full h-80 rounded overflow-hidden shadow-xl">
                  <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='h-full w-full' alt={data.title} />
                </div>
                <div className="w-5/6 md:px-6 rounded overflow-hidden ">
                  <div className="flex gap-2 text-xl mt-5">
                    <p className="font-semibold text-black">{data.title || "Movie Title"}</p>
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      <div className="bg-white h-10 w-10 rounded-full mt-4 border-l-2 border-b-2 border-black text-[10px] text-center py-2.5 font-bold text-gray-400">
                        {data.vote_average}
                      </div>
                      <h1 className="text-gray-600 text-[15px] mt-3">Score</h1>
                    </div>
                  </div>
                  <h1 className="font-semibold mt-4 text-black">Overview</h1>
                  <p className="text-[15px] text-gray-600 mt-2">{data.overview}</p>
                </div>
              </div>
            ) : null
          )       
        }
      </div>
    </>
  );
};

export default ShowInfo;
