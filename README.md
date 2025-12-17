# @notibuzz/noti-sdk-js

[![npm version](https://img.shields.io/npm/v/@notibuzz/noti-sdk-js.svg)](https://www.npmjs.com/package/@notibuzz/noti-sdk-js)
[![npm downloads](https://img.shields.io/npm/dm/@notibuzz/noti-sdk-js.svg)](https://www.npmjs.com/package/@notibuzz/noti-sdk-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

**@notibuzz/noti-sdk-js** is a lightweight JavaScript and TypeScript SDK that provides seamless access to the Notibuzz Cloud REST API. It allows developers to send, manage, and automate WhatsApp messages, including high-volume bulk messaging, using a clean and modern API. Designed for scalability, reliability, and ease of use in Node.js and modern web applications.

## Features

- ✅ **Full TypeScript** - Strong typing and autocompletion
- ✅ **Bulk messaging** - Support for campaigns with anti-ban control
- ✅ **Async queue** - Background message sending
- ✅ **All endpoints** - Sessions, Profile, Chatting, Status, Chats, Contacts
- ✅ **Campaign control** - Stop, resume and check availability
- ✅ **Native ESM** - Compatible with modern modules

## Installation

```bash
npm install @notibuzz/noti-sdk-js
```

## Quick Setup

### Option 1: Environment Variables

```bash
export NOTI_URL="your_base_url"
export NOTI_KEY="your_api_key_here"
```

### Option 2: Code Configuration

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

## Basic Usage

### Send a text message

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
      text: 'Hello from the SDK!'
    }
  }
})

console.log('Message sent:', result)
```

### List sessions

```typescript
import { listSessions } from '@notibuzz/noti-sdk-js'

const sessions = await listSessions({
  query: { all: true } // Include STOPPED sessions
})

console.log('Available sessions:', sessions)
```

## Bulk Messaging

The SDK supports bulk messaging with interval control and anti-ban features:

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

// Bulk sending with multiple messages
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
      },
      {
        type: 'image',
        payload: {
          session: 'default',
          chatId: '51987654323@c.us',
          file: {
            mimetype: 'image/jpeg',
            filename: 'photo.jpg',
            url: 'https://example.com/image.jpg'
          },
          caption: 'Check out this image'
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

console.log('Campaign enqueued:', result)
// { enqueued: true, jobId: 'send-bulk-...', count: 3, intervalMs: 20000 }
```

### Individual sending using sendMessage

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

// You can also send a single message
const result = await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: 'Single message'
    }
  }
})
```

## Async Sending

You can send messages asynchronously (enqueued) using the `async` parameter:

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

// The message will be enqueued and processed in the background
await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: 'Async message'
    }
  },
  async: true // Enqueue the message
})

// Also works with other message types
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

## Bulk Campaign Control

### Check availability

```typescript
import { bulkAvailability } from '@notibuzz/noti-sdk-js'

const availability = await bulkAvailability({
  query: { requester: 'my-app' }
})

console.log('Availability:', availability)
// { available: true, current: 1, max: 2, origin: 'noti-sender-bridge' }
```

### Stop a campaign

```typescript
import { bulkStopCampaign } from '@notibuzz/noti-sdk-js'

await bulkStopCampaign({
  pathParams: { id: 'campaign-123' },
  body: {
    sessions: ['default'] // Optional: stop only in these sessions
  }
})
```

### Resume a campaign

```typescript
import { bulkResumeCampaign } from '@notibuzz/noti-sdk-js'

await bulkResumeCampaign({
  pathParams: { id: 'campaign-123' },
  body: {
    sessions: ['default'] // Optional: resume only in these sessions
  }
})
```

## Examples by Category

### Sessions

```typescript
import { listSessions, getSession, getSessionMe } from '@notibuzz/noti-sdk-js'

// List all sessions
const sessions = await listSessions({ query: { all: true } })

// Get session information
const session = await getSession({
  pathParams: { session: 'default' }
})

