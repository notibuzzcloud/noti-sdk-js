import { configureClient, setProfileStatus } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const newStatus = '🎉 Usando Noti Sender SDK!'
    
    console.log(`✏️ Updating profile status (About)...`)
    
    const result = await setProfileStatus({ 
      pathParams: { session: sessionName },
      body: { status: newStatus }
    })
    
    console.log('✅ Status updated:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

