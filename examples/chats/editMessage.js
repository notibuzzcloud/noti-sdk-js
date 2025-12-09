import { configureClient, chatsEditMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    const messageId = 'true_25718918484128@lid_A5CABC16A874A8F5923750CA14E5A141'
    
    console.log('✏️ Editando mensaje...')
    
    const result = await chatsEditMessage({
      pathParams: {
        session: sessionName,
        chatId: chatId,
        messageId: messageId
      },
      body: {
        text: 'Rawayana y Danny Ocean ✏️',
        linkPreview: true,
        linkPreviewHighQuality: false
      }
    })
    
    console.log('✅ Mensaje editado:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

