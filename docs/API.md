# API Reference

## Configuration

### `configureClient(config: ClientConfig)`
### `configureClient(notiUrl: string, notiApiKey: string)`

Configures the global client with the Bridge base URL and API Key.

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

**Parameters (object syntax):**
- `config.notiUrl: string` - Bridge base URL
- `config.notiApiKey: string` - API Key for authentication

### `getClient(): NotiSenderClient`

Gets the configured client. Throws an error if not configured.

```typescript
import { getClient } from '@notibuzz/noti-sdk-js'

const client = getClient()
```

## Sessions

### `listSessions(options?)`

Lists all available sessions.

**Parameters:**
- `options.query.all?: boolean` - Include sessions in STOPPED state

**Example:**
```typescript
const sessions = await listSessions({ query: { all: true } })
```

### `getSession(options)`

Gets detailed information about a session.

**Parameters:**
- `options.pathParams.session: string` - Session name

**Example:**
```typescript
const session = await getSession({ pathParams: { session: 'default' } })
```

### `getSessionMe(options)`

Gets information about the authenticated account.

**Parameters:**
- `options.pathParams.session: string` - Session name

**Example:**
```typescript
const me = await getSessionMe({ pathParams: { session: 'default' } })
```

## Profile

### `getMyProfile(options)`

Gets the account profile information.

**Parameters:**
- `options.pathParams.session: string` - Session name

### `setProfileName(options)`

Updates the profile name.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.name: string` - New name

### `setProfileStatus(options)`

Updates the profile status (About).

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.status: string` - New status text

### `setProfilePicture(options)`

Updates the profile picture.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.file: { mimetype: string, filename?: string, url?: string, data?: string }` - Image file

### `deleteProfilePicture(options)`

Deletes the profile picture.

**Parameters:**
- `options.pathParams.session: string` - Session name

## Chatting

### `sendMessage(options)`

Sends messages in batch or individually using the generic `/api/sendMessage` endpoint.

**Supported types:** `text`, `image`, `file`, `voice`, `video`, `link-custom-preview`, `seen`, `poll`, `location`, `contact-vcard`, `forward`, `list`

**Parameters:**
- `options.body.type?: MessageType` - Message type (for individual mode)
- `options.body.payload?: any` - Message payload (for individual mode)
- `options.body.messages?: Array<{ type: MessageType, payload: any }>` - Array of messages (for bulk mode)
- `options.body.intervalMs?: number` - Interval between messages in milliseconds (for bulk mode)
- `options.body.meta?: { campaignId?: string, requester?: string, origin?: string }` - Campaign metadata
- `options.async?: boolean` - Whether to enqueue the message

**Example (individual):**
```typescript
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
```

**Example (bulk):**
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
          text: 'Message 1'
        }
      }
    ]
  }
})
```

### `reaction(options)`

Adds or removes a reaction on a message.

**Parameters:**
- `options.body.session: string` - Session name
- `options.body.messageId: string` - Message ID
- `options.body.reaction: string` - Reaction emoji (empty string to remove)

### `startTyping(options)`

Starts typing status in a chat.

**Parameters:**
- `options.body.session: string` - Session name
- `options.body.chatId: string` - Chat ID

### `stopTyping(options)`

Stops typing status in a chat.

**Parameters:**
- `options.body.session: string` - Session name
- `options.body.chatId: string` - Chat ID

## Status

### `statusText(options)`

Publishes a text status.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.contacts: string[]` - Array of contact IDs (empty array for everyone)
- `options.body.text: string` - Status text
- `options.body.backgroundColor?: string` - Background color
- `options.body.font?: number` - Font type
- `options.body.linkPreview?: boolean` - Enable link preview

### `statusImage(options)`

Publishes an image status.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.contacts: string[]` - Array of contact IDs
- `options.body.file: { mimetype: string, filename?: string, url?: string, data?: string }` - Image file
- `options.body.caption?: string` - Image caption

### `statusVoice(options)`

