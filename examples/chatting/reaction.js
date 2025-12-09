import { configureClient, reaction } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const messageId = 'true_51111111111@c.us_3EB09B7F7C4D979850CD33' // Cambia por un messageId real
    
    console.log('👍 Agregando reacción a mensaje...')
    
    const result = await reaction({
      body: {
        session: sessionName,
        messageId: messageId,
        reaction: '👍' // Emoji de reacción
      }
    })
    
    console.log('✅ Reacción agregada:', result)
    
    // Para eliminar una reacción, envía una cadena vacía
    /*
    const result2 = await reaction({
      body: {
        session: sessionName,
        messageId: messageId,
        reaction: '' // Cadena vacía elimina la reacción
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

