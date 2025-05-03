import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">KnowEnergy</h4>
          <p className="text-gray-400">Plataforma de conocimiento especializado en energía</p>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Navegación</h5>
          <nav className="space-y-2">
            <a href="#" className="text-gray-300 hover:text-white">Artículos</a>
            <a href="#" className="text-gray-300 hover:text-white">Publicar</a>
            <a href="#" className="text-gray-300 hover:text-white">Comunidad</a>
          </nav>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Contacto</h5>
          <p className="text-gray-400">benitocabrera@hotmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Resto de archivos permanecen igual

// DONE