import React, { useState, useCallback } from 'react';

const ToggleBnt = ({ title, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('day');

  const handleToggle = useCallback((option) => {
    setSelectedOption(option);
    onChange(option); 
  }, [onChange]);

  return (
    <div className="flex items-center space-x-4 mx-24 my-5">
      <span className="text-md font-bold">{title}</span>
      <div className="flex bg-gray-500 rounded-full">
        <button
          onClick={() => handleToggle('day')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedOption === 'day' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => handleToggle('week')}
          className={`px-8 md:px-4 py-2 rounded-full transition-colors ${
            selectedOption === 'week' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          This Week
        </button>
      </div>
    </div>
  );
};

export default ToggleBnt;