// Get authenticated account information
const me = await getSessionMe({
  pathParams: { session: 'default' }
})
```

### Profile

```typescript
import { getMyProfile, setProfileStatus, setProfilePicture } from '@notibuzz/noti-sdk-js'

// Get profile
const profile = await getMyProfile({
  pathParams: { session: 'default' }
})

// Update status (About)
await setProfileStatus({
  pathParams: { session: 'default' },
  body: { status: '🎉 Using Noti Sender!' }
})

// Update profile picture
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

**Important**: All messages are sent through the generic `sendMessage` endpoint. Supported types: `text`, `image`, `file`, `voice`, `video`, `link-custom-preview`, `seen`, `poll`, `location`, `contact-vcard`, `forward`, `list`.

**Direct endpoints** (don't go through sendMessage): `reaction`, `startTyping`, `stopTyping`.

```typescript
import { sendMessage, reaction, startTyping, stopTyping } from '@notibuzz/noti-sdk-js'

// Send text
await sendMessage({
  body: {
    type: 'text',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      text: 'Hello!'
    }
  }
})

// Send image
await sendMessage({
  body: {
    type: 'image',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'image/jpeg',
        filename: 'photo.jpg',
        url: 'https://example.com/image.jpg'
      },
      caption: 'Check this out'
    }
  }
})

// Send file
await sendMessage({
  body: {
    type: 'file',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      file: {
        mimetype: 'application/pdf',
        filename: 'document.pdf',
        url: 'https://example.com/document.pdf'
      },
      caption: 'Important document'
    }
  }
})

// Send voice note
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
      convert: false // true if you need format conversion
    }
  }
})

// Send video
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
      caption: 'Watch this video',
      asNote: false, // true for round video
      convert: false
    }
  }
})

// Send poll
await sendMessage({
  body: {
    type: 'poll',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      poll: {
        name: 'What is your favorite color?',
        options: ['Red', 'Blue', 'Green'],
        selectableOptionsCount: 1
      }
    }
  }
})

// Send location
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

// Send contact (vCard)
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

// Forward message
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

// Send list (interactive list)
await sendMessage({
  body: {
    type: 'list',
    payload: {
      session: 'default',
      chatId: '51987654321@c.us',
      message: {
        title: 'Simple Menu',
        description: 'Please choose an option',
        footer: 'Thank you!',
        button: 'Choose',
        sections: [
          {
            title: 'Main',
            rows: [
              {
                title: 'Option 1',
                rowId: 'option1',
                description: 'Option 1 description'
              },
              {
                title: 'Option 2',
                rowId: 'option2',
                description: 'Option 2 description'
              }
            ]
          }
        ]
      },
      reply_to: null
    }
  }
})

// Indicate you're typing (direct endpoint)
await startTyping({
  body: {
    session: 'default',
    chatId: '51987654321@c.us'
  }
})

// Stop typing (direct endpoint)
await stopTyping({
  body: {
    session: 'default',
    chatId: '51987654321@c.us'
  }
})

// Mark as seen using sendMessage with type 'seen'
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

// React to a message (direct endpoint, doesn't go through sendMessage)
await reaction({
  body: {
    session: 'default',
    messageId: 'true_51987654321@c.us_3EB0EB3DF63D6AF1112A85',
    reaction: '👍'
  }
})
```

### Status (Stories)

```typescript
import { statusText, statusImage, statusVoice, statusVideo, statusDelete } from '@notibuzz/noti-sdk-js'

// Create text Story
await statusText({
  pathParams: { session: 'default' },
  body: {
    contacts: [], // [] to send to everyone
    text: 'Check this out! https://github.com/',
    backgroundColor: '#38b42f',
    font: 0,
    linkPreview: true
  }
})

// Create image Story
await statusImage({
  pathParams: { session: 'default' },
  body: {
    contacts: ['51987654321@c.us'],
    caption: 'My Story',
    file: {
      mimetype: 'image/jpeg',
      filename: 'status.jpg',
      url: 'https://example.com/image.jpg'
    }
  }
})

// Delete Story
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
  chatsUnpinMessage
} from '@notibuzz/noti-sdk-js'

// List chats
const chats = await chatsGet({
  pathParams: { session: 'default' }
})

// Get chat overview
const overview = await chatsOverviewGet({
  pathParams: { session: 'default' },
  query: { limit: 20, offset: 0 }
})

// Get chat messages
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

// Mark messages as read
await chatsReadMessages({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us'
  },
  query: {
    messages: 30, // Number of messages
    days: 7 // Days back
  }
})

// Edit message
await chatsEditMessage({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us',
    messageId: 'false_51987654321@c.us_AAAAAAAAAAAAAAAAAAAA'
  },
  body: {
    text: 'Edited message',
    linkPreview: true
  }
})

// Pin message
await chatsPinMessage({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us',
    messageId: 'false_51987654321@c.us_AAAAAAAAAAAAAAAAAAAA'
  },
  body: {
    duration: 86400 // 24 hours
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

// List all contacts
const allContacts = await contactsGetAll({
  query: { session: 'default' }
})

// Get basic information
const contact = await contactsGetBasic({
  query: {
    session: 'default',
    contactId: '51987654321@c.us'
  }
})

// Check if a number exists on WhatsApp
const exists = await contactsCheckExists({
  query: {
    session: 'default',
    phone: '51987654321'
  }
})

// Get profile picture
const picture = await contactsProfilePicture({
  query: {
    session: 'default',
    contactId: '51987654321@c.us',
    refresh: false
  }
})

// Block contact
await contactsBlock({
  body: {
    session: 'default',
    contactId: '51987654321@c.us'
  }
})

// Create or update contact
await contactsUpsert({
  pathParams: {
    session: 'default',
    chatId: '51987654321@c.us'
  },
  body: {
    firstName: 'John',
    lastName: 'Doe'
  }
})
```

## Error Handling

```typescript
import { sendMessage } from '@notibuzz/noti-sdk-js'

try {
  const result = await sendMessage({
    body: {
      type: 'text',
      payload: {
        session: 'default',
        chatId: '51987654321@c.us',
        text: 'Hello'
      }
    }
  })
  console.log('Success:', result)
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message)
    // Error message includes HTTP code and details
    // Example: "HTTP 401 Unauthorized - { error: 'invalid X-Api-Key' }"
  }
}
```

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0 (optional, but recommended)

## API Reference

All endpoints are documented with TypeScript types. For the complete list of endpoints and their parameters, see the [Bridge documentation](https://github.com/notibuzz/noti-sender-bridge).

### Main Endpoints

- **Sessions**: `listSessions`, `getSession`, `getSessionMe`
- **Profile**: `getMyProfile`, `setProfileName`, `setProfileStatus`, `setProfilePicture`, `deleteProfilePicture`
- **Chatting**: `sendMessage` (generic endpoint for all types: text, image, file, voice, video, poll, location, contact-vcard, forward, list, seen), `reaction`, `startTyping`, `stopTyping`
- **Status**: `statusText`, `statusImage`, `statusVoice`, `statusVideo`, `statusDelete`
- **Chats**: `chatsGet`, `chatsOverviewGet`, `chatsOverviewPost`, `chatsGetMessages`, `chatsReadMessages`, `chatsGetMessage`, `chatsDeleteMessage`, `chatsEditMessage`, `chatsPinMessage`, `chatsUnpinMessage`
- **Contacts**: `contactsGetAll`, `contactsGetBasic`, `contactsCheckExists`, `contactsProfilePicture`, `contactsGetAbout`, `contactsBlock`, `contactsUnblock`, `contactsUpsert`
- **Bulk**: `bulkStopCampaign`, `bulkResumeCampaign`, `bulkAvailability`

## Contributing

Contributions are welcome. Please:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for more details.

## Support

- **Issues**: [GitHub Issues](https://github.com/notibuzzcloud/noti-sdk-js/issues)
- **Documentation**: [README](README.md)

## Changelog

### 1.0.1
- Initial release
- Full support for all Bridge endpoints
- Bulk messaging with anti-ban control
- Async queue
- Campaign control
