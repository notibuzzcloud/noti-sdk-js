import { configureClient, chatsReadMessages } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('✅ Marking messages as read...')
    
    const result = await chatsReadMessages({
      pathParams: {
        session: sessionName,
        chatId: chatId
      },
      query: {
        messages: 30, // Number of messages to mark
        days: 7 // Days back
      }
    })
    
    console.log(`✅ Messages marked as read:`, result.ids?.length || 0)
    if (result.ids) {
      console.log('Message IDs:', result.ids)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

