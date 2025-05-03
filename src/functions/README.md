# API de Artículos para n8n

Esta API permite crear y gestionar artículos profesionales con soporte para imágenes desde n8n.

## Endpoints

### POST /createArticle
Crea un nuevo artículo.

```javascript
// Ejemplo de payload
{
  "title": "Título del artículo",
  "content": "Contenido del artículo...",
  "author": "Nombre del autor",
  "authorRole": "Cargo del autor",
  "summary": "Resumen del artículo",
  "tags": ["tag1", "tag2"],
  "category": "Categoría",
  "imageUrls": ["url1", "url2"]
}
```

### POST /uploadImage
Sube una imagen para un artículo.

```javascript
// Multipart form data
files: [File]
```

### PUT /updateArticle/:articleId
Actualiza un artículo existente.

```javascript
// Ejemplo de payload
{
  "title": "Nuevo título",
  "content": "Nuevo contenido..."
}
```

### DELETE /deleteArticle/:articleId
Elimina un artículo existente.

## Autenticación

Todos los endpoints requieren un token Bearer en el header:
```
Authorization: Bearer <token>
```

## Uso con n8n

1. Usar el nodo "HTTP Request" en n8n
2. Configurar el método y URL correspondiente
3. Agregar el header de autorización
4. Para imágenes, usar Binary Data

### Ejemplo de workflow en n8n:

```json
{
  "node": "HTTP Request",
  "method": "POST",
  "url": "https://your-firebase-function.com/createArticle",
  "headers": {
    "Authorization": "Bearer {{$node.previousNode.data.token}}",
    "Content-Type": "application/json"
  },
  "body": {
    "title": "{{$node.previousNode.data.title}}",
    "content": "{{$node.previousNode.data.content}}",
    "author": "{{$node.previousNode.data.author}}",
    "authorRole": "{{$node.previousNode.data.role}}",
    "summary": "{{$node.previousNode.data.summary}}",
    "tags": "{{$node.previousNode.data.tags}}",
    "category": "{{$node.previousNode.data.category}}",
    "imageUrls": "{{$node.previousNode.data.images}}"
  }
}
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Desplegar funciones:
```bash
npm run deploy
```

## Desarrollo Local

1. Iniciar emulador:
```bash
npm run serve
```

2. Las funciones estarán disponibles en:
- http://localhost:5001/{project-id}/{region}/createArticle
- http://localhost:5001/{project-id}/{region}/uploadImage
- http://localhost:5001/{project-id}/{region}/updateArticle
- http://localhost:5001/{project-id}/{region}/deleteArticle