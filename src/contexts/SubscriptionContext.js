import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getSubscription, isSubscriptionActive } from '../utils/subscription';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription debe usarse dentro de un SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSubscription = async () => {
    if (!currentUser) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const subscriptionData = await getSubscription(currentUser.uid);
      setSubscription(subscriptionData);
      setError(null);
    } catch (err) {
      console.error('Error al cargar la suscripción:', err);
      setError('No se pudo cargar la información de suscripción');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscription();
  }, [currentUser]);

  const refreshSubscription = async () => {
    setLoading(true);
    await loadSubscription();
  };

  const value = {
    subscription,
    isSubscribed: subscription ? isSubscriptionActive(subscription) : false,
    loading,
    error,
    refreshSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};