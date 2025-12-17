import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('🎤 Sending voice note...')
    
    // WhatsApp only accepts files with OPUS encoding packaged in an OGG container
    // If you have a file in another format (like MP3), you can use "convert": true
    
    // Option 1: From URL
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
    
    console.log('✅ Voice note sent (URL):', result)
    
    // Option 2: From base64
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
    
    console.log('✅ Voice note sent (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

