import { configureClient, chatsOverviewGet } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('💬 Listando chats...')
    
    const chats = await chatsOverviewGet({
      pathParams: { session: sessionName },
      query: {
        limit: 20,
        offset: 0
      }
    })

    console.log('Chats:', JSON.stringify(chats, null, 2))
    
    console.log(`✅ Encontrados ${chats.length} chats:`)
    chats.forEach((chat) => {
      console.log(`  - ${chat.name || chat.id}`)
      if (chat.lastMessage) {
        console.log(`    Último mensaje: ${chat.lastMessage.body || '(sin texto)'}`)
      }
    })
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

