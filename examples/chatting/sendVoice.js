import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('🎤 Enviando nota de voz...')
    
    // WhatsApp solo acepta archivos con codificación OPUS y empaquetados en un contenedor OGG
    // Si tienes un archivo en otro formato (como MP3), puedes usar "convert": true
    
    // Opción 1: Desde URL
    const result = await sendMessage({
      body: {
        type: 'voice',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'audio/ogg; codecs=opus',
            url: 'https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus'
          },
          convert: false
        }
      }
    })
    
    console.log('✅ Nota de voz enviada (URL):', result)
    
    // Opción 2: Desde base64
    const result2 = await sendMessage({
      body: {
        type: 'voice',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'audio/ogg; codecs=opus',
            filename: 'voice-message.opus',
            data: 'T2dnUwACAAAAAAAAAAAAX3UXAAAAAJiLB2IBE09w....'
          },
          convert: false
        }
      }
    })
    
    console.log('✅ Nota de voz enviada (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

