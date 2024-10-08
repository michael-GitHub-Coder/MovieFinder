import React, { useState, useCallback } from 'react';

const ToggleBnt = ({ title, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('day');

  const handleToggle = useCallback((option) => {
    setSelectedOption(option);
    onChange(option); 
  }, [onChange]);

  return (
    <div className="flex items-center space-x-4 container mx-auto px-10 my-5">
      <h1 className="lg:text-md font-bold">{title}</h1>
      <div className="flex w-[110px] md:w-[126px] lg:w-auto bg-gray-500 rounded-full ">
        <button onClick={() => handleToggle('day')} className={`px-2 lg:px-4 lg:py-2 rounded-full text-[11px] lg:tex-[15px] transition-colors ${selectedOption === 'day' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'}`}>
          Today
        </button>
        <button onClick={() => handleToggle('week')} className={`px-2 lg:px-8 md:px-4 py-2 text-[11px] lg:tex-[15px] rounded-full transition-colors ${ selectedOption === 'week' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'}`}>
          This Week
        </button>
      </div>
    </div>
  );
};

export default ToggleBnt;
