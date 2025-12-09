# API Reference

## Configuración

### `configureClient(config: ClientConfig)`
### `configureClient(notiUrl: string, notiApiKey: string)`

Configura el cliente global con la URL base del Bridge y la API Key.

**Sintaxis recomendada (objeto):**
```typescript
import { configureClient } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: ''your_base_url'',
  notiApiKey: 'your_api_key'
})
```

**Sintaxis tradicional (también soportada):**
```typescript
configureClient(''your_base_url'', 'your_api_key')
```

**Parámetros (sintaxis de objeto):**
- `config.notiUrl: string` - URL base del Bridge
- `config.notiApiKey: string` - API Key para autenticación

### `getClient(): NotiSenderClient`

Obtiene el cliente configurado. Lanza un error si no está configurado.

```typescript
import { getClient } from '@notibuzz/noti-sdk-js'

const client = getClient()
```

## Sessions

### `listSessions(options?)`

Lista todas las sesiones disponibles.

**Parámetros:**
- `options.query.all?: boolean` - Incluir sesiones en estado STOPPED

**Ejemplo:**
```typescript
const sessions = await listSessions({ query: { all: true } })
```

### `getSession(options)`

Obtiene información detallada de una sesión.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión

**Ejemplo:**
```typescript
const session = await getSession({ pathParams: { session: 'default' } })
```

### `getSessionMe(options)`

Obtiene información de la cuenta autenticada de la sesión.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión

**Ejemplo:**
```typescript
const me = await getSessionMe({ pathParams: { session: 'default' } })
```

## Profile

### `getMyProfile(options)`

Obtiene la información del perfil de la cuenta.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión

### `setProfileName(options)`

Actualiza el nombre del perfil.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.name: string` - Nuevo nombre

### `setProfileStatus(options)`

Actualiza el estado (About) del perfil.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.status: string` - Nuevo estado

### `setProfilePicture(options)`

