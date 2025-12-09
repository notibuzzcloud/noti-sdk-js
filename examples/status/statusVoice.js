import { configureClient, statusVoice } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('🎤 Creando estado de voz...')
    
    // El archivo debe estar en formato OGG (OPUS)
    // Nota: id debe ser null, contacts se filtra automáticamente (duplicados y mal formados se omiten)
    
    // Opción 1: Desde URL
    const result = await statusVoice({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us", "51111111111@c.us", "51941404551@c.us", "51111111111@c.us"], // Duplicados se filtran automáticamente
        backgroundColor: '#38b42f',
        file: {
          mimetype: 'audio/ogg; codecs=opus',
          url: 'https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus' // URL válida de ejemplo
        },
        convert: true // true si necesitas conversión de formato (ej: MP3 a OGG)
      }
    })
    
    console.log('✅ Estado de voz creado (URL):', result)
    
    // Opción 2: Desde base64
    const result2 = await statusVoice({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us"], // Duplicados y mal formados se filtran automáticamente
        backgroundColor: '#38b42f',
        file: {
          mimetype: 'audio/ogg; codecs=opus',
          data: 'SUQzBAAAAAAAW....' // Base64 del archivo OGG/OPUS
        },
        convert: false
      }
    })
    
    console.log('✅ Estado de voz creado (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

