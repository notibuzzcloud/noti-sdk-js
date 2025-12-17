import { configureClient, statusDelete } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const statusId = '3EB0D04B6D96D71FEDC2AD' // ID of the status to delete
    
    console.log('🗑️ Deleting status...')
    
    // Note: id must be a valid string (status ID), contacts must have at least one element
    const result = await statusDelete({
      pathParams: { session: sessionName },
      body: {
        id: statusId, // Required: ID of the status to delete (string)
        contacts: ["51111111111@c.us", "51111111111@c.us"] // Required: at least one contact (duplicates and malformed are automatically filtered)
      }
    })
    
    console.log('✅ Status deleted:', result)
    
    // Example with a single contact:
    /*
    const result2 = await statusDelete({
      pathParams: { session: sessionName },
      body: {
        id: statusId, // ID of the status to delete
        contacts: ['51987654321@c.us'] // Minimum one contact required
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

