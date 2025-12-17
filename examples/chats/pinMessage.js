import { configureClient, chatsPinMessage, chatsUnpinMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    const messageId = 'false_51111111111@c.us_AAAAAAAAAAAAAAAAAAAA'
    
    console.log('📌 Pinning message...')
    
    // Pin for 24 hours (86400 seconds)
    const result = await chatsPinMessage({
      pathParams: {
        session: sessionName,
        chatId: chatId,
        messageId: messageId
      },
      body: {
        duration: 86400 // 24 hours
        // 7 days = 604800
        // 30 days = 2592000
      }
    })
    
    console.log('✅ Message pinned:', result)
    
    // To unpin:
    /*
    const result2 = await chatsUnpinMessage({
      pathParams: {
        session: sessionName,
        chatId: chatId,
        messageId: messageId
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

