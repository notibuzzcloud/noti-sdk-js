import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📍 Sending location...')
    
    const result = await sendMessage({
      body: {
        type: 'location',
        payload: {
          session: sessionName,
          chatId: chatId,
          latitude: 38.8937255, // Washington DC, USA
          longitude: -77.0969763,
          title: 'Our office',
          reply_to: null
        }
      }
    })
    
    console.log('✅ Location sent:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

