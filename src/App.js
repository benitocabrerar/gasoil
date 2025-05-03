import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Importar useAuth
import { SubscriptionProvider, useSubscription } from './contexts/SubscriptionContext'; // Importar useSubscription
import Header from './components/Header';
import Hero from './components/Hero';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail'; // Importar ArticleDetail
import SpecializedTools from './components/SpecializedTools';
import ToolDetail from './components/ToolDetail'; // Importar ToolDetail
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import SubscriptionPlans from './components/subscription/SubscriptionPlans';
import SubscriptionHistory from './components/subscription/SubscriptionHistory';
import PublishArticle from './components/PublishArticle'; // Importar PublishArticle
import Footer from './components/Footer'; // Importar Footer

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentUser } = useAuth(); // Usar hook de autenticación
  const { isSubscribed } = useSubscription(); // Usar hook de suscripción
  const [selectedTool, setSelectedTool] = useState(null); // Añadir estado para la herramienta seleccionada
  const [selectedArticle, setSelectedArticle] = useState(null); // Añadir estado para el artículo seleccionado
  const handleAuthSuccess = () => setCurrentPage('home');
  const handleToolSelect = (tool) => { // Añadir handler para seleccionar herramienta
    setSelectedTool(tool);
    setCurrentPage('toolDetail');
  };
  const handleArticleSelect = (articleId) => { // Añadir handler para seleccionar artículo
    setSelectedArticle(articleId);
    setCurrentPage('articleDetail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <ArticleList onArticleSelect={handleArticleSelect} />
            <SpecializedTools onToolSelect={handleToolSelect} />
          </>
        );
      case 'login':
        return <Login onSuccess={handleAuthSuccess} />;
      case 'signup':
        return <SignUp onSuccess={handleAuthSuccess} />;
      case 'subscription':
        return <SubscriptionPlans />;
      case 'subscription-history':
        return <SubscriptionHistory />;
      case 'articles':
        return <ArticleList onArticleSelect={handleArticleSelect} />;
      case 'articleDetail': // Añadir caso para articleDetail
        return <ArticleDetail articleId={selectedArticle} />;
      case 'tools':
        return <SpecializedTools onToolSelect={handleToolSelect} />;
      case 'toolDetail': // Añadir caso para toolDetail
        return <ToolDetail tool={selectedTool} />;
      case 'publish':
        // Solo renderizar si el usuario está autenticado y suscrito
        // Renderizar si el usuario está autenticado, independientemente de la suscripción
        return currentUser ? <PublishArticle /> : <Login onSuccess={handleAuthSuccess} />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
      <Footer /> {/* Añadir el Footer aquí */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <AppContent />
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;