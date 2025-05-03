import React, { useState } from 'react';

const PublishArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Artículo preparado para publicación');
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Publicar Nuevo Artículo
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del Artículo"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu artículo aquí..."
          rows="10"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
        <button 
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition transform hover:scale-105 active:scale-95"
        >
          Publicar Artículo
        </button>
      </form>
    </div>
  );
};

export default PublishArticle;

// DONE