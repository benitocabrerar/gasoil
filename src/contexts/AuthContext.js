import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

const AuthContext = createContext({
  currentUser: null,
  loading: true,
  subscription: null,
  updateSubscription: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  const fetchSubscriptionData = async (user) => {
    if (!user) return null;
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().subscription;
    }
    return null;
  };

  const updateSubscription = async (subscriptionData) => {
    if (!currentUser) return;
    
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, {
      subscription: subscriptionData,
      updatedAt: new Date()
    }, { merge: true });

    // Crear registro de transacción
    const transactionRef = collection(db, 'transactions');
    await setDoc(doc(transactionRef), {
      userId: currentUser.uid,
      amount: subscriptionData.amount,
      status: 'completed',
      type: 'subscription',
      date: new Date(),
      details: subscriptionData
    });

    setSubscription(subscriptionData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Recuperar email recordado si existe
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      // Podrías usarlo para pre-llenar el formulario de login
      // o para otras funcionalidades relacionadas
    }

    // Limpiar la suscripción al desmontar
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    subscription,
    updateSubscription
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirigir al login o mostrar mensaje
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acceso Restringido
          </h2>
          <p className="text-gray-600">
            Debes iniciar sesión para acceder a esta página
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Ir al login
          </button>
        </div>
      </div>
    );
  }

  return children;
};