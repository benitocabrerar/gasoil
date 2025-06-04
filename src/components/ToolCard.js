import React from 'react';

const ToolCard = ({ name, description, category, complexity, icon, onSelect }) => {
  const complexityColors = {
    'Básico': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-yellow-100 text-yellow-800',
    'Avanzado': 'bg-red-100 text-red-800'
  };

  return (
    <div
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer transform hover:scale-105 active:scale-95 h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition">
            {name}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${complexityColors[complexity]}`}>
          {complexity}
        </span>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-500">{category}</span>
        <button className="text-black hover:text-gray-700 transition text-sm font-medium">
          Más Información
        </button>
      </div>
    </div>
  );
};

export default ToolCard;

