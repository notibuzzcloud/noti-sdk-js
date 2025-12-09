import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('🎥 Enviando video...')
    
    // WhatsApp acepta solo MP4 con códec H.264 (libx264)
    // Si no tienes el formato correcto, usa "convert": true
    
    // Opción 1: Desde URL
    const result = await sendMessage({
      body: {
        type: 'video',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'video/mp4',
            filename: 'video.mp4',
            url: 'https://example.com/video.mp4'
          },
          caption: 'Mira este video!',
          asNote: false,
          convert: false
        }
      }
    })
    
    console.log('✅ Video enviado (URL):', result)
    
    // Opción 2: Desde base64
    const result2 = await sendMessage({
      body: {
        type: 'video',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'video/mp4',
            filename: 'video.mp4',
            data: 'AAAAGGZ0eXBtcDQyAAAAAGlzb21tc....'
          },
          caption: 'Video desde base64',
          asNote: false,
          convert: false
        }
      }
    })
    
    console.log('✅ Video enviado (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

