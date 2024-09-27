import React, { useState, useCallback } from 'react';

const ToggleBnt = ({ title, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('day');

  const handleToggle = useCallback((option) => {
    setSelectedOption(option);
    onChange(option); 
  }, [onChange]);

  return (
    <div className="flex items-center space-x-4 mx-24 my-5">
      <span className="lg:text-md font-bold">{title}</span>
      <div className="md:flex bg-gray-500 rounded-full hidden ">
        <button onClick={() => handleToggle('day')} className={`px-2 lg:px-4 lg:py-2 rounded-full text-[11px] lg:tex-[15px] transition-colors ${selectedOption === 'day' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'}`}>
          Today
        </button>
        <button onClick={() => handleToggle('week')} className={`px-2 lg:px-8 md:px-4 py-2 text-[11px] lg:tex-[15px] rounded-full transition-colors ${ selectedOption === 'week' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'}`}>
          This Week
        </button>
      </div>
      <div className="flex gap-4 md:hidden">
        <div className="flex gap-2">
          <h1 className="font-semibold">Today</h1>
          <input type="checkbox" className="rounded-full w-5 h-5 mt-1"/>
        </div>
        <div className="flex gap-2">
          <h1 className="font-semibold">This Week</h1>
          <input type="checkbox" className="rounded-full w-5 h-5 mt-1"/>
        </div>
      </div>
    </div>
  );
};

export default ToggleBnt;
