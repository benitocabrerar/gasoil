const paypal = require('@paypal/checkout-server-sdk');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // Permitir todos los orígenes (ajustar si es necesario)

const environment = new paypal.core.SandboxEnvironment(
  functions.config().paypal.client_id,
  functions.config().paypal.client_secret
);
const client = new paypal.core.PayPalHttpClient(environment);

exports.createOrder = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => { // Envolver con CORS
  // Leer planId y amount del cuerpo de la solicitud
  const { planId, amount } = req.body;

  // Validar que se recibió un monto (puedes añadir más validaciones)
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    console.error("Monto inválido recibido:", amount);
    return res.status(400).json({ error: "Monto inválido proporcionado." });
  }

  console.log(`Creating order for plan: ${planId}, amount: ${amount}`);

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount // Usar el monto recibido
      },
      // Opcional: Puedes añadir una descripción o SKU si lo necesitas
      // description: `Suscripción Plan ${planId}`,
      // sku: planId
    }]
  });

  try {
    const order = await client.execute(request);
    res.status(201).json({
      id: order.result.id
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
  }); // Cerrar CORS wrapper
});

exports.captureOrder = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => { // Envolver con CORS
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({
      status: 'success',
      capture: capture.result
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
  }); // Cerrar CORS wrapper
});