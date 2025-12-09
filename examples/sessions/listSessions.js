import { configureClient, listSessions } from '@notibuzz/noti-sdk-js'

// Configurar cliente
configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    console.log('📋 Listando todas las sesiones...')
    
    // Listar todas las sesiones (incluyendo STOPPED)
    const sessions = await listSessions({ 
      query: { all: true } 
    })
    
    console.log(`✅ Encontradas ${sessions.length} sesiones:`)
    sessions.forEach((session) => {
      console.log(`  - ${session.name}: ${session.status}`)
      if (session.me) {
        console.log(`    Usuario: ${session.me.pushName || session.me.id}`)
      }
    })
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

