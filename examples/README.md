# Ejemplos de uso de @notibuzz/noti-sdk-js

Esta carpeta contiene ejemplos prácticos organizados por categorías para ayudarte a usar el SDK.

## Configuración

Antes de ejecutar los ejemplos, configura las variables de entorno:

```bash
export NOTI_URL="https://daqr.online/bridge"
export NOTI_KEY="tu_api_key"
export NOTI_SESSION_NAME="default"  # Nombre de la sesión a usar
```

O modifica directamente en cada archivo:

```javascript
configureClient({
  notiUrl: 'https://daqr.online/bridge',
  notiApiKey: 'tu_api_key'
})

const sessionName = process.env.NOTI_SESSION_NAME || 'default'
```

## Estructura

Los ejemplos están organizados en subdirectorios según las categorías de la API:

### 📁 Sessions
- `listSessions.js` - Listar todas las sesiones
- `getSession.js` - Obtener información de una sesión
- `getSessionMe.js` - Obtener información de la cuenta autenticada

### 👤 Profile
- `getMyProfile.js` - Obtener información del perfil
- `setProfileName.js` - Actualizar nombre del perfil
- `setProfileStatus.js` - Actualizar estado (About)
- `setProfilePicture.js` - Actualizar foto de perfil
- `deleteProfilePicture.js` - Eliminar foto de perfil

### 💬 Chatting
- `sendText.js` - Enviar mensaje de texto
- `sendImage.js` - Enviar imagen
- `sendFile.js` - Enviar archivo
- `sendPoll.js` - Enviar encuesta
- `sendLocation.js` - Enviar ubicación
- `sendBulkMessages.js` - Envío masivo de mensajes
- `reaction.js` - Agregar/eliminar reacción
- `typing.js` - Iniciar/detener estado de escritura

### 📱 Status
- `statusText.js` - Crear estado de texto
- `statusImage.js` - Crear estado de imagen
- `statusVoice.js` - Crear estado de voz
- `statusVideo.js` - Crear estado de video
- `statusDelete.js` - Eliminar estado

### 💬 Chats
- `listChats.js` - Listar chats
- `getMessages.js` - Obtener mensajes de un chat
- `getMessage.js` - Obtener un mensaje específico
- `markRead.js` - Marcar mensajes como leídos
- `editMessage.js` - Editar mensaje
- `pinMessage.js` - Pinear/despinear mensaje

### 📇 Contacts
- `getContact.js` - Obtener información de un contacto
- `getAll.js` - Listar todos los contactos
- `checkExists.js` - Verificar si un número existe en WhatsApp
- `getProfilePicture.js` - Obtener foto de perfil
- `getAbout.js` - Obtener "About" (estado) del contacto
- `upsert.js` - Crear/actualizar contacto
- `block.js` - Bloquear/desbloquear contacto

## Ejecución

Para ejecutar un ejemplo:

```bash
# Desde la raíz del proyecto
node examples/sessions/listSessions.js

# O desde la carpeta examples
cd examples
node sessions/listSessions.js
```

## Notas importantes

1. **Compilar antes de ejecutar**: Asegúrate de haber ejecutado `npm run build` para generar los archivos en `dist/`

2. **Variables de entorno**: Los ejemplos usan:
   - `NOTI_URL` - URL del bridge (por defecto: `'your_base_url'`)
   - `NOTI_KEY` - API Key (por defecto: `your_api_key`)
   - `NOTI_SESSION_NAME` - Nombre de la sesión (por defecto: `default`)

3. **IDs reales**: Reemplaza los IDs de ejemplo (chatId, messageId, etc.) con valores reales de tu cuenta

4. **Errores**: Todos los ejemplos incluyen manejo de errores básico

## Próximos pasos

- Revisa la [documentación completa](../README.md)
- Consulta la [referencia de API](../docs/API.md)
- Lee la [guía rápida](../docs/QUICKSTART.md)

