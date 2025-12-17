# Usage Examples for @notibuzz/noti-sdk-js

This folder contains practical examples organized by categories to help you use the SDK.

## Configuration

Before running the examples, configure the environment variables:

```bash
export NOTI_URL="https://your_domain_notibuzz"
export NOTI_KEY="your_api_key"
export NOTI_SESSION_NAME="default"  # Session name to use
```

Or modify directly in each file:

```javascript
configureClient({
  notiUrl: 'https://your_domain_notibuzz',
  notiApiKey: 'your_api_key'
})

const sessionName = process.env.NOTI_SESSION_NAME || 'default'
```

## Structure

Examples are organized in subdirectories according to API categories:

### 📁 Sessions
- `listSessions.js` - List all sessions
- `getSession.js` - Get session information
- `getSessionMe.js` - Get authenticated account information

### 👤 Profile
- `getMyProfile.js` - Get profile information
- `setProfileName.js` - Update profile name
- `setProfileStatus.js` - Update status (About)
- `setProfilePicture.js` - Update profile picture
- `deleteProfilePicture.js` - Delete profile picture

### 💬 Chatting
- `sendText.js` - Send text message
- `sendImage.js` - Send image
- `sendFile.js` - Send file
- `sendPoll.js` - Send poll
- `sendLocation.js` - Send location
- `sendBulkMessages.js` - Bulk message sending
- `reaction.js` - Add/remove reaction
- `startTyping.js` / `stopTyping.js` - Start/stop typing status

### 📱 Status
- `statusText.js` - Create text status
- `statusImage.js` - Create image status
- `statusVoice.js` - Create voice status
- `statusVideo.js` - Create video status
- `statusDelete.js` - Delete status

### 💬 Chats
- `listChats.js` - List chats
- `getMessages.js` - Get chat messages
- `getMessage.js` - Get a specific message
- `markRead.js` - Mark messages as read
- `editMessage.js` - Edit message
- `pinMessage.js` - Pin/unpin message

### 📇 Contacts
- `getContact.js` - Get contact information
- `checkExists.js` - Check if a number exists on WhatsApp
- `getProfilePicture.js` - Get profile picture
- `upsert.js` - Create/update contact

## Execution

To run an example:

```bash
# From the project root
node examples/sessions/listSessions.js

# Or from the examples folder
cd examples
node sessions/listSessions.js
```

## Important Notes

1. **Build before running**: Make sure you've run `npm run build` to generate files in `dist/`

2. **Environment variables**: Examples use:
   - `NOTI_URL` - Bridge URL (default: `'your_base_url'`)
   - `NOTI_KEY` - API Key (default: `your_api_key`)
   - `NOTI_SESSION_NAME` - Session name (default: `default`)

3. **Real IDs**: Replace example IDs (chatId, messageId, etc.) with real values from your account

4. **Errors**: All examples include basic error handling

## Next Steps

- Review the [complete documentation](../README.md)
- Check the [API reference](../docs/API.md)
- Read the [quick start guide](../docs/quickstart.md)
