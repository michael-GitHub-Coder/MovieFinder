import React, { useState } from 'react';

const ToggleBnt = ({title}) => {
  const [selectedOption, setSelectedOption] = useState('today');

  const handleToggle = (option) => {
    setSelectedOption(option);
        // if (onToggle === "today") {
        //     propLink = "https://api.themoviedb.org/3/trending/movie/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa";
        // }else{
        //     propLink = "https://api.themoviedb.org/3/trending/movie/week?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa";
        // }
  };

  return (
    <div className="flex items-center space-x-4 mx-24 my-5">
      <span className="text-md font-bold">{title}</span>
      <div className="bg-gray-500 rounded-full">
        <button
          onClick={() => handleToggle('today')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedOption === 'today' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'
          }`}
          value="https://api.themoviedb.org/3/trending/movie/day?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa"
        >
          Today
        </button>
        <button
          onClick={() => handleToggle('week')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedOption === 'week' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'
          }`}
          value="https://api.themoviedb.org/3/trending/movie/week?api_key=2b53c6ccaff11ee5f7b4bad4655c55fa"
        >
          This Week
        </button>
      </div>
    </div>
  );
};

export default ToggleBnt;
