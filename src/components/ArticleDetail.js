import React, { useState } from 'react';
import { AvatarIcon } from './Icons';
import { useSubscription } from '../contexts/SubscriptionContext';

const ArticleDetail = ({ articleId }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { hasActiveSubscription } = useSubscription();

  const article = {
    id: articleId,
    title: "Avances en Energía Renovable",
    content: "La industria energética está experimentando una transformación significativa con el avance de las tecnologías renovables.\n\nLos últimos desarrollos en energía solar y eólica han demostrado mejoras sustanciales en eficiencia y costos.\n\nLas innovaciones incluyen:\n- Paneles solares de mayor eficiencia\n- Nuevos diseños de turbinas eólicas\n- Sistemas de almacenamiento mejorados\n- Integración de redes inteligentes",
    author: "Maria González",
    authorRole: "Investigadora Senior en Energías Renovables",
    date: "31 de marzo, 2025",
    readTime: "5 minutos"
  };

  const handleCopyLink = () => {
    if (!hasActiveSubscription) {
      alert('Necesitas una suscripción activa para compartir artículos');
      return;
    }
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copiado al portapapeles');
    setShowShareMenu(false);
  };

  const handleShareSocial = (platform) => {
    if (!hasActiveSubscription) {
      alert('Necesitas una suscripción activa para compartir artículos');
      return;
    }
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title} - ${article.author}`);
    let shareUrl;

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleShareEmail = () => {
    if (!hasActiveSubscription) {
      alert('Necesitas una suscripción activa para compartir artículos');
      return;
    }
    const subject = encodeURIComponent(article.title);
    const body = encodeURIComponent(`${article.title}\n\nPor: ${article.author}\n\nLeer más: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowShareMenu(false);
  };

  const handleSavePDF = () => {
    if (!hasActiveSubscription) {
      alert('Necesitas una suscripción activa para guardar artículos en PDF');
      return;
    }
    window.print();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-lg mx-auto print:max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 print:text-3xl">{article.title}</h1>
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-shrink-0 print:hidden">
            <AvatarIcon className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{article.author}</h3>
            <p className="text-gray-500">{article.authorRole}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.readTime} de lectura</span>
        </div>
        <div className="whitespace-pre-line text-gray-700 print:text-base">
          {article.content}
        </div>
      </article>
      
      <div className="print:hidden mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Publicado el {article.date}</span>
            <p className="text-sm text-gray-500 mt-2">
              Contacto: {article.author.toLowerCase()}@energia.com
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <button
                onClick={() => {
                  if (!hasActiveSubscription) {
                    alert('Necesitas una suscripción activa para compartir artículos');
                    return;
                  }
                  setShowShareMenu(!showShareMenu);
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  hasActiveSubscription 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!hasActiveSubscription}
              >
                Compartir
              </button>
              {showShareMenu && hasActiveSubscription && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu">
                    <button
                      onClick={handleCopyLink}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Copiar Link
                    </button>
                    <button
                      onClick={() => handleShareSocial('whatsapp')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Compartir en WhatsApp
                    </button>
                    <button
                      onClick={() => handleShareSocial('telegram')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Compartir en Telegram
                    </button>
                    <button
                      onClick={() => handleShareSocial('twitter')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Compartir en Twitter
                    </button>
                    <button
                      onClick={() => handleShareSocial('facebook')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Compartir en Facebook
                    </button>
                    <button
                      onClick={() => handleShareSocial('linkedin')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Compartir en LinkedIn
                    </button>
                    <button
                      onClick={handleShareEmail}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Enviar por Email
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSavePDF}
              className={`px-4 py-2 rounded-lg transition ${
                hasActiveSubscription 
                  ? 'border border-black text-black hover:bg-gray-100' 
                  : 'border border-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!hasActiveSubscription}
            >
              Guardar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Pie de página para impresión */}
      <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-sm text-gray-500">
        <p>Documento generado desde {window.location.origin}</p>
        <p>Fecha de impresión: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
