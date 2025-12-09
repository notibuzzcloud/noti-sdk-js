import { configureClient, deleteProfilePicture } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('🗑️ Eliminando foto de perfil...')
    
    const result = await deleteProfilePicture({ 
      pathParams: { session: sessionName }
    })
    
    console.log('✅ Foto de perfil eliminada:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

