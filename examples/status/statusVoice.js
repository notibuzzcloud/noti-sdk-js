import { configureClient, statusVoice } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('🎤 Creating voice status...')
    
    // File must be in OGG (OPUS) format
    // Note: id must be null, contacts are automatically filtered (duplicates and malformed are omitted)
    
    // Option 1: From URL
    const result = await statusVoice({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us", "51111111111@c.us", "51941404551@c.us", "51111111111@c.us"], // Duplicates are automatically filtered
        backgroundColor: '#38b42f',
        file: {
          mimetype: 'audio/ogg; codecs=opus',
          url: 'https://your-voice-file.opus' // Valid example URL
        },
        convert: true // true if you need format conversion (e.g., MP3 to OGG)
      }
    })
    
    console.log('✅ Voice status created (URL):', result)
    
    // Option 2: From base64
    const result2 = await statusVoice({
      pathParams: { session: sessionName },
      body: {
        id: null, // Required: must be null
        contacts: ["51111111111@c.us"], // Duplicates and malformed are automatically filtered
        backgroundColor: '#38b42f',
        file: {
          mimetype: 'audio/ogg; codecs=opus',
          data: 'SUQzBAAAAAAAW....' // Base64 of OGG/OPUS file
        },
        convert: false
      }
    })
    
    console.log('✅ Voice status created (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

