import { configureClient, statusText } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'

    console.log('📝 Creating text status...')

    const result = await statusText({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us", "51111111111@c.us"], // Duplicates and malformed are automatically filtered
        text: 'Check out my new status! 🎉',
        backgroundColor: '#38b42f',
        font: 0,
        linkPreview: true,
        linkPreviewHighQuality: false
      }
    })

    console.log('✅ Text status created:', result)

    // To send to specific contacts:
    /*
    const result2 = await statusText({
      pathParams: { session: sessionName },
      body: {
        contacts: ['51987654321@c.us', '51987654322@c.us'],
        text: 'Status only for some contacts',
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
  console.log('✅ Text status created:', result)
}).catch((error) => {
  console.error('❌ Error:', error)
}).finally(() => {
  console.log('Finished')
})

