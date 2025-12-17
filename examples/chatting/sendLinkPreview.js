import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us' // Change to your real chatId
    
    console.log('🔗 Sending message with custom preview...')
    
    const result = await sendMessage({
      body: {
        type: 'link-custom-preview',
        payload: {
          session: sessionName,
          chatId: chatId,
          text: 'Check this out! https://github.com/',
          linkPreviewHighQuality: true,
          preview: {
            image: {
              url: 'https://picsum.photos/400/300'
            },
            url: 'https://github.com/',
            title: 'Your Title',
            description: 'Check this out, amazing!'
          },
          reply_to: null
        }
      }
    })
    
    console.log('✅ Message with preview sent:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

