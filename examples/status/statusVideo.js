import { configureClient, statusVideo } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('🎥 Creando estado de video...')
    
    // El video debe ser MP4 con códec H.264
    // Nota: id debe ser null, contacts se filtra automáticamente (duplicados y mal formados se omiten)
    
    // Opción 1: Desde URL
    const result = await statusVideo({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us", "51111111111@c.us"], // Duplicados se filtran automáticamente
        caption: 'Mira este video!',
        file: {
          mimetype: 'video/mp4',
          filename: 'status.mp4',
          url: 'https://example.com/status.mp4' // ⚠️ Cambia por tu URL válida
        },
        convert: true // true si necesitas conversión de formato (ej: otros formatos a MP4/H.264)
      }
    })
    
    console.log('✅ Estado de video creado (URL):', result)
    
    // Opción 2: Desde base64
    const result2 = await statusVideo({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us"], // Duplicados y mal formados se filtran automáticamente
        caption: 'Video desde base64',
        file: {
          mimetype: 'video/mp4',
          filename: 'status.mp4',
          data: 'AAAAGGZ0eXBt....' // Base64 del archivo MP4
        },
        convert: false
      }
    })
    
    console.log('✅ Estado de video creado (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

