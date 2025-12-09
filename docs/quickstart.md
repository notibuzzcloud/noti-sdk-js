# Quick Start Guide

Esta guía te ayudará a comenzar rápidamente con `@notibuzz/noti-sdk-js`.

## Instalación

```bash
npm install @notibuzz/noti-sdk-js
```

## Configuración básica

### 1. Configurar variables de entorno (recomendado)

Crea un archivo `.env`:

```env
NOTI_URL='your_base_url'
NOTI_KEY=your_api_key_here
```

### 2. O configurar en código

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

## Primer ejemplo: Enviar un mensaje

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

// Configurar cliente
configureClient({
  notiUrl: process.env.NOTI_URL!,
  notiApiKey: process.env.NOTI_KEY!
})

// Enviar mensaje usando el endpoint genérico sendMessage
async function main() {
  try {
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
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
```

## Ejemplo: Listar sesiones

```typescript
import { configureClient, listSessions } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL!,
  notiApiKey: process.env.NOTI_KEY!
})

async function main() {
const sessions = await listSessions({ query: { all: true } })
  console.log('Sesiones:', sessions)
}

main()
```

## Ejemplo: Envío masivo

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient(process.env.NOTI_URL!, process.env.NOTI_KEY!)

async function main() {
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
        }
      ],
      meta: {
        campaignId: 'my-campaign-123',
        requester: 'my-app'
      }
    }
  })
  
  console.log('Campaña encolada:', result)
}

main()
```

## Ejemplo: Envío asíncrono

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient(process.env.NOTI_URL!, process.env.NOTI_KEY!)

async function main() {
  // El mensaje se encolará y procesará en segundo plano
  const result = await sendMessage({
    body: {
      type: 'text',
      payload: {
        session: 'default',
        chatId: '51987654321@c.us',
        text: 'Mensaje asíncrono'
      }
    },
    async: true
  })
  
  console.log('Mensaje encolado:', result.jobId)
}

main()
```

## Siguientes pasos

- Lee la [documentación completa del API](API.md)
- Revisa los [ejemplos](../examples/) para más casos de uso
- Consulta el [README](../README.md) para información detallada
