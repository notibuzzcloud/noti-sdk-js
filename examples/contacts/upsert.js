import { configureClient, contactsUpsert } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📝 Creando/actualizando contacto...')
    
    const result = await contactsUpsert({
      pathParams: {
        session: sessionName,
        chatId: chatId
      },
      body: {
        firstName: 'Karina',
        lastName: 'Pereda Marcelo'
      }
    })
    
    console.log('✅ Contacto creado/actualizado:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

