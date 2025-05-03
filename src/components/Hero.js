import React from 'react';
import { OilPlatformIcon, BackgroundPattern } from './Icons';

const Hero = ({ onNavigate }) => {
  return (
    <div className="relative h-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <BackgroundPattern className="absolute inset-0 opacity-10 z-0" />
      <div className="relative z-10">
        <OilPlatformIcon className="mx-auto mb-6 w-32 h-32 text-gray-700" />
        <h2 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl">
          Conocimiento Especializado en Energía
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Comparte, aprende y conecta con los mejores expertos en petróleo, gas y energía.
        </p>
        <div className="flex space-x-4 justify-center">
          <button 
            onClick={() => onNavigate('articles')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition transform hover:scale-105 active:scale-95"
          >
            Explorar Contenido
          </button>
          <button 
            onClick={() => onNavigate('publish')}
            className="border border-black text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 active:scale-95"
          >
            Publicar Artículo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// Resto de archivos permanecen igual

// DONE