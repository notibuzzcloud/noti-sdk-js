import { configureClient, statusText } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'

    console.log('📝 Creando estado de texto...')

    const result = await statusText({
      pathParams: { session: sessionName },
      body: {
        id: null, // Requerido: debe ser null
        contacts: ["51111111111@c.us", "51111111111@c.us"], // Duplicados y mal formados se filtran automáticamente
        text: '¡Mira mi nuevo estado! 🎉',
        backgroundColor: '#38b42f',
        font: 0,
        linkPreview: true,
        linkPreviewHighQuality: false
      }
    })

    console.log('✅ Estado de texto creado:', result)

    // Para enviar a contactos específicos:
    /*
    const result2 = await statusText({
      pathParams: { session: sessionName },
      body: {
        contacts: ['51987654321@c.us', '51987654322@c.us'],
        text: 'Estado solo para algunos contactos',
        backgroundColor: '#38b42f',
        font: 0
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main().then((result) => {
  console.log('✅ Estado de texto creado:', result)
}).catch((error) => {
  console.error('❌ Error:', error)
}).finally(() => {
  console.log('Finalizado')
})

