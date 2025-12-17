import { configureClient, statusImage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('📷 Creating image status...')
    
    // Option 1: From URL
    // Note: id must be null, contacts are automatically filtered (duplicates and malformed are omitted)
    const result = await statusImage({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us", "51111111111@c.us", "51941404551@c.us", "51111111111@c.us"], // Duplicates are automatically filtered
        caption: 'My new status with image 📸',
        file: {
          mimetype: 'image/jpeg',
          filename: 'status.jpg',
          url: 'https://picsum.photos/400/300'
        }
      }
    })
    
    console.log('✅ Image status created (URL):', result)
    
    // Option 2: From base64
    const result2 = await statusImage({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us"], // Duplicates and malformed are automatically filtered
        caption: 'Status from base64',
        file: {
          mimetype: 'image/jpeg',
          data: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=' // Base64 example
        }
      }
    })
    
    console.log('✅ Image status created (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

