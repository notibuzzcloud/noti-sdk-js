import { configureClient, listSessions } from '@notibuzz/noti-sdk-js'

// Configure client
configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    console.log('📋 Listing all sessions...')
    
    // List all sessions (including STOPPED)
    const sessions = await listSessions({ 
      query: { all: true } 
    })
    
    console.log(`✅ Found ${sessions.length} sessions:`)
    sessions.forEach((session) => {
      console.log(`  - ${session.name}: ${session.status}`)
      if (session.me) {
        console.log(`    User: ${session.me.pushName || session.me.id}`)
      }
    })
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

