import { configureClient, contactsCheckExists } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const phone = '51111111111@c.us' // Number without + or suffix
    
    console.log(`🔍 Checking if number ${phone} exists on WhatsApp...`)
    
    const result = await contactsCheckExists({
      query: {
        session: sessionName,
        phone: phone
      }
    })
    
    if (result.numberExists) {
      console.log(`✅ Number ${phone} is registered on WhatsApp`)
      console.log(`   Chat ID: ${result.chatId}`)
    } else {
      console.log(`❌ Number ${phone} is NOT registered on WhatsApp`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

