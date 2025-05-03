import React from 'react';
import { AvatarIcon, EnergyIcon } from './Icons';

const ArticleCard = ({ title, author, specialty, readTime, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer transform hover:scale-105 active:scale-95"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 flex items-center">
            <EnergyIcon className="w-4 h-4 mr-2" />
            {specialty}
          </p>
        </div>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
          {readTime} min
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <AvatarIcon className="w-10 h-10 rounded-full border-2 border-white" />
        <span className="text-gray-700 text-sm">{author}</span>
      </div>
    </div>
  );
};

export default ArticleCard;