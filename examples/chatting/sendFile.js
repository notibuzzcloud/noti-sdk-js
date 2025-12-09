import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📄 Enviando archivo...')
    
    // Opción 1: Desde URL
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
    
    console.log('✅ Archivo enviado (URL):', result)
    
    // Opción 2: Desde base64
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
    
    console.log('✅ Archivo enviado (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

