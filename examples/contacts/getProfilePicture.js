import { configureClient, contactsProfilePicture } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const contactId = '51111111111@c.us'
    
    console.log(`📷 Getting contact profile picture...`)
    
    const result = await contactsProfilePicture({
      query: {
        session: sessionName,
        contactId: contactId,
        refresh: false // true to force update
      }
    })
    
    if (result.profilePictureURL) {
      console.log('✅ Profile picture found:')
      console.log(`   URL: ${result.profilePictureURL}`)
    } else {
      console.log('ℹ️ Contact does not have a profile picture or it is private')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

