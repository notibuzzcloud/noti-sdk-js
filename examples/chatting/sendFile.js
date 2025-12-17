import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📄 Sending file...')
    
    // Option 1: From URL
    const result = await sendMessage({
      body: {
        type: 'file',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'application/pdf',
            filename: 'documento.pdf',
            url: 'https://scrumguides.org/docs/scrumguide/v1/Scrum-Guide-ES.pdf'
          },
          caption: 'Documento importante 📄'
        }
      }
    })
    
    console.log('✅ File sent (URL):', result)
    
    // Option 2: From base64
    const result2 = await sendMessage({
      body: {
        type: 'file',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'application/pdf',
            filename: 'documento.pdf',
            data: '/9j/4AAQSkZJRgABAQAAAQABAAD.......'
          },
          caption: 'Documento desde base64'
        }
      }
    })
    
    console.log('✅ File sent (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

