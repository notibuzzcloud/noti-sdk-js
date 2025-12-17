import { configureClient, reaction } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const messageId = 'true_51111111111@c.us_3EB09B7F7C4D979850CD33' // Change to a real messageId
    
    console.log('👍 Adding reaction to message...')
    
    const result = await reaction({
      body: {
        session: sessionName,
        messageId: messageId,
        reaction: '👍' // Reaction emoji
      }
    })
    
    console.log('✅ Reaction added:', result)
    
    // To remove a reaction, send an empty string
    /*
    const result2 = await reaction({
      body: {
        session: sessionName,
        messageId: messageId,
        reaction: '' // Empty string removes the reaction
      }
    })
    */
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

