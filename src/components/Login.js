import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [view, setView] = useState('options');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simulación de login
    if (email && password) {
      onLogin(true);
    }
  };

  const renderOptions = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setView('login')}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Iniciar Sesión
      </button>
      <button 
        onClick={() => setView('register')}
        className="w-full border border-black text-black py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Registrarse
      </button>
      <button 
        onClick={() => setView('plans')}
        className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg hover:bg-blue-50 transition"
      >
        Ver Planes
      </button>
    </div>
  );

  const renderLogin = () => (
    <form onSubmit={handleLoginSubmit} className="space-y-4">
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        required
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        required
      />
      <button 
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Entrar
      </button>
      <button 
        type="button"
        onClick={() => setView('options')}
        className="w-full text-gray-600 py-2 hover:text-black transition"
      >
        Volver
      </button>
    </form>
  );

  const renderRegister = () => (
    <form className="space-y-4">
      <input 
        type="text"
        placeholder="Nombre Completo"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        required
      />
      <input 
        type="email"
        placeholder="Correo Electrónico"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        required
      />
      <input 
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        required
      />
      <button 
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Crear Cuenta
      </button>
      <button 
        type="button"
        onClick={() => setView('options')}
        className="w-full text-gray-600 py-2 hover:text-black transition"
      >
        Volver
      </button>
    </form>
  );

  const renderPlans = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Plan Gratuito</h3>
        <ul className="space-y-2 mb-4">
          <li>✅ Acceso a 3 artículos por mes</li>
          <li>✅ Vista previa de herramientas</li>
          <li>❌ Sin acceso a contenido completo</li>
        </ul>
        <button 
          onClick={() => onLogin(true)}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Comenzar Gratis
        </button>
      </div>

      <div className="bg-black text-white border border-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Plan Profesional</h3>
        <ul className="space-y-2 mb-4">
          <li>✅ Acceso ilimitado a artículos</li>
          <li>✅ Herramientas completas</li>
          <li>✅ Soporte técnico prioritario</li>
          <li>✅ Certificados de participación</li>
        </ul>
        <button 
          onClick={() => {/* Implementar pasarela de pago */}}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Suscribirse - $29.99/mes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {view === 'options' && 'Acceso KnowEnergy'}
          {view === 'login' && 'Iniciar Sesión'}
          {view === 'register' && 'Crear Cuenta'}
          {view === 'plans' && 'Planes de Acceso'}
        </h2>
        
        {view === 'options' && renderOptions()}
        {view === 'login' && renderLogin()}
        {view === 'register' && renderRegister()}
        {view === 'plans' && renderPlans()}
      </div>
    </div>
  );
};

export default Login;

// DONE