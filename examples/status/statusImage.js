import { configureClient, statusImage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('📷 Creando estado de imagen...')
    
    // Opción 1: Desde URL
    // Nota: id debe ser null, contacts se filtra automáticamente (duplicados y mal formados se omiten)
    const result = await statusImage({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us", "51111111111@c.us", "51941404551@c.us", "51111111111@c.us"], // Duplicados se filtran automáticamente
        caption: 'Mi nuevo estado con imagen 📸',
        file: {
          mimetype: 'image/jpeg',
          filename: 'status.jpg',
          url: 'https://picsum.photos/400/300'
        }
      }
    })
    
    console.log('✅ Estado de imagen creado (URL):', result)
    
    // Opción 2: Desde base64
    const result2 = await statusImage({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us"], // Duplicados y mal formados se filtran automáticamente
        caption: 'Estado desde base64',
        file: {
          mimetype: 'image/jpeg',
          data: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=' // Ejemplo de base64
        }
      }
    })
    
    console.log('✅ Estado de imagen creado (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

