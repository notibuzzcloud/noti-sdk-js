import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'

configureClient({
  notiUrl: process.env.NOTI_URL,
  notiApiKey: process.env.NOTI_KEY || 'your_api_key'
})

async function main() {
  try {
    const sessionName = process.env.NOTI_SESSION_NAME || 'default'
    
    console.log('📨 Enviando mensajes masivos...')
    
    const result = await sendMessage({
      body: {
        intervalMs: 20000, // 20 segundos entre mensajes
        messages: [
          {
            type: 'text',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              text: 'Mensaje 1: Hola! 👋'
            }
          },
          {
            type: 'text',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              text: 'Mensaje 2: ¿Cómo estás?'
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
              caption: 'Mensaje 3: Imagen masiva (URL)'
            }
          },
          {
            type: 'image',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'image/jpeg',
                filename: 'foto.jpg',
                data: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              },
              caption: 'Mensaje 4: Imagen masiva (base64)'
            }
          },
          {
            type: 'file',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'application/pdf',
                filename: 'documento.pdf',
                url: 'https://scrumguides.org/docs/scrumguide/v1/Scrum-Guide-ES.pdf'
              },
              caption: 'Mensaje 5: Archivo (URL)'
            }
          },
          {
            type: 'file',
            payload: {
              session: sessionName,
              chatId: '51111111111@c.us',
              file: {
                mimetype: 'application/pdf',
                filename: 'documento.pdf',
                data: '/9j/4AAQSkZJRgABAQAAAQABAAD.......'
              },
              caption: 'Mensaje 6: Archivo (base64)'
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
              caption: 'Mensaje 9: Video (URL)',
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
              caption: 'Mensaje 10: Video (base64)',
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
    
    console.log('✅ Campaña masiva encolada:')
    console.log(`  Job ID: ${result.jobId}`)
    console.log(`  Mensajes: ${result.count}`)
    console.log(`  Intervalo: ${result.intervalMs}ms`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

main()

