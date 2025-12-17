import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('📨 Sending bulk messages...')
    
    const result = await sendMessage({
      body: {
        intervalMs: 20000, // 20 seconds between messages
        messages: [
          {
            type: 'text',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              text: 'Message 1: Hello! 👋'
            }
          },
          {
            type: 'text',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              text: 'Message 2: How are you?'
            }
          },
          {
            type: 'image',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'image/jpeg',
                url: 'https://picsum.photos/400/300'
              },
              caption: 'Message 3: Bulk image (URL)'
            }
          },
          {
            type: 'image',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'image/jpeg',
                filename: 'photo.jpg',
                data: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              },
              caption: 'Message 4: Bulk image (base64)'
            }
          },
          {
            type: 'file',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'application/pdf',
                filename: 'document.pdf',
                url: 'https://scrumguides.org/docs/scrumguide/v1/Scrum-Guide-ES.pdf'
              },
              caption: 'Message 5: File (URL)'
            }
          },
          {
            type: 'file',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'application/pdf',
                filename: 'document.pdf',
                data: '/9j/4AAQSkZJRgABAQAAAQABAAD.......'
              },
              caption: 'Message 6: File (base64)'
            }
          },
          {
            type: 'voice',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'audio/ogg; codecs=opus',
                url: 'https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus'
              },
              convert: false
            }
          },
          {
            type: 'voice',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'audio/ogg; codecs=opus',
                filename: 'voice-message.opus',
                data: 'T2dnUwACAAAAAAAAAAAAX3UXAAAAAJiLB2IBE09w....'
              },
              convert: false
            }
          },
          {
            type: 'video',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'video/mp4',
                filename: 'video.mp4',
                url: 'https://example.com/video.mp4'
              },
              caption: 'Message 9: Video (URL)',
              asNote: false,
              convert: false
            }
          },
          {
            type: 'video',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'video/mp4',
                filename: 'video.mp4',
                data: 'AAAAGGZ0eXBtcDQyAAAAAGlzb21tc....'
              },
              caption: 'Message 10: Video (base64)',
              asNote: false,
              convert: false
            }
          }
        ],
        meta: {
          campaignId: 'campaign-123',
          requester: 'my-app',
          origin: 'sdk-example'
        }
      }
    })
    
    console.log('✅ Bulk campaign enqueued:')
    console.log(`  Job ID: ${result.jobId}`)
    console.log(`  Messages: ${result.count}`)
    console.log(`  Interval: ${result.intervalMs}ms`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

