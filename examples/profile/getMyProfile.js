import { configureClient, getMyProfile } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('👤 Getting profile information...')
    
    const profile = await getMyProfile({ 
      pathParams: { session: sessionName } 
    })
    
    console.log('✅ Profile:')
    console.log(JSON.stringify(profile, null, 2))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

