import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSubscription } from '../../contexts/SubscriptionContext';

// Define backend function URLs (obtenidas del despliegue)
const CREATE_ORDER_URL = 'https://us-central1-oilmaster-e72da.cloudfunctions.net/createOrder';
const CAPTURE_ORDER_URL = 'https://us-central1-oilmaster-e72da.cloudfunctions.net/captureOrder';

// Datos de ejemplo para los planes
const subscriptionPlansData = [
  { id: 'free', name: 'Plan Gratis', price: '0.00', frequency: '', features: ['Acceso limitado'] },
  { id: 'monthly', name: 'Plan Mensual', price: '10.00', frequency: '/ mes', features: ['Acceso completo', 'Soporte'] },
  { id: 'yearly', name: 'Plan Anual', price: '100.00', frequency: '/ año', features: ['Acceso completo', 'Soporte prioritario', 'Descuento'] },
];

const SubscriptionPlans = () => {
  const { subscribe } = useSubscription();
  const [loadingPlanId, setLoadingPlanId] = useState(null); // Track loading per plan
  const [error, setError] = useState(null);
  const [hoveredPlanId, setHoveredPlanId] = useState(null);

  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  const paypalOptions = {
    "client-id": paypalClientId,
    currency: "USD",
    intent: "capture",
  };

  // Modificada para aceptar el monto y el ID del plan
  const createOrder = async (planId, amount) => {
    setLoadingPlanId(planId); // Inicia carga para este plan específico
    setError(null);
    console.log(`Attempting to create PayPal order for plan ${planId} with amount ${amount}...`);
    try {
      const response = await fetch(CREATE_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar el ID del plan y el monto al backend
        body: JSON.stringify({ planId: planId, amount: amount })
      });
      const orderData = await response.json();
      if (!response.ok || !orderData.id) {
        throw new Error(orderData.error || "Error del servidor al crear la orden de PayPal.");
      }
      console.log("Order created successfully:", orderData.id);
      // setLoadingPlanId(null); // No detener carga aquí, PayPal toma el control
      return orderData.id;
    } catch (err) {
      console.error("Error creating PayPal order:", err);
      setError(`Error al iniciar el pago para ${planId}: ${err.message}`);
      setLoadingPlanId(null); // Detener carga en caso de error
      throw err; // Propagar error a PayPalButtons
    }
  };

  // Modificada para saber qué plan se aprobó (opcional, si necesitas lógica post-pago específica del plan)
  const onApprove = async (data, actions, planId) => {
    console.log(`PayPal payment approved for plan ${planId}. Order ID:`, data.orderID);
    setLoadingPlanId(planId); // Mantener carga durante la captura
    setError(null);
    try {
      const response = await fetch(CAPTURE_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID }), // El backend captura usando el orderID
      });
      const result = await response.json();

      if (!response.ok || result.status !== 'success') {
        throw new Error(result.error || 'Error del servidor al capturar el pago.');
      }

      console.log("Order captured successfully by backend:", result);

      // Ejecuta la lógica de suscripción (podrías pasar planId si es necesario)
      await subscribe(planId); // Asumiendo que subscribe puede tomar el planId
      alert(`¡Suscripción al plan ${planId} exitosa! Pago completado.`);

    } catch (err) {
      console.error("Error capturing PayPal order or subscribing:", err);
      setError(`Error al completar la suscripción para ${planId}: ${err.message}`);
      alert(`Error al completar la suscripción: ${err.message}`);
    } finally {
      setLoadingPlanId(null); // Finalizar carga
    }
  };

  const onError = (err, planId) => {
    console.error(`PayPal Checkout onError for plan ${planId}:`, err);
    setError(`Ocurrió un error inesperado durante el pago del plan ${planId}. Por favor, inténtalo de nuevo.`);
    setLoadingPlanId(null); // Detener carga
  };

  const onCancel = (data, planId) => {
    console.log(`PayPal Checkout onCancel for plan ${planId}:`, data);
    setError(`Has cancelado el proceso de pago para el plan ${planId}.`);
    setLoadingPlanId(null); // Detener carga
  };

  if (!paypalClientId) {
    return (
      <div className="subscription-plans">
        <h2>Planes de Suscripción</h2>
        <p style={{ color: 'red' }}>Error: La configuración de PayPal (Client ID) no está disponible...</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Planes de Suscripción</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-wrap justify-center gap-6">
          {subscriptionPlansData.map((plan) => (
            <div key={plan.id}
                 className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-6 border border-gray-200 rounded-lg shadow-md transition-all duration-300
                 ${hoveredPlanId === plan.id ? 'scale-105 shadow-lg bg-blue-50' : 'hover:shadow-2xl hover:scale-105'}
                 ${hoveredPlanId && hoveredPlanId !== plan.id ? 'opacity-50' : ''}`}
                 onMouseEnter={() => setHoveredPlanId(plan.id)}
                 onMouseLeave={() => setHoveredPlanId(null)}>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">${plan.price} {plan.frequency}</p>
              <ul className="text-gray-600 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="mb-2">✅ {feature}</li>
                ))}
              </ul>

              {/* Indicador de carga específico del plan */}
              {loadingPlanId === plan.id && <p className="text-center text-gray-500">Procesando...</p>}

              {/* Renderiza botones solo para planes de pago */}
              {parseFloat(plan.price) > 0 && (
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                  createOrder={() => createOrder(plan.id, plan.price)}
                  onApprove={(data, actions) => onApprove(data, actions, plan.id)}
                  onError={(err) => onError(err, plan.id)}
                  onCancel={(data) => onCancel(data, plan.id)}
                  disabled={loadingPlanId !== null}
                  key={plan.id}
                />
              )}
              {/* Botón para plan gratuito (si aplica) */}
              {parseFloat(plan.price) === 0 && (
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => alert('Seleccionado plan gratuito')}>Seleccionar Plan Gratis</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default SubscriptionPlans;