import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📊 Enviando encuesta...')
    
    const result = await sendMessage({
      body: {
        type: 'poll',
        payload: {
          session: sessionName,
          chatId: chatId,
          poll: {
            name: '¿Cuál es tu color favorito?',
            options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
            selectableOptionsCount: 1 // 1 = selección única, >1 = múltiple
          }
        }
      }
    })
    
    console.log('✅ Encuesta enviada:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

