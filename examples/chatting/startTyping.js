import { configureClient, startTyping } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('⌨️ Iniciando estado de escritura...')
    
    const result = await startTyping({
      body: {
        session: sessionName,
        chatId: chatId
      }
    })
    
    console.log('✅ Estado de escritura iniciado:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

