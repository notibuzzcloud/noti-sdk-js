import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📊 Sending poll...')
    
    const result = await sendMessage({
      body: {
        type: 'poll',
        payload: {
          session: sessionName,
          chatId: chatId,
          poll: {
            name: 'What is your favorite color?',
            options: ['Red', 'Blue', 'Green', 'Yellow'],
            selectableOptionsCount: 1 // 1 = single selection, >1 = multiple
          }
        }
      }
    })
    
    console.log('✅ Poll sent:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

