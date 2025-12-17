import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    const chatId = '51111111111@c.us'
    
    console.log('🖼️ Sending image...')
    
    // Option 1: From URL
    const result = await sendMessage({
      body: {
        type: 'image',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'image/jpeg',
            filename: 'photo.jpg',
            url: 'https://picsum.photos/400/300',
          },
          caption: 'Check out this image from the SDK! 📸'
        }
      }
    })
    
    console.log('✅ Image sent (URL):', result)
    
    // Option 2: From base64
    const result2 = await sendMessage({
      body: {
        type: 'image',
        payload: {
          session: sessionName,
          chatId: chatId,
          file: {
            mimetype: 'image/jpeg',
            filename: 'photo.jpg',
            data: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          },
          caption: 'Image from base64'
        }
      }
    })
    
    console.log('✅ Image sent (base64):', result2)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

