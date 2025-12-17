import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us' // Change to your real chatId
    
    console.log('💬 Sending text message...')
    
    const result = await sendMessage({
      body: {
        type: 'text',
        payload: {
          session: sessionName,
          chatId: chatId,
          text: 'Hello from @notibuzz/noti-sdk-js! 👋'
        }
      }
    })
    
    console.log('✅ Message sent:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

