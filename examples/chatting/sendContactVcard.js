import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us' // Chat where the contact will be sent
    
    console.log('👤 Sending contact (vCard)...')
    
    const result = await sendMessage({
      body: {
        type: 'contact-vcard',
        payload: {
          session: sessionName,
          chatId: chatId,
          contacts: [
            {
              fullName: 'Diego Quiroz',
              organization: 'HilOs Digital Factory',
              phoneNumber: '+51 949 203 347',
              whatsappId: '51949203346'
            }
          ],
          reply_to: null
        }
      }
    })
    
    console.log('✅ Contact sent:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

