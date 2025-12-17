# Quick Start Guide

This guide will help you get started quickly with `@notibuzz/noti-sdk-js`.

## Installation

```bash
npm install @notibuzz/noti-sdk-js
```

## Basic Configuration

### 1. Configure environment variables (recommended)

Create a `.env` file:

```env
NOTI_URL='your_base_url'
NOTI_KEY=your_api_key_here
```

### 2. Or configure in code

**Recommended syntax (object):**
```typescript
import { configureClient } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: 'your_base_url',
  notiApiKey: 'your_api_key'
})
```

**Traditional syntax (also supported):**
```typescript
configureClient('your_base_url', 'your_api_key')
```

## First Example: Send a Message

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

// Configure client
configureClient({
  notiUrl: process.env.NOTI_URL!,
  notiApiKey: process.env.NOTI_KEY!
})

// Send message using the generic sendMessage endpoint
async function main() {
  try {
    const result = await sendMessage({
      body: {
        type: 'text',
        payload: {
          session: 'default',
          chatId: '51987654321@c.us',
          text: 'Hello from the SDK!'
        }
      }
    })
    console.log('Message sent:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
```

## Example: List Sessions

```typescript
import { configureClient, listSessions } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL!,
  notiApiKey: process.env.NOTI_KEY!
})

async function main() {
  const sessions = await listSessions({ query: { all: true } })
  console.log('Sessions:', sessions)
}

main()
```

## Example: Bulk Sending

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient(process.env.NOTI_URL!, process.env.NOTI_KEY!)

async function main() {
  const result = await sendMessage({
    body: {
      intervalMs: 20000, // 20 seconds between messages
      messages: [
        {
          type: 'text',
          payload: {
            session: 'default',
            chatId: '51987654321@c.us',
            text: 'Message 1'
          }
        },
        {
          type: 'text',
          payload: {
            session: 'default',
            chatId: '51987654322@c.us',
            text: 'Message 2'
          }
        }
      ],
      meta: {
        campaignId: 'my-campaign-123',
        requester: 'my-app'
      }
    }
  })
  
  console.log('Campaign enqueued:', result)
}

main()
```

## Example: Async Sending

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient(process.env.NOTI_URL!, process.env.NOTI_KEY!)

async function main() {
  // The message will be enqueued and processed in the background
  const result = await sendMessage({
    body: {
      type: 'text',
      payload: {
        session: 'default',
        chatId: '51987654321@c.us',
        text: 'Async message'
      }
    },
    async: true
  })
  
  console.log('Message enqueued:', result.jobId)
}

main()
```

## Next Steps

- Read the [complete API documentation](API.md)
- Check the [examples](../examples/) for more use cases
- See the [README](../README.md) for detailed information
