import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('📋 Enviando lista interactiva...')
    
    const result = await sendMessage({
      body: {
        type: 'list',
        payload: {
          session: sessionName,
          chatId: chatId,
          message: {
            title: 'Simple Menu',
            description: 'Please choose an option',
            footer: 'Thank you!',
            button: 'Choose',
            sections: [
              {
                title: 'Main',
                rows: [
                  {
                    title: 'Option 1',
                    rowId: 'option1',
                    description: "Option 1 description"
                  },
                  {
                    title: 'Option 2',
                    rowId: 'option2',
                    description: "Option 2 description"
                  },
                  {
                    title: 'Option 3',
                    rowId: 'option3',
                    description: "Option 3 description"
                  }
                ]
              }
            ]
          },
          reply_to: null
        }
      }
    })
    
    console.log('✅ Lista enviada:', result)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

