import { configureClient, contactsProfilePicture } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const contactId = '51111111111@c.us'
    
    console.log(`📷 Obteniendo foto de perfil del contacto...`)
    
    const result = await contactsProfilePicture({
      query: {
        session: sessionName,
        contactId: contactId,
        refresh: false // true para forzar actualización
      }
    })
    
    if (result.profilePictureURL) {
      console.log('✅ Foto de perfil encontrada:')
      console.log(`   URL: ${result.profilePictureURL}`)
    } else {
      console.log('ℹ️ El contacto no tiene foto de perfil o es privada')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