Actualiza la foto de perfil.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.file: { mimetype: string, filename?: string, url?: string, data?: string }` - Archivo (URL o base64)

### `deleteProfilePicture(options)`

Elimina la foto de perfil.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión

## Chatting

**Importante**: Todos los mensajes se envían a través del endpoint genérico `sendMessage`. No existen funciones individuales como `sendText`, `sendImage`, etc.

### `sendMessage(options)`

Endpoint único y genérico para enviar mensajes. Soporta mensajes en lote e individuales.

**Tipos soportados** (según TYPE_PATH_MAP del bridge):
- `'text'` - Mensaje de texto
- `'image'` - Imagen
- `'file'` - Archivo
- `'voice'` - Nota de voz
- `'video'` - Video
- `'link-custom-preview'` - Texto con vista previa personalizada
- `'seen'` - Marcar como visto
- `'poll'` - Encuesta
- `'location'` - Ubicación
- `'contact-vcard'` - Contacto (vCard)
- `'forward'` - Reenviar mensaje

**Nota**: `startTyping` y `stopTyping` tienen endpoints directos y NO pasan por sendMessage.

**Parámetros:**

**Modo masivo:**
- `options.body.messages: Array<{ type: MessageType, payload: any }>` - Array de mensajes
- `options.body.intervalMs?: number` - Intervalo entre mensajes (ms)
- `options.body.meta?: { campaignId?: string, requester?: string, origin?: string }` - Metadata de campaña

**Modo individual:**
- `options.body.type: MessageType` - Tipo de mensaje
- `options.body.payload: any` - Payload del mensaje

**Opcional:**
- `options.async?: boolean` - Enviar de forma asíncrona (encolar)

**Ejemplo masivo:**
```typescript
await sendMessage({
  body: {
    intervalMs: 20000,
    messages: [
      { 
        type: 'text', 
        payload: { 
          session: 'default', 
          chatId: '51987654321@c.us', 
          text: 'Hola' 
        } 
      },
      {
        type: 'image',
        payload: {
          session: 'default',
          chatId: '51987654322@c.us',
          file: {
            mimetype: 'image/jpeg',
            url: 'https://example.com/image.jpg'
          }
        }
      }
    ],
    meta: {
      campaignId: 'campaign-123',
      requester: 'my-app'
    }
  }
})
```

**Ejemplo individual - Texto:**
```typescript
await sendMessage({
  body: {
    type: 'text',
    payload: { 
      session: 'default', 
      chatId: '51987654321@c.us', 
      text: 'Hola' 
    }
  }
})
```

**Ejemplo individual - Imagen:**
```typescript
await sendMessage({
  body: {
    type: 'image',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'image/jpeg',
        filename: 'foto.jpg',
        url: 'https://example.com/image.jpg'
      },
      caption: 'Mira esto'
    }
  }
})
```

**Ejemplo individual - Marcar como visto:**
```typescript
await sendMessage({
  body: {
    type: 'seen',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      messages: ['false_51987654321@c.us_AAAAAAAAAAAAAAAAAAAA']
    }
  }
})
```

### `reaction(options)`

Agrega o elimina una reacción en un mensaje. Este endpoint NO pasa por sendMessage, es directo.

**Parámetros:**
- `options.body.session: string` - Nombre de la sesión
- `options.body.messageId: string` - ID del mensaje
- `options.body.reaction: string` - Emoji de la reacción (ej: '👍')

### `startTyping(options)`

Inicia el estado de escritura en un chat. Este endpoint NO pasa por sendMessage, es directo.

**Parámetros:**
- `options.body.session: string` - Nombre de la sesión
- `options.body.chatId: string` - ID del chat
- `options.async?: boolean` - Enviar de forma asíncrona

### `stopTyping(options)`

Detiene el estado de escritura en un chat. Este endpoint NO pasa por sendMessage, es directo.

**Parámetros:**
- `options.body.session: string` - Nombre de la sesión
- `options.body.chatId: string` - ID del chat
- `options.async?: boolean` - Enviar de forma asíncrona

## Status (Stories)

### `statusText(options)`

Crea un Story de tipo texto.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.contacts?: string[]` - Lista de contactos ([] para todos)
- `options.body.text: string` - Texto del Story
- `options.body.backgroundColor?: string` - Color de fondo (hex)
- `options.body.font?: number` - Fuente
- `options.body.linkPreview?: boolean` - Incluir vista previa de enlaces

### `statusImage(options)`

Crea un Story de tipo imagen.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.contacts?: string[]` - Lista de contactos ([] para todos)
- `options.body.file: { mimetype: string, filename?: string, url?: string, data?: string }` - Archivo
- `options.body.caption?: string` - Descripción

### `statusVoice(options)`

Crea un Story de tipo voz.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.contacts?: string[]` - Lista de contactos ([] para todos)
- `options.body.file: { mimetype: string, url?: string, data?: string }` - Archivo (OGG/OPUS)
- `options.body.backgroundColor?: string` - Color de fondo
- `options.body.convert?: boolean` - Convertir formato

### `statusVideo(options)`

Crea un Story de tipo video.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.contacts?: string[]` - Lista de contactos ([] para todos)
- `options.body.file: { mimetype: string, filename: string, url?: string, data?: string }` - Archivo (MP4/H.264)
- `options.body.caption?: string` - Descripción
- `options.body.convert?: boolean` - Convertir formato

### `statusDelete(options)`

Elimina un Story.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body.id: string` - ID del Story a eliminar
- `options.body.contacts?: string[]` - Lista de contactos ([] para todos)

## Chats

### `chatsGet(options)`

Lista los chats de la sesión.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.query?: Record<string, any>` - Parámetros de consulta

### `chatsOverviewGet(options)`

Obtiene el resumen de chats.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.query.limit?: number` - Cantidad de resultados
- `options.query.offset?: number` - Desplazamiento
- `options.query.ids?: string[]` - Filtrar por IDs

### `chatsOverviewPost(options)`

Obtiene el resumen de chats usando POST (permite filtros más complejos).

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.body?: any` - Cuerpo de la petición

### `chatsGetMessages(options)`

Lista los mensajes del chat.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.pathParams.chatId: string` - ID del chat
- `options.query.limit?: number` - Cantidad de resultados
- `options.query.offset?: number` - Desplazamiento
- `options.query.downloadMedia?: boolean` - Descargar media

### `chatsReadMessages(options)`

Marca mensajes como leídos.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.pathParams.chatId: string` - ID del chat
- `options.query.messages?: number` - Cantidad de mensajes
- `options.query.days?: number` - Días hacia atrás

### `chatsEditMessage(options)`

Edita un mensaje.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.pathParams.chatId: string` - ID del chat
- `options.pathParams.messageId: string` - ID del mensaje
- `options.body.text: string` - Nuevo texto
- `options.body.linkPreview?: boolean` - Incluir vista previa

### `chatsPinMessage(options)`

Pinea un mensaje.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.pathParams.chatId: string` - ID del chat
- `options.pathParams.messageId: string` - ID del mensaje
- `options.body.duration: number` - Duración en segundos (86400 = 24h, 604800 = 7d, 2592000 = 30d)

### `chatsUnpinMessage(options)`

Despinea un mensaje.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.pathParams.chatId: string` - ID del chat
- `options.pathParams.messageId: string` - ID del mensaje

## Contacts

### `contactsGetAll(options)`

Lista todos los contactos.

**Parámetros:**
- `options.query.session: string` - Nombre de la sesión

### `contactsGetBasic(options)`

Obtiene información básica de un contacto.

**Parámetros:**
- `options.query.session: string` - Nombre de la sesión
- `options.query.contactId: string` - ID del contacto

### `contactsCheckExists(options)`

Verifica si un número existe en WhatsApp.

**Parámetros:**
- `options.query.session: string` - Nombre de la sesión
- `options.query.phone: string` - Número telefónico (sin + ni sufijo)

### `contactsProfilePicture(options)`

Obtiene la URL de la foto de perfil.

**Parámetros:**
- `options.query.session: string` - Nombre de la sesión
- `options.query.contactId: string` - ID del contacto
- `options.query.refresh?: boolean` - Forzar actualización

### `contactsBlock(options)`

Bloquea un contacto.

**Parámetros:**
- `options.body.session: string` - Nombre de la sesión
- `options.body.contactId: string` - ID del contacto

### `contactsUnblock(options)`

Desbloquea un contacto.

**Parámetros:**
- `options.body.session: string` - Nombre de la sesión
- `options.body.contactId: string` - ID del contacto

### `contactsUpsert(options)`

Crea o actualiza un contacto.

**Parámetros:**
- `options.pathParams.session: string` - Nombre de la sesión
- `options.pathParams.chatId: string` - ID del contacto
- `options.body.firstName?: string` - Nombre
- `options.body.lastName?: string` - Apellido

## Bulk

### `bulkAvailability(options)`

Verifica la disponibilidad de capacidad para envíos masivos.

**Parámetros:**
- `options.query.requester?: string` - Identificador del solicitante

**Retorna:**
```typescript
{
  available: boolean
  current: number
  max: number
  origin: string
  requester?: string
}
```

### `bulkStopCampaign(options)`

Detiene una campaña de envío masivo.

**Parámetros:**
- `options.pathParams.id: string` - ID de la campaña
- `options.body.sessions?: string[]` - Sesiones específicas (opcional)

### `bulkResumeCampaign(options)`

Reanuda una campaña de envío masivo.

**Parámetros:**
- `options.pathParams.id: string` - ID de la campaña
- `options.body.sessions?: string[]` - Sesiones específicas (opcional)

