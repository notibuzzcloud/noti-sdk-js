import { configureClient, getSession } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log(`📄 Getting session information for "${sessionName}"...`)
    
    const session = await getSession({ 
      pathParams: { session: sessionName } 
    })
    
    console.log('✅ Session information:')
    console.log(JSON.stringify(session, null, 2))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

