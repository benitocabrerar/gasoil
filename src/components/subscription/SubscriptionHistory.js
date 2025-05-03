import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { getTransactionHistory, formatCurrency, PLANS } from '../../utils/subscription';

const UsageStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-500">Herramientas Usadas</h4>
      <p className="mt-2 text-3xl font-bold text-gray-900">{stats.toolsUsed}</p>
      <p className="mt-1 text-sm text-gray-500">Último mes</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-500">Tiempo Total</h4>
      <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalTime}</p>
      <p className="mt-1 text-sm text-gray-500">Horas de uso</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-500">Reportes Generados</h4>
      <p className="mt-2 text-3xl font-bold text-gray-900">{stats.reportsGenerated}</p>
      <p className="mt-1 text-sm text-gray-500">Este mes</p>
    </div>
  </div>
);

const SubscriptionHistory = () => {
  const { currentUser } = useAuth();
  const { subscription, isSubscribed, loading: subLoading, error: subError } = useSubscription();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ toolsUsed: 0, totalTime: '0h', reportsGenerated: 0 });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const history = await getTransactionHistory(currentUser.uid);
        setTransactions(history);
        // Simular estadísticas de uso
        setStats({
          toolsUsed: Math.floor(Math.random() * 30),
          totalTime: `${Math.floor(Math.random() * 50)}h`,
          reportsGenerated: Math.floor(Math.random() * 20)
        });
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  if (subLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (subError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {subError}
        </div>
      </div>
    );
  }

  const currentPlan = isSubscribed ? subscription : PLANS.plan_gratuito;
  const planName = isSubscribed ? subscription?.planName : PLANS.plan_gratuito.name;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Estado de la Suscripción */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalles de la Suscripción</h2>
          <div className="flex items-center mb-4">
            <div className={`h-3 w-3 rounded-full ${isSubscribed ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></div>
            <span className="font-medium text-gray-900">
              {isSubscribed ? 'Suscripción Activa' : 'Plan Gratuito'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Plan Actual</p>
              <p className="font-medium text-gray-900">{planName}</p>
            </div>
            {isSubscribed && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Próximo Pago</p>
                  <p className="font-medium text-gray-900">
                    {new Date(subscription.nextBilling).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monto Mensual</p>
                  <p className="font-medium text-gray-900">{formatCurrency(subscription.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Método de Pago</p>
                  <p className="font-medium text-gray-900 capitalize">{subscription.paymentMethod || 'PayPal'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas de Uso */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Estadísticas de Uso</h2>
      <UsageStats stats={stats} />

      {/* Historial de Pagos */}
      {isSubscribed && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Historial de Pagos</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Pago de Suscripción Premium
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.createdAt.toDate().toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className={`text-sm ${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.status === 'completed' ? 'Completado' : 'Fallido'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No hay transacciones registradas
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionHistory;