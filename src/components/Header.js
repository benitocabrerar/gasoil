import React, { useState } from 'react';
import { LogoIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const MenuButton = ({ children, onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`text-gray-600 hover:text-gray-900 transition ${className}`}
  >
    {children}
  </button>
);

const Header = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { isSubscribed } = useSubscription();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate('home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <LogoIcon className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">OM3</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <MenuButton onClick={() => onNavigate('articles')}>
              Artículos
            </MenuButton>
            <MenuButton onClick={() => onNavigate('tools')}>
              Herramientas
            </MenuButton>

            {currentUser ? (
              <div className="relative">
                <MenuButton onClick={() => setShowMenu(!showMenu)}>
                  {currentUser.email}
                </MenuButton>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-1">
                    <button
                      onClick={() => {
                        onNavigate(isSubscribed ? 'subscription-history' : 'subscription');
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {isSubscribed ? 'Mi Suscripción' : 'Suscribirse'}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('publish');
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Publicar
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 border border-black rounded hover:bg-gray-100"
                >
                  Ingresar
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Crear Cuenta
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
