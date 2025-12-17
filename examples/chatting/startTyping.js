import { configureClient, startTyping } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('⌨️ Starting typing status...')
    
    const result = await startTyping({
      body: {
        session: sessionName,
        chatId: chatId
      }
    })
    
    console.log('✅ Typing status started:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

