import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us' // Cambia por el chatId real
    
    console.log('💬 Enviando mensaje de texto...')
    
    const result = await sendMessage({
      body: {
        type: 'text',
        payload: {
          session: sessionName,
          chatId: chatId,
          text: '¡Hola desde @notibuzz/noti-sdk-js! 👋'
        }
      }
    })
    
    console.log('✅ Mensaje enviado:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

