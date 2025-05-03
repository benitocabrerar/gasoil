import { db } from '../firebase-config';
import { doc, setDoc, deleteDoc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const COLLECTION = 'subscriptions';
const TRANSACTIONS = 'transactions'; // Added collection for transactions

export const PLANS = {
  plan_gratuito: { name: 'Plan Gratuito', price: 0, duration: Infinity, features: ['Acceso limitado a artículos', 'Funcionalidades básicas'] },
  plan_mensual: { name: 'Plan Mensual', price: 9.99, duration: 30, features: ['Acceso completo a artículos', 'Herramientas avanzadas', 'Soporte prioritario'] },
  plan_anual: { name: 'Plan Anual', price: 99.99, duration: 365, features: ['Todo lo del plan mensual', '2 meses gratis', 'Acceso anticipado'] }
};

export const createSubscription = async (userId, planId) => {
  if (!userId || !planId) throw new Error('Se requieren userId y planId');
  if (!PLANS[planId]) throw new Error('Plan no válido');
  const now = new Date();
  const nextBilling = new Date(now.getTime() + PLANS[planId].duration * 24 * 60 * 60 * 1000);
  const data = {
    userId, planId, planName: PLANS[planId].name, price: PLANS[planId].price,
    startDate: now.toISOString(), nextBilling: nextBilling.toISOString(),
    status: 'active', createdAt: now.toISOString()
  };
  await setDoc(doc(db, COLLECTION, userId), data);
  // Add transaction record
  await setDoc(doc(collection(db, TRANSACTIONS)), {
    userId,
    type: 'subscription_purchase',
    planId,
    amount: PLANS[planId].price,
    currency: 'USD',
    status: 'completed',
    createdAt: now
  });
  return data;
};

export const getSubscription = async (userId) => {
  if (!userId) throw new Error('Se requiere userId');
  const snapshot = await getDoc(doc(db, COLLECTION, userId));
  return snapshot.exists() ? snapshot.data() : null;
};

export const cancelSubscription = async (userId) => {
  if (!userId) throw new Error('Se requiere userId');
  await deleteDoc(doc(db, COLLECTION, userId));
  // Optionally, update user document or add cancellation transaction
  return true;
};

export const isSubscriptionActive = (subscription) => {
  if (!subscription) return false;
  const nextBilling = new Date(subscription.nextBilling);
  return subscription.status === 'active' && nextBilling > new Date();
};

export const getPlanDetails = (planId) => PLANS[planId] || null;

// Added function to get transaction history
export const getTransactionHistory = async (userId) => {
  if (!userId) throw new Error('Se requiere userId');
  const q = query(
    collection(db, TRANSACTIONS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const transactions = [];
  querySnapshot.forEach((doc) => {
    transactions.push({ id: doc.id, ...doc.data() });
  });
  return transactions;
};

// Added utility function for currency formatting
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount);
};