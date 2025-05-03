import React from 'react';

const ArticleList = ({ onArticleSelect }) => {
  // Datos de ejemplo para los artículos
  const articles = [
    {
      id: 1,
      title: "Avances en Energía Renovable",
      description: "Últimos desarrollos en tecnología solar y eólica",
      author: "Maria González",
      date: "2025-03-31"
    },
    {
      id: 2,
      title: "Optimización de Yacimientos",
      description: "Técnicas modernas para maximizar la producción",
      author: "Carlos Ruiz",
      date: "2025-03-30"
    },
    {
      id: 3,
      title: "Sostenibilidad en la Industria",
      description: "Prácticas para reducir el impacto ambiental",
      author: "Ana Martínez",
      date: "2025-03-29"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Artículos Destacados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => onArticleSelect(article.id)}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{article.author}</span>
              <span>{article.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;