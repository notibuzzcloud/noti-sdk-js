import { configureClient, statusDelete } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const statusId = '3EB0D04B6D96D71FEDC2AD' // ID del estado a eliminar
    
    console.log('🗑️ Eliminando estado...')
    
    // Nota: id debe ser un string válido (ID del status), contacts debe tener al menos un elemento
    const result = await statusDelete({
      pathParams: { session: sessionName },
      body: {
        id: statusId, // Requerido: ID del status a eliminar (string)
        contacts: ["51111111111@c.us", "51111111111@c.us"] // Requerido: al menos un contacto (duplicados y mal formados se filtran automáticamente)
      }
    })
    
    console.log('✅ Estado eliminado:', result)
    
    // Ejemplo con un solo contacto:
    /*
    const result2 = await statusDelete({
      pathParams: { session: sessionName },
      body: {
        id: statusId, // ID del status a eliminar
        contacts: ['51987654321@c.us'] // Mínimo un contacto requerido
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

