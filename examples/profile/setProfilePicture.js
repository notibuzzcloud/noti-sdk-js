import { configureClient, setProfilePicture } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('📷 Actualizando foto de perfil...')
    
    // Opción 1: Desde URL
    const result = await setProfilePicture({ 
      pathParams: { session: sessionName },
      body: {
        file: {
          mimetype: 'image/jpeg',
          filename: 'avatar.jpg',
          url: 'https://picsum.photos/200/200' // Cambia por tu URL
        }
      }
    })
    
    console.log('✅ Foto de perfil actualizada:', result)
    
    // Opción 2: Desde base64 (descomenta para usar)
    /*
    const result2 = await setProfilePicture({ 
      pathParams: { session: sessionName },
      body: {
        file: {
          mimetype: 'image/jpeg',
          filename: 'avatar.jpg',
          data: 'base64_encoded_image_data_here'
        }
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

