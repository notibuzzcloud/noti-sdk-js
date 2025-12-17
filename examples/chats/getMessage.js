import { configureClient, chatsGetMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    const messageId = 'true_51111111111@c.us_3EB02990E1DF2238954274' // Change to a real messageId
    
    console.log('📨 Getting specific message...')
    
    const message = await chatsGetMessage({
      pathParams: {
        session: sessionName,
        chatId: chatId,
        messageId: messageId
      },
      query: {
        downloadMedia: true
      }
    })
    
    console.log('✅ Message obtained:')
    console.log(`  ID: ${message.id}`)
    console.log(`  From: ${message.fromMe ? 'Me' : message.from}`)
    console.log(`  Body: ${message.body || '(media)'}`)
    console.log(`  Timestamp: ${new Date(message.timestamp * 1000).toLocaleString()}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

