import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('🎥 Sending video...')
    
    // WhatsApp only accepts MP4 with H.264 codec (libx264)
    // If you don't have the correct format, use "convert": true
    
    // Option 1: From URL
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
          caption: 'Check out this video!',
          asNote: false,
          convert: false
        }
      }
    })
    
    console.log('✅ Video sent (URL):', result)
    
    // Option 2: From base64
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
          caption: 'Video from base64',
          asNote: false,
          convert: false
        }
      }
    })
    
    console.log('✅ Video sent (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

