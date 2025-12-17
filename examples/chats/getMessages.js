import { configureClient, chatsGetMessages } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log(`📨 Getting messages from chat ${chatId}...`)
    
    const messages = await chatsGetMessages({
      pathParams: {
        session: sessionName,
        chatId: chatId
      },
      query: {
        limit: 200,
        offset: 0,
        downloadMedia: true
      }
    })
    
    console.log(`✅ Found ${messages.length} messages:`)
    messages.forEach((msg) => {
      //console.log(`  ID: ${msg.id}`)
      console.log(`  [${msg.fromMe ? 'Me' : msg.from}]: ${msg.body || '(media)'}`)
    })
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

