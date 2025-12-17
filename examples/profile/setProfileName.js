import { configureClient, setProfileName } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const newName = 'My New Name'
    
    console.log(`✏️ Updating profile name to "${newName}"...`)
    
    const result = await setProfileName({ 
      pathParams: { session: sessionName },
      body: { name: newName }
    })
    
    console.log('✅ Name updated:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

