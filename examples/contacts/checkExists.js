import { configureClient, contactsCheckExists } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const phone = '51111111111@c.us' // Número sin + ni sufijo
    
    console.log(`🔍 Verificando si el número ${phone} existe en WhatsApp...`)
    
    const result = await contactsCheckExists({
      query: {
        session: sessionName,
        phone: phone
      }
    })
    
    if (result.numberExists) {
      console.log(`✅ El número ${phone} está registrado en WhatsApp`)
      console.log(`   Chat ID: ${result.chatId}`)
    } else {
      console.log(`❌ El número ${phone} NO está registrado en WhatsApp`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

