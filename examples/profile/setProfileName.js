import { configureClient, setProfileName } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const newName = 'Mi Nuevo Nombre'
    
    console.log(`✏️ Actualizando nombre del perfil a "${newName}"...`)
    
    const result = await setProfileName({ 
      pathParams: { session: sessionName },
      body: { name: newName }
    })
    
    console.log('✅ Nombre actualizado:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

