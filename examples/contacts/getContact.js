import { configureClient, contactsGetBasic } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const contactId = '51111111111@c.us'
    
    console.log(`👤 Obteniendo información del contacto ${contactId}...`)
    
    const contact = await contactsGetBasic({
      query: {
        session: sessionName,
        contactId: contactId
      }
    })
    
    console.log('✅ Información del contacto:')
    console.log(`  ID: ${contact.id}`)
    console.log(`  Nombre: ${contact.name || 'Sin nombre'}`)
    if (contact.pushname) {
      console.log(`  Push Name: ${contact.pushname}`)
    }
    if (contact.lid) {
      console.log(`  LID: ${contact.lid}`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

