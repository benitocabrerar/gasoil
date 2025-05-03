// src/functions/index.js
const admin = require('firebase-admin');

admin.initializeApp();

// Importar y re-exportar funciones de articleApi.js
const articleFunctions = require('./articleApi');
exports.createArticle = articleFunctions.createArticle;
exports.uploadImage = articleFunctions.uploadImage;
exports.updateArticle = articleFunctions.updateArticle;
exports.deleteArticle = articleFunctions.deleteArticle;

// Importar y re-exportar funciones de paypal.js
const paypalFunctions = require('./paypal');
exports.createOrder = paypalFunctions.createOrder;
exports.captureOrder = paypalFunctions.captureOrder;