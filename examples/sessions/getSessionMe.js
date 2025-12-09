import { configureClient, getSessionMe } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log(`👤 Obteniendo información de la cuenta autenticada...`)
    
    const me = await getSessionMe({ 
      pathParams: { session: sessionName } 
    })
    
    console.log('✅ Información de la cuenta:')
    console.log(`  ID: ${me.id}`)
    console.log(`  Nombre: ${me.pushName || 'Sin nombre'}`)
    if (me.lid) {
      console.log(`  LID: ${me.lid}`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

