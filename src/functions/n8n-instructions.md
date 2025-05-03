# Instrucciones para Configurar el Workflow en n8n

## 1. Variables de Entorno
Primero, configura las siguientes variables de entorno en n8n:

```bash
API_URL=https://your-firebase-function.com
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
SITE_URL=https://your-site.com
```

## 2. Importar el Workflow
1. Abre n8n
2. Ve a "Workflows"
3. Haz clic en "Import From File"
4. Selecciona el archivo `n8n-workflow.json`

## 3. Configurar el Formulario
El workflow incluye un formulario con los siguientes campos:
- Título
- Contenido
- Autor
- Cargo del autor
- Resumen
- Tags (separados por comas)
- Categoría (selector)
- Imágenes (múltiples archivos)

## 4. Flujo del Proceso
1. **Form Trigger**: Captura los datos del artículo y las imágenes
2. **Upload Images**: Sube las imágenes a Firebase Storage
3. **Create Article**: Crea el artículo en Firestore
4. **IF**: Verifica si la creación fue exitosa
5. **Notify Success/Error**: Envía notificación por Telegram

## 5. Personalización
Puedes modificar:
- Categorías disponibles en el formulario
- Formato de las notificaciones
- Campos requeridos
- Validaciones adicionales

## 6. Uso
1. Activa el workflow
2. Accede al formulario mediante la URL generada
3. Completa los datos y sube las imágenes
4. El artículo se publicará automáticamente
5. Recibirás una notificación del resultado

## 7. Consejos
- Prueba el workflow en modo test primero
- Verifica los permisos de Firebase
- Monitorea los logs para errores
- Ajusta el tamaño máximo de archivos según necesites

## 8. Solución de Problemas

### Error de Autenticación
```
"error": "No autorizado"
```
- Verifica el token de autenticación
- Asegúrate de que los permisos están correctamente configurados

### Error al Subir Imágenes
```
"error": "No se envió ninguna imagen"
```
- Verifica el formato de las imágenes
- Comprueba los límites de tamaño

### Error al Crear Artículo
```
"error": "Campos requeridos faltantes"
```
- Asegúrate de completar todos los campos requeridos
- Verifica el formato de los datos

## 9. Mantenimiento
- Actualiza regularmente los tokens
- Monitorea el uso de almacenamiento
- Revisa periódicamente los logs
- Haz copias de seguridad del workflow

## 10. Extensiones Posibles
- Agregar revisión editorial
- Programar publicaciones
- Integrar con redes sociales
- Añadir análisis de SEO
- Implementar moderación de contenido