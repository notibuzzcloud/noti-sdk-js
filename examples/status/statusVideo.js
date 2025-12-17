import { configureClient, statusVideo } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('🎥 Creating video status...')
    
    // Video must be MP4 with H.264 codec
    // Note: id must be null, contacts are automatically filtered (duplicates and malformed are omitted)
    
    // Option 1: From URL
    const result = await statusVideo({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us", "51111111111@c.us"], // Duplicates are automatically filtered
        caption: 'Check out this video!',
        file: {
          mimetype: 'video/mp4',
          filename: 'status.mp4',
          url: 'https://example.com/status.mp4' // ⚠️ Change to your valid URL
        },
        convert: true // true if you need format conversion (e.g., other formats to MP4/H.264)
      }
    })
    
    console.log('✅ Video status created (URL):', result)
    
    // Option 2: From base64
    const result2 = await statusVideo({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us"], // Duplicates and malformed are automatically filtered
        caption: 'Video from base64',
        file: {
          mimetype: 'video/mp4',
          filename: 'status.mp4',
          data: 'AAAAGGZ0eXBt....' // Base64 of MP4 file
        },
        convert: false
      }
    })
    
    console.log('✅ Video status created (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

