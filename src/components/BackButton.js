import React from 'react';

const BackButton = ({ onReturn }) => {
  return (
    <button 
      onClick={onReturn}
      className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-100 transition transform hover:scale-110 active:scale-95"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-gray-700"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
    </button>
  );
};

export default BackButton;