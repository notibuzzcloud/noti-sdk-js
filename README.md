# @notibuzz/noti-sdk-js

[![npm version](https://img.shields.io/npm/v/@notibuzz/noti-sdk-js.svg)](https://www.npmjs.com/package/@notibuzz/noti-sdk-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDK ESM TypeScript/JavaScript para consumir la API de **Noti Sender Bridge**. Este SDK proporciona wrappers tipados para interactuar con WhatsApp a través de la API de Noti Sender, incluyendo soporte para envíos masivos, cola asíncrona y control de campañas.

## Características

- ✅ **TypeScript completo** - Tipado fuerte y autocompletado
- ✅ **Envíos masivos** - Soporte para campañas con control anti-ban
- ✅ **Cola asíncrona** - Envío de mensajes en segundo plano
- ✅ **Todos los endpoints** - Sessions, Profile, Chatting, Status, Chats, Contacts
- ✅ **Control de campañas** - Detener, reanudar y verificar disponibilidad
- ✅ **ESM nativo** - Compatible con módulos modernos

## Instalación

```bash
npm install @notibuzz/noti-sdk-js
```

## Configuración rápida

### Opción 1: Variables de entorno

```bash
export NOTI_URL="'your_base_url'"
export NOTI_KEY="your_api_key_here"
```

### Opción 2: Configuración en código

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

## Uso básico

### Enviar un mensaje de texto

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL!,
  notiApiKey: process.env.NOTI_KEY!
})

const result = await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: '¡Hola desde el SDK!'
    }
  }
})

console.log('Mensaje enviado:', result)
```

### Listar sesiones

```typescript
import { listSessions } from '@notibuzz/noti-sdk-js'

const sessions = await listSessions({
  query: { all: true } // Incluye sesiones STOPPED
})

console.log('Sesiones disponibles:', sessions)
```

## Envíos masivos

El SDK soporta envíos masivos con control de intervalos y anti-ban:

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

// Envío masivo con múltiples mensajes
const result = await sendMessage({
  body: {
    intervalMs: 20000, // 20 segundos entre mensajes
    messages: [
      {
        type: 'text',
        payload: {
          session: 'default',
          chatId: '51987654321@c.us',
          text: 'Mensaje 1'
        }
      },
      {
        type: 'text',
        payload: {
          session: 'default',
          chatId: '51987654322@c.us',
          text: 'Mensaje 2'
        }
      },
      {
        type: 'image',
        payload: {
          session: 'default',
          chatId: '51987654323@c.us',
          file: {
            mimetype: 'image/jpeg',
            filename: 'foto.jpg',
            url: 'https://example.com/image.jpg'
          },
          caption: 'Mira esta imagen'
        }
      }
    ],
    meta: {
      campaignId: 'campaign-123',
      requester: 'my-app',
      origin: 'web'
    }
  }
})

console.log('Campaña encolada:', result)
// { enqueued: true, jobId: 'send-bulk-...', count: 3, intervalMs: 20000 }
```

### Envío individual usando sendMessage

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

// También puedes enviar un mensaje individual
const result = await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: 'Mensaje único'
    }
  }
})
```

## Envíos asíncronos

Puedes enviar mensajes de forma asíncrona (encolados) usando el parámetro `async`:

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

// El mensaje se encolará y procesará en segundo plano
await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: 'Mensaje asíncrono'
    }
  },
  async: true // Encola el mensaje
})

// También funciona con otros tipos de mensajes
await sendMessage({
  body: {
    type: 'image',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'image/jpeg',
        url: 'https://example.com/image.jpg'
      }
    }
  },
  async: true
})
```

## Control de campañas masivas

### Verificar disponibilidad

```typescript
import { bulkAvailability } from '@notibuzz/noti-sdk-js'

const availability = await bulkAvailability({
  query: { requester: 'my-app' }
})

console.log('Disponibilidad:', availability)
// { available: true, current: 1, max: 2, origin: 'noti-sender-bridge' }
```

### Detener una campaña

```typescript
import { bulkStopCampaign } from '@notibuzz/noti-sdk-js'

await bulkStopCampaign({
  pathParams: { id: 'campaign-123' },
  body: {
    sessions: ['default'] // Opcional: detener solo en estas sesiones
  }
})
```

### Reanudar una campaña

```typescript
import { bulkResumeCampaign } from '@notibuzz/noti-sdk-js'

await bulkResumeCampaign({
  pathParams: { id: 'campaign-123' },
  body: {
    sessions: ['default'] // Opcional: reanudar solo en estas sesiones
  }
})
```

## Ejemplos por categoría

### Sessions

```typescript
import { listSessions, getSession, getSessionMe } from '@notibuzz/noti-sdk-js'

// Listar todas las sesiones
const sessions = await listSessions({ query: { all: true } })

// Obtener información de una sesión
const session = await getSession({
  pathParams: { session: 'default' }
})

// Obtener información de la cuenta autenticada
const me = await getSessionMe({
  pathParams: { session: 'default' }
})
```

### Profile

```typescript
import { getMyProfile, setProfileStatus, setProfilePicture } from '@notibuzz/noti-sdk-js'

// Obtener perfil
const profile = await getMyProfile({
  pathParams: { session: 'default' }
})

// Actualizar estado (About)
await setProfileStatus({
  pathParams: { session: 'default' },
  body: { status: '🎉 Usando Noti Sender!' }
})

// Actualizar foto de perfil
await setProfilePicture({
  pathParams: { session: 'default' },
  body: {
    file: {
      mimetype: 'image/jpeg',
      filename: 'avatar.jpg',
      url: 'https://example.com/avatar.jpg'
    }
  }
})
```

### Chatting

**Importante**: Todos los mensajes se envían a través del endpoint genérico `sendMessage`. Los tipos soportados son: `text`, `image`, `file`, `voice`, `video`, `link-custom-preview`, `seen`, `poll`, `location`, `contact-vcard`, `forward`, `list`.

**Endpoints directos** (no pasan por sendMessage): `reaction`, `startTyping`, `stopTyping`.

```typescript
import { sendMessage, reaction, startTyping, stopTyping } from '@notibuzz/noti-sdk-js'

// Enviar texto
await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: 'Hola!'
    }
  }
})

// Enviar imagen
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

// Enviar archivo
await sendMessage({
  body: {
    type: 'file',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'application/pdf',
        filename: 'documento.pdf',
        url: 'https://example.com/document.pdf'
      },
      caption: 'Documento importante'
    }
  }
})

// Enviar nota de voz
await sendMessage({
  body: {
    type: 'voice',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'audio/ogg; codecs=opus',
        url: 'https://example.com/voice.opus'
      },
      convert: false // true si necesitas conversión de formato
    }
  }
})

// Enviar video
await sendMessage({
  body: {
    type: 'video',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'video/mp4',
        filename: 'video.mp4',
        url: 'https://example.com/video.mp4'
      },
      caption: 'Mira este video',
      asNote: false, // true para video redondo
      convert: false
    }
  }
})

// Enviar encuesta
await sendMessage({
  body: {
    type: 'poll',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      poll: {
        name: '¿Cuál es tu color favorito?',
        options: ['Rojo', 'Azul', 'Verde'],
        selectableOptionsCount: 1
      }
    }
  }
})

// Enviar ubicación
await sendMessage({
  body: {
    type: 'location',
    payload: {
      session: 'default',
      chatId: '11111111111@c.us',
      latitude: 38.8937255,
      longitude: -77.0969763,
      title: 'Our office',
      reply_to: null
    }
  }
})

// Enviar contacto (vCard)
await sendMessage({
  body: {
    type: 'contact-vcard',
    payload: {
      session: 'default',
      chatId: '11111111111@c.us',
      contacts: [
        {
          vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Jane Doe\nORG:Company Name;\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\nEND:VCARD'
        },
        {
          fullName: 'John Doe',
          organization: 'Company Name',
          phoneNumber: '+91 11111 11111',
          whatsappId: '911111111111',
          vcard: null
        }
      ],
      reply_to: null
    }
  }
})

// Reenviar mensaje
await sendMessage({
  body: {
    type: 'forward',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      forward: {
        keyId: 'true_51987654322@c.us_AAAAAAAAAAAAAAAAAAAA'
      }
    }
  }
})

// Indicar que estás escribiendo (endpoint directo)
await startTyping({
  body: {
    session: 'default',
    chatId: '51987654321@c.us'
  }
})

// Dejar de escribir (endpoint directo)
await stopTyping({
  body: {
    session: 'default',
    chatId: '51987654321@c.us'
  }
})

// Marcar como visto usando sendMessage con tipo 'seen'
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

// Reaccionar a un mensaje (endpoint directo, no pasa por sendMessage)
await reaction({
  body: {
    session: 'default',
    messageId: 'true_51987654321@c.us_3EB0EB3DF63D6AF1112A85',
    reaction: '👍'
  }
})

// Indicar que estás escribiendo (endpoint directo, no pasa por sendMessage)
await startTyping({
  body: {
    session: 'default',
    chatId: '51987654321@c.us'
  }
})

// Dejar de escribir (endpoint directo, no pasa por sendMessage)
await stopTyping({
  body: {
    session: 'default',
    chatId: '51987654321@c.us'
  }
})
```

### Status (Stories)

```typescript
import { statusText, statusImage, statusVoice, statusVideo, statusDelete } from '@notibuzz/noti-sdk-js'

// Crear Story de texto
await statusText({
  pathParams: { session: 'default' },
  body: {
    contacts: [], // [] para enviar a todos
    text: 'Mira esto! https://github.com/',
    backgroundColor: '#38b42f',
    font: 0,
    linkPreview: true
  }
})

// Crear Story de imagen
await statusImage({
  pathParams: { session: 'default' },
  body: {
    contacts: ['51987654321@c.us'],
    caption: 'Mi Story',
    file: {
      mimetype: 'image/jpeg',
      filename: 'status.jpg',
      url: 'https://example.com/image.jpg'
    }
  }
})

// Eliminar Story
await statusDelete({
  pathParams: { session: 'default' },
  body: {
    id: '3EB0B4B74FB349EEC971A6'
  }
})
```

### Chats

```typescript
import {
  chatsGet,
  chatsOverviewGet,
  chatsOverviewPost,
  chatsGetMessages,
  chatsReadMessages,
  chatsEditMessage,
  chatsPinMessage,
  chatsUnpinMessage,
  chatsArchive,
  chatsUnarchive,
  chatsUnread
} from '@notibuzz/noti-sdk-js'

// Listar chats
const chats = await chatsGet({
  pathParams: { session: 'default' }
})

// Obtener resumen de chats
const overview = await chatsOverviewGet({
  pathParams: { session: 'default' },
  query: { limit: 20, offset: 0 }
})

// Obtener mensajes de un chat
const messages = await chatsGetMessages({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us'
  },
  query: {
    limit: 50,
    offset: 0,
    downloadMedia: true
  }
})

// Marcar mensajes como leídos
await chatsReadMessages({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us'
  },
  query: {
    messages: 30, // Cantidad de mensajes
    days: 7 // Días hacia atrás
  }
})

// Editar mensaje
await chatsEditMessage({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us',
    messageId: 'false_51987654321@c.us_AAAAAAAAAAAAAAAAAAAA'
  },
  body: {
    text: 'Mensaje editado',
    linkPreview: true
  }
})

// Pinear mensaje
await chatsPinMessage({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us',
    messageId: 'false_51987654321@c.us_AAAAAAAAAAAAAAAAAAAA'
  },
  body: {
    duration: 86400 // 24 horas
  }
})
```

### Contacts

```typescript
import {
  contactsGetAll,
  contactsGetBasic,
  contactsCheckExists,
  contactsProfilePicture,
  contactsGetAbout,
  contactsBlock,
  contactsUnblock,
  contactsUpsert
} from '@notibuzz/noti-sdk-js'

// Listar todos los contactos
const allContacts = await contactsGetAll({
  query: { session: 'default' }
})

// Obtener información básica
const contact = await contactsGetBasic({
  query: {
    session: 'default',
    contactId: '51987654321@c.us'
  }
})

// Verificar si un número existe en WhatsApp
const exists = await contactsCheckExists({
  query: {
    session: 'default',
    phone: '51987654321'
  }
})

// Obtener foto de perfil
const picture = await contactsProfilePicture({
  query: {
    session: 'default',
    contactId: '51987654321@c.us',
    refresh: false
  }
})

// Bloquear contacto
await contactsBlock({
  body: {
    session: 'default',
    contactId: '51987654321@c.us'
  }
})

// Crear o actualizar contacto
await contactsUpsert({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us'
  },
  body: {
    firstName: 'Juan',
    lastName: 'Pérez'
  }
})
```

## Manejo de errores

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

try {
  const result = await sendMessage({
    body: {
      type: 'text',
      payload: {
        session: 'default',
        chatId: '51987654321@c.us',
        text: 'Hola'
      }
    }
  })
  console.log('Éxito:', result)
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message)
    // El mensaje de error incluye el código HTTP y detalles
    // Ejemplo: "HTTP 401 Unauthorized - { error: 'invalid X-Api-Key' }"
  }
}
```

## Requisitos

- Node.js >= 18.0.0
- TypeScript >= 5.0 (opcional, pero recomendado)

## API Reference

Todos los endpoints están documentados con tipos TypeScript. Para ver la lista completa de endpoints y sus parámetros, consulta la [documentación del Bridge](https://github.com/notibuzz/noti-sender-bridge).

### Endpoints principales

- **Sessions**: `listSessions`, `getSession`, `getSessionMe`
- **Profile**: `getMyProfile`, `setProfileName`, `setProfileStatus`, `setProfilePicture`, `deleteProfilePicture`
- **Chatting**: `sendMessage` (endpoint genérico para todos los tipos: text, image, file, voice, video, poll, location, contact-vcard, forward, list, seen), `reaction`, `startTyping`, `stopTyping`
- **Status**: `statusText`, `statusImage`, `statusVoice`, `statusVideo`, `statusDelete`
- **Chats**: `chatsGet`, `chatsOverviewGet`, `chatsOverviewPost`, `chatsGetMessages`, `chatsReadMessages`, `chatsGetMessage`, `chatsDeleteMessage`, `chatsEditMessage`, `chatsPinMessage`, `chatsUnpinMessage`, `chatsArchive`, `chatsUnarchive`, `chatsUnread`
- **Contacts**: `contactsGetAll`, `contactsGetBasic`, `contactsCheckExists`, `contactsProfilePicture`, `contactsGetAbout`, `contactsBlock`, `contactsUnblock`, `contactsUpsert`
- **Bulk**: `bulkStopCampaign`, `bulkResumeCampaign`, `bulkAvailability`

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## Soporte

- **Issues**: [GitHub Issues](https://github.com/notibuzzcloud/noti-sdk-js/issues)
- **Documentación**: [README](README.md)

## Changelog

### 1.0.0
- Versión inicial
- Soporte completo para todos los endpoints del Bridge
- Envíos masivos con control anti-ban
- Cola asíncrona
- Control de campañas
