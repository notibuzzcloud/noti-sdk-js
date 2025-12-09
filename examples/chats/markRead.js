import { configureClient, chatsReadMessages } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('✅ Marcando mensajes como leídos...')
    
    const result = await chatsReadMessages({
      pathParams: {
        session: sessionName,
        chatId: chatId
      },
      query: {
        messages: 30, // Cantidad de mensajes a marcar
        days: 7 // Días hacia atrás
      }
    })
    
    console.log(`✅ Mensajes marcados como leídos:`, result.ids?.length || 0)
    if (result.ids) {
      console.log('IDs de mensajes:', result.ids)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

