import { configureClient, setProfilePicture } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('📷 Updating profile picture...')
    
    // Option 1: From URL
    const result = await setProfilePicture({ 
      pathParams: { session: sessionName },
      body: {
        file: {
          mimetype: 'image/jpeg',
          filename: 'avatar.jpg',
          url: 'https://picsum.photos/200/200' // Change to your URL
        }
      }
    })
    
    console.log('✅ Profile picture updated:', result)
    
    // Option 2: From base64 (uncomment to use)
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

