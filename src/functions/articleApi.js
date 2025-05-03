const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { v4: uuidv4 } = require('uuid');


const db = admin.firestore();
const bucket = admin.storage().bucket();

// Schema de validación para artículos
const validateArticle = (data) => {
  const requiredFields = [
    'title',
    'content',
    'author',
    'authorRole',
    'summary',
    'tags',
    'category'
  ];

  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }

  return {
    id: uuidv4(),
    title: data.title,
    content: data.content,
    author: data.author,
    authorRole: data.authorRole,
    summary: data.summary,
    tags: data.tags,
    category: data.category,
    imageUrls: data.imageUrls || [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'published',
    readTime: Math.ceil(data.content.split(' ').length / 200) + ' minutos'
  };
};

// Endpoint para crear un artículo
exports.createArticle = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      // Verificar método
      if (req.method !== 'POST') {
        throw new Error('Método no permitido');
      }

      // Verificar autenticación
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No autorizado');
      }

      const token = authHeader.split('Bearer ')[1];
      await admin.auth().verifyIdToken(token);

      // Validar y procesar artículo
      const articleData = validateArticle(req.body);

      // Guardar artículo en Firestore
      const articleRef = db.collection('articles').doc(articleData.id);
      await articleRef.set(articleData);

      res.status(201).json({
        success: true,
        message: 'Artículo creado exitosamente',
        articleId: articleData.id
      });
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// Endpoint para subir imágenes
exports.uploadImage = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      // Verificar método
      if (req.method !== 'POST') {
        throw new Error('Método no permitido');
      }

      // Verificar autenticación
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No autorizado');
      }

      const token = authHeader.split('Bearer ')[1];
      await admin.auth().verifyIdToken(token);

      // Verificar que se envió una imagen
      if (!req.files || !req.files[0]) {
        throw new Error('No se envió ninguna imagen');
      }

      const file = req.files[0];
      const fileName = `articles/${uuidv4()}-${file.originalname}`;

      // Subir imagen a Firebase Storage
      const fileUpload = bucket.file(fileName);
      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype
        }
      });

      // Generar URL pública
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-01-2500'
      });

      res.status(200).json({
        success: true,
        url: url
      });
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// Endpoint para actualizar un artículo
exports.updateArticle = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      // Verificar método
      if (req.method !== 'PUT') {
        throw new Error('Método no permitido');
      }

      // Verificar autenticación
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No autorizado');
      }

      const token = authHeader.split('Bearer ')[1];
      await admin.auth().verifyIdToken(token);

      const { articleId } = req.params;
      if (!articleId) {
        throw new Error('ID del artículo no proporcionado');
      }

      // Validar y actualizar datos
      const updateData = {
        ...req.body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // Actualizar artículo en Firestore
      const articleRef = db.collection('articles').doc(articleId);
      await articleRef.update(updateData);

      res.status(200).json({
        success: true,
        message: 'Artículo actualizado exitosamente'
      });
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// Endpoint para eliminar un artículo
exports.deleteArticle = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      // Verificar método
      if (req.method !== 'DELETE') {
        throw new Error('Método no permitido');
      }

      // Verificar autenticación
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No autorizado');
      }

      const token = authHeader.split('Bearer ')[1];
      await admin.auth().verifyIdToken(token);

      const { articleId } = req.params;
      if (!articleId) {
        throw new Error('ID del artículo no proporcionado');
      }

      // Eliminar artículo de Firestore
      const articleRef = db.collection('articles').doc(articleId);
      await articleRef.delete();

      res.status(200).json({
        success: true,
        message: 'Artículo eliminado exitosamente'
      });
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        error: error.message
      });
    }
  });
});