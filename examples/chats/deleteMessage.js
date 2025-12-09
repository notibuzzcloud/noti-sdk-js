import { configureClient, chatsDeleteMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    const messageId = 'true_25718918484128@lid_A5F0519EC89D68E4352A917766747028'
    
    console.log('🗑️ Eliminando mensaje...')
    
    const result = await chatsDeleteMessage({
      pathParams: {
        session: sessionName,
        chatId: chatId,
        messageId: messageId
      }
    })
    
    console.log('✅ Mensaje eliminado:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