Publishes a voice status.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.contacts: string[]` - Array of contact IDs
- `options.body.file: { mimetype: string, url?: string, data?: string }` - Audio file (OGG/OPUS)
- `options.body.convert?: boolean` - Convert format if needed

### `statusVideo(options)`

Publishes a video status.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.contacts: string[]` - Array of contact IDs
- `options.body.file: { mimetype: string, filename?: string, url?: string, data?: string }` - Video file (MP4/H.264)
- `options.body.caption?: string` - Video caption
- `options.body.convert?: boolean` - Convert format if needed

### `statusDelete(options)`

Deletes a previously sent status.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.id: string` - Status ID
- `options.body.contacts?: string[]` - Optional list of contacts to limit deletion

## Chats

### `chatsGet(options)`

Lists chats of the session.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.query?: Record<string, any>` - Query parameters

### `chatsOverviewGet(options)`

Gets chat overview (id, name, photo, last message).

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.query.limit?: number` - Number of results (default 20)
- `options.query.offset?: number` - Offset for pagination
- `options.query.ids?: string[]` - Filter by chat IDs

### `chatsOverviewPost(options)`

Gets chat overview using POST (allows more complex filters).

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.body.limit?: number` - Number of results
- `options.body.offset?: number` - Offset for pagination
- `options.body.ids?: string[]` - Filter by chat IDs

### `chatsGetMessages(options)`

Lists chat messages with filters and pagination.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.query.limit?: number` - Number of results (default 10)
- `options.query.offset?: number` - Offset for pagination
- `options.query.downloadMedia?: boolean` - Download media associated with messages

### `chatsReadMessages(options)`

Marks messages as read (latest first).

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.query.messages?: number` - Number of messages to mark as read
- `options.query.days?: number` - Number of days back (default 7)

### `chatsGetMessage(options)`

Gets a specific message by its ID.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.pathParams.messageId: string` - Message ID
- `options.query.downloadMedia?: boolean` - Download associated media

### `chatsDeleteMessage(options)`

Deletes a specific message from the chat by its ID.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.pathParams.messageId: string` - Message ID

### `chatsEditMessage(options)`

Edits the content of an existing message.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.pathParams.messageId: string` - Message ID
- `options.body.text: string` - New message text
- `options.body.linkPreview?: boolean` - Include link preview

### `chatsPinMessage(options)`

Pins a message within the chat for a specific duration.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.pathParams.messageId: string` - Message ID
- `options.body.duration: number` - Duration in seconds (e.g., 86400 for 24 hours)

### `chatsUnpinMessage(options)`

Removes the pin from a message within the chat.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.pathParams.messageId: string` - Message ID

## Contacts

### `contactsGetAll(options)`

Lists all contacts.

**Parameters:**
- `options.query.session: string` - Session name

### `contactsGetBasic(options)`

Returns basic contact data.

**Parameters:**
- `options.query.session: string` - Session name
- `options.query.contactId: string` - Contact ID (JID)

### `contactsCheckExists(options)`

Checks if a number exists on WhatsApp.

**Parameters:**
- `options.query.session: string` - Session name
- `options.query.phone: string` - Phone number (without + or suffix)

### `contactsProfilePicture(options)`

Returns the profile picture URL.

**Parameters:**
- `options.query.session: string` - Session name
- `options.query.contactId: string` - Contact ID
- `options.query.refresh?: boolean` - Force refresh from server

### `contactsUpsert(options)`

Creates or updates a contact.

**Parameters:**
- `options.pathParams.session: string` - Session name
- `options.pathParams.chatId: string` - Chat ID
- `options.body.firstName?: string` - First name
- `options.body.lastName?: string` - Last name

## Bulk

### `bulkStopCampaign(options)`

Stops a bulk campaign currently being processed.

**Parameters:**
- `options.pathParams.id: string` - Campaign ID
- `options.body.sessions?: string[]` - Optional list of sessions to stop

### `bulkResumeCampaign(options)`

Resumes a bulk campaign by clearing the cancel flag.

**Parameters:**
- `options.pathParams.id: string` - Campaign ID
- `options.body.sessions?: string[]` - Optional list of sessions to resume

### `bulkAvailability(options)`

Checks bulk campaign availability without modifying locks.

**Parameters:**
- `options.query.requester?: string` - Requester identifier

**Returns:**
```typescript
{
  available: boolean,
  current: number,
  max: number,
  origin: string,
  requester?: string
}
```
