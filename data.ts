import type { ApiCategory } from './types'

export const apiCategories: ApiCategory[] = [
  {
    key: 'sessions',
    name: 'Sessions',
    endpoints: [
      {
        id: 'list-sessions',
        method: 'GET',
        path: '/api/sessions',
        title: 'Listar sesiones',
        description: 'Lista todas las sesiones; usa ?all=true para incluir STOPPED.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        query: [
          {
            name: 'all',
            type: 'boolean',
            required: false,
            description: 'Incluye sesiones en estado STOPPED',
            example: 'true'
          }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/sessions?all=true' \
-H 'X-Api-Key: <api_key>'`,
        response: `[
  {
    "name": "default",
    "status": "WORKING",
    "config": { "proxy": null },
    "me": { "id": "573001234567@c.us", "pushName": "Notibuzz Bot", "lid": "123123@lid" }
  }
]`
      },
      {
        id: 'get-session',
        method: 'GET',
        path: '/api/sessions/{session}',
        title: 'Información de la sesión',
        description: 'Obtén información detallada de una sesión por nombre.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        request: `curl -X GET \\
'{{BASE_URL}}/api/sessions/default' \\
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "name": "default",
  "status": "WORKING",
  "config": { "proxy": null },
  "me": { "id": "573001234567@c.us", "pushName": "Notibuzz Bot", "lid": "123123@lid" }
}`
      },
      {
        id: 'get-session-me',
        method: 'GET',
        path: '/api/sessions/{session}/me',
        title: 'Cuenta autenticada',
        description: 'Información de la cuenta autenticada de la sesión.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        request: `curl -X GET \\
'{{BASE_URL}}/api/sessions/default/me' \\
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "id": "573001234567@c.us",
  "pushName": "Notibuzz Bot",
  "lid": "123123@lid"
}`
      }
    ]
  },
  {
    key: 'profile',
    name: 'Profile',
    endpoints: [
      {
        id: 'get-my-profile',
        method: 'GET',
        path: '/api/{session}/profile',
        title: 'Get my profile',
        description: 'Obtén la información del perfil de la cuenta.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/default/profile' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "id": "573001234567@c.us",
  "name": "Notibuzz Bot",
  "picture": "https://example.com/picture.jpg"
}`
      },
      {
        id: 'set-profile-name',
        method: 'PUT',
        path: '/api/{session}/profile/name',
        title: 'Set my profile name',
        description: 'Actualiza el nombre del perfil.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `{
  "name": "My New Name"
}`,
        request: `curl -X PUT \
'{{BASE_URL}}/api/default/profile/name' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "name": "My New Name"
}'`,
        response: `{
  "success": true
}`
      },
      {
        id: 'set-profile-status',
        method: 'PUT',
        path: '/api/{session}/profile/status',
        title: 'Set profile status (About)',
        description: 'Actualiza el estado (About) del perfil.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `{
  "status": "🎉 Hey there! I am using WhatsApp 🎉"
}`,
        request: `curl -X PUT \
'{{BASE_URL}}/api/default/profile/status' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "status": "🎉 Hey there! I am using WhatsApp 🎉"
}'`,
        response: `{
  "success": true
}`
      },
      {
        id: 'set-profile-picture',
        method: 'PUT',
        path: '/api/{session}/profile/picture',
        title: 'Set profile picture',
        description: 'Actualiza la foto de perfil; acepta archivo remoto o binario.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `{
  "file": {
    "mimetype": "image/jpeg",
    "filename": "avatar.jpg",
    "url": "https://example.com/avatar.jpg"
  }
}`,
        request: `curl -X PUT \
'{{BASE_URL}}/api/default/profile/picture' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "file": {
    "mimetype": "image/jpeg",
    "filename": "avatar.jpg",
    "url": "https://example.com/avatar.jpg"
  }
}'`,
        response: `{
  "success": true
}`
      },
      {
        id: 'delete-profile-picture',
        method: 'DELETE',
        path: '/api/{session}/profile/picture',
        title: 'Delete profile picture',
        description: 'Elimina la foto de perfil.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        request: `curl -X DELETE \
'{{BASE_URL}}/api/default/profile/picture' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "success": true
}`
      }
    ]
  },
  {
    key: 'chatting',
    name: 'Chatting',
    endpoints: [
      {
        id: 'send-text',
        method: 'POST',
        path: '/api/sendText',
        title: 'Enviar texto',
        description: 'Envía un mensaje de texto.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "session": "default",
  "chatId": "51987654321@c.us",
  "text": "Hola!"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendText' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "default",
  "chatId": "51987654321@c.us",
  "text": "Hola!"
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51987654321@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0642CA036C958E41032"
	},
	"message": {
		"extendedTextMessage": {
			"text": "Hola!"
		}
	},
	"messageTimestamp": 1761027951,
	"status": 1
}`
      },
      {
        id: 'send-link-custom-preview',
        method: 'POST',
        path: '/api/send/link-custom-preview',
        title: 'Enviar texto con vista previa personalizada',
        description: 'Envía texto con vista previa (título, descripción, imagen).',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "chatId": "51949203333@c.us",
  "text": "Check this out! https://github.com/",
  "reply_to": null,
  "linkPreviewHighQuality": true,
  "preview": {
    "image": {
      "url": "https://picsum.photos/400/300"
    },
    "url": "https://github.com/",
    "title": "Your Title",
    "description": "Check this out, amazing!"
  },
  "session": "elDieguis"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/send/link-custom-preview' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "chatId": "51949203333@c.us",
  "text": "Check this out! https://github.com/",
  "reply_to": null,
  "linkPreviewHighQuality": true,
  "preview": {
    "image": {
      "url": "https://picsum.photos/400/300"
    },
    "url": "https://github.com/",
    "title": "Your Title",
    "description": "Check this out, amazing!"
  },
  "session": "elDieguis"
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203333@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0ECB4245FD26B7B89DF"
	},
	"message": {
		"extendedTextMessage": {
			"text": "Check this out! https://github.com/",
			"matchedText": "https://github.com/",
			"jpegThumbnail": {
				"type": "Buffer",
				"data": "LzlqLzJ3QkRBQkFMREE0TUNoQU9EUTRTRVJBVEdDZ2FHQllXR0RFakpSMG9Pak05U...."
			},
			"description": "Check this out, amazing!",
			"title": "Your Title",
			"previewType": 0,
			"thumbnailDirectPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "B8EOKG5c+ywng6vSpgaxXR9jKNCH8RlF9pbWunXf/Nk="
			},
			"mediaKeyTimestamp": 1761028247,
			"thumbnailWidth": 512,
			"thumbnailHeight": 512,
			"thumbnailSha256": {
				"type": "Buffer",
				"data": "UuoWVofXxZnBNfASXKQhszVsDS6RGWMpdyOMQJ9abLQ="
			},
			"thumbnailEncSha256": {
				"type": "Buffer",
				"data": "HTGFn3ysK2ewmrJ+W7hrEC+V2Z5uhpCvWZPZp+293TM="
			}
		}
	},
	"messageTimestamp": 1761028247,
	"status": 1
}`
      },
      {
        id: 'send-image',
        method: 'POST',
        path: '/api/sendImage',
        title: 'Enviar imagen',
        description: 'Envía una imagen desde URL o base64.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "session": "default",
  "chatId": "51949203333@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "filename": "foto.jpg",
    "url": "https://picsum.photos/400/300"
  },
  "caption": "Mira esto"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendImage' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "default",
  "chatId": "51949203333@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "filename": "foto.jpg",
    "url": "https://picsum.photos/400/300"
  },
  "caption": "Mira esto"
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203333@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB057F05ECF60EEEE4B8C"
	},
	"message": {
		"imageMessage": {
			"interactiveAnnotations": [],
			"scanLengths": [],
			"annotations": [],
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "Zd956YtMxLCCTYsM5INhaZCUsha2+U06O/C0JpVrJsY="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "bWtQMLToVKfsmmYMX9N9zH2jn2Jm+nMqpQRcUORiCXs="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "H2W6bhXu/qulB9yBz7LhL58rvPLm3qQmMfPrhk5owpc="
			},
			"fileLength": 19770,
			"mediaKeyTimestamp": 1761028791,
			"mimetype": "image/jpeg",
			"caption": "Mira esto je",
			"fileName": "foto.jpg",
			"ptt": false,
			"jpegThumbnail": "",
			"width": 400,
			"height": 300
		}
	},
	"messageTimestamp": 1761028791,
	"status": 1
}`
      },
      {
        id: 'send-file',
        method: 'POST',
        path: '/api/sendFile',
        title: 'Enviar archivo',
        description: 'Envía un archivo desde URL o base64.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "chatId": "51949203333@c.us",
  "file": {
    "mimetype": "application/pdf",
    "filename": "filename.pdf",
    "url": "https://scrumguides.org/docs/scrumguide/v1/Scrum-Guide-ES.pdf"
  },
  "reply_to": null,
  "caption": "My CV",
  "session": "elDieguis"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendFile' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "chatId": "51949203333@c.us",
  "file": {
    "mimetype": "application/pdf",
    "filename": "filename.pdf",
    "url": "https://scrumguides.org/docs/scrumguide/v1/Scrum-Guide-ES.pdf"
  },
  "reply_to": null,
  "caption": "My CV",
  "session": "elDieguis"
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203333@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0BB8CEBD8BD2944C284"
	},
	"message": {
		"documentMessage": {
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "OnZOxuWyyp7YEATjEL3W0cxdZjKQFy9291M28g22GRc="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "mtDtbuzy/Re+5RXDrrnXA7BVo0Wymi5t2wtonxFK/dc="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "1iQsVkmXPfH46PHBJIcyf0Z+/aNkccA8eN7jKV2DICk="
			},
			"fileLength": 725737,
			"mediaKeyTimestamp": 1761029161,
			"mimetype": "application/pdf",
			"caption": "My CV",
			"fileName": "filename.pdf",
			"ptt": false
		}
	},
	"messageTimestamp": 1761029161,
	"status": 1
}`
      },
      {
        id: 'send-voice',
        method: 'POST',
        path: '/api/sendVoice',
        title: 'Enviar nota de voz',
        description: 'Envía una nota de voz por URL o BASE64. Campos: file.url o file.data; establece el mimetype como "audio/ogg; codecs=opus". WhatsApp acepta solo OPUS en contenedor OGG. Si no tienes el formato correcto, usa "convert": true para que el sistema lo convierta.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `URL:
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "url": "https://mymusic.opus"
  },
  "convert": false
}

BASE64:
{
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "filename": "voice-message.mp3",
    "data": "T2dnUwACAAA...."  
  },
  "session": "default",
  "convert": false
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendVoice' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "url": "https://mymusic.opus"
  },
  "convert": false
}'

curl -X POST \
'{{BASE_URL}}/api/sendVoice' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "filename": "voice-message.mp3",
    "data": "T2dnUwACAAAAAAAAAAA...."
  },
  "convert": false
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203333@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB088A197A72471123A01"
	},
	"message": {
		"documentMessage": {
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "6qddqXh26r8m1+tG3EJqRjdaBF9T8hluY2c9drwei7g="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "MmGcwdD8d/3Dj2IAeY2fGA6D/dk8a8M6TKZpN2vbM9U="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "ut5dGeJQSYPlAgvZhJBvxfU2ILCUuywSqGEitxS2ijg="
			},
			"fileLength": 18886,
			"mediaKeyTimestamp": 1761029941,
			"mimetype": "audio/ogg; codecs=opus",
			"caption": "",
			"fileName": "file",
			"ptt": false
		}
	},
	"messageTimestamp": 1761029941,
	"status": 1
}`
      },
      {
        id: 'send-video',
        method: 'POST',
        path: '/api/sendVideo',
        title: 'Enviar video',
        description: 'Usa URL o BASE64 para enviar video. Campos: file.url o file.data; puedes añadir "caption" y "asNote" (video redondo). WhatsApp acepta solo MP4 con códec H.264 (libx264). Si no tienes el formato correcto, usa "convert": true.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `URL:
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "url": "https://myvideo.mp4"
  },
  "convert": false
}

BASE64:
{
  "chatId": "11111111111@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "data": "AAAAGGZ0eX..."
  },
  "session": "default",
  "convert": false
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendVideo' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "default",
  "chatId": "11111111111@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "url": "https://video.mp4"
  },
  "convert": false
}'

curl -X POST \
'{{BASE_URL}}/api/sendVideo' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "chatId": "11111111111@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "data": "AAAAGGZ0eX..."
  },
  "session": "default",
  "convert": false
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203333@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0EB3DF63D6AF1112A85"
	},
	"message": {
		"videoMessage": {
			"interactiveAnnotations": [],
			"annotations": [],
			"processedVideos": [],
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "9syB4nstZLIJ1APZvLaNGIo7mjWKsypqE0z/e/zyhVU="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "tqho16ZPOQgcrC6JRAbb6g79TQYyoWINpNBn/K+CqcI="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "sPz/1VDKNNFU+UqW+QXEz8uR8RF/9/sPxAU/KcOQ8pM="
			},
			"fileLength": 346712,
			"mediaKeyTimestamp": 1761031110,
			"mimetype": "video/mp4",
			"caption": "Watch this video!",
			"fileName": "video.mp4",
			"ptt": false,
			"ptv": false,
			"jpegThumbnail": ""
		}
	},
	"messageTimestamp": 1761031110,
	"status": 1
}`
      },
      {
        id: 'reaction',
        method: 'PUT',
        path: '/api/reaction',
        title: 'Reaccionar a mensaje',
        description: 'Agrega o elimina una reacción en un mensaje.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "session": "elDieguis",
  "messageId": "true_51949203300@c.us_3EB0EB3DF63D6AF1112A85",
  "reaction": "👍"
}`,
        request: `curl -X PUT \
'{{BASE_URL}}/api/reaction' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "elDieguis",
  "messageId": "true_51949203300@c.us_3EB0EB3DF63D6AF1112A85",
  "reaction": "👍"
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203300@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0819E7FE03D63230EA3"
	},
	"message": {
		"reactionMessage": {
			"text": "👍",
			"key": {
				"fromMe": true,
				"id": "3EB0EB3DF63D6AF1112A85",
				"remoteJid": "51949203300@s.whatsapp.net"
			},
			"senderTimestampMs": 1761031458329
		}
	},
	"messageTimestamp": 1761031458,
	"status": 1
}`
      },
      {
        id: 'mark-read',
        method: 'POST',
        path: '/api/sendSeen',
        title: 'Marcar como leído',
        description: 'Marca mensajes como leídos en un chat. Si no envías IDs, lee los últimos 7 días y devuelve los IDs.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "chatId": "51953508109@c.us",
  "messageIds": [
    "false_48916070400173@lid_A5ED63CEC3D4D97A3AD37FE685C1AB18"
  ],
  "participant": null,
  "session": "elDieguis"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendSeen' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "chatId": "51953508109@c.us",
  "messageIds": [
    "false_48916070400173@lid_A5ED63CEC3D4D97A3AD37FE685C1AB18"
  ],
  "participant": null,
  "session": "elDieguis"
}'`,
        response: `{
  "ids": ["false_123@c.us_AAAAAAAAAAAAAAAAAAAA"]
}`
      },
      {
        id: 'send-poll',
        method: 'POST',
        path: '/api/sendPoll',
        title: 'Enviar encuesta',
        description: 'Envía una encuesta con opciones.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "session": "elDieguis",
  "chatId": "51949203300@c.us",
  "poll": {
    "name": "¿Cómo estás?",
    "options": ["Genial", "Bien", "Más o menos"],
    "multipleAnswers": false
  }
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendPoll' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "elDieguis",
  "chatId": "51949203300@c.us",
  "poll": {
    "name": "¿Cómo estás?",
    "options": ["Genial", "Bien", "Más o menos"],
    "multipleAnswers": false
  }
}'`,
        response: `{
	"id": "true_51949203300@c.us_3EB0BC02F6B0A79893B47A",
	"timestamp": 1761031852,
	"from": "51949203300@c.us",
	"fromMe": true,
	"source": "api",
	"body": null,
	"hasMedia": false,
	"media": null,
	"ack": 0,
	"ackName": "PENDING",
	"replyTo": null,
	"_data": {
		"messageStubParameters": [],
		"labels": [],
		"userReceipt": [],
		"reactions": [],
		"pollUpdates": [],
		"eventResponses": [],
		"statusMentions": [],
		"messageAddOns": [],
		"statusMentionSources": [],
		"supportAiCitations": [],
		"key": {
			"remoteJid": "51949203300@s.whatsapp.net",
			"fromMe": true,
			"id": "3EB0BC02F6B0A79893B47A"
		},
		"message": {
			"messageContextInfo": {
				"messageSecret": {
					"type": "Buffer",
					"data": "dgDnbJl9sD7mDKOQIQGh84iGUOJiP0HunVO88tDGxxE="
				}
			},
			"pollCreationMessageV3": {
				"name": "¿Cómo estás?",
				"selectableOptionsCount": 1,
				"options": [
					{
						"optionName": "Genial"
					},
					{
						"optionName": "Bien"
					},
					{
						"optionName": "Más o menos"
					}
				]
			}
		},
		"messageTimestamp": 1761031852,
		"status": 1
	}
}`
      },
      {
        id: 'send-location',
        method: 'POST',
        path: '/api/sendLocation',
        title: 'Enviar ubicación',
        description: 'Envía una ubicación con latitud, longitud y título.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
	"chatId": "11111111111@c.us",
	"latitude": 38.8937255,
	"longitude": -77.0969763,
	"title": "Our office",
	"reply_to": null,
	"session": "default"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendLocation' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"chatId": "11111111111@c.us",
	"latitude": 38.8937255,
	"longitude": -77.0969763,
	"title": "Our office",
	"reply_to": null,
	"session": "default"
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203300@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB041EF9C2AE01AF050DF"
	},
	"message": {
		"locationMessage": {
			"name": "Nuestra oficina",
			"degreesLatitude": -12.097633,
			"degreesLongitude": -77.019575
		}
	},
	"messageTimestamp": 1761032182,
	"status": 1
}`
      },
      {
        id: 'send-contact-vcard',
        method: 'POST',
        path: '/api/sendContactVcard',
        title: 'Enviar contacto (vCard)',
        description: 'Envía uno o más contactos en formato vCard o datos de contacto.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "chatId": "11111111111@c.us",
  "contacts": [
    {
      "vcard": "BEGIN:VCARD\\nVERSION:3.0\\nFN:Jane Doe\\nORG:Company Name;\\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\\nEND:VCARD"
    },
    {
      "fullName": "John Doe",
      "organization": "Company Name",
      "phoneNumber": "+91 11111 11111",
      "whatsappId": "911111111111",
      "vcard": null
    }
  ],
  "reply_to": null,
  "session": "default"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/sendContactVcard' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"chatId": "11111111111@c.us",
	"contacts": [
		{
			"vcard": "BEGIN:VCARD\\nVERSION:3.0\\nFN:Jane Doe\\nORG:Company Name;\\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\\nEND:VCARD"
		},
		{
			"fullName": "John Doe",
			"organization": "Company Name",
			"phoneNumber": "+91 11111 11111",
			"whatsappId": "911111111111",
			"vcard": null
		}
	],
	"reply_to": null,
	"session": "default"
}'`,
        response: `{
  "messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203300@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0B919F4BC22547E7EE8"
	},
	"message": {
		"contactMessage": {
			"vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:Diego Quiroz\nORG:Diego Quiroz;\nTEL;type=CELL;type=VOICE;waid=51949203300:+51 949 203 347\nEND:VCARD"
		}
	},
	"messageTimestamp": 1761032726,
	"status": 1
}`
      },
      {
        id: 'forward-message',
        method: 'POST',
        path: '/api/forwardMessage',
        title: 'Reenviar mensaje',
        description: 'Reenvía un mensaje existente a otro chat.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
	"session": "elDieguis",
	"chatId": "51953508109@c.us",
	"messageId": "true_51949203300@c.us_3EB0B919F4BC22547E7EE8"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/forwardMessage' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"session": "elDieguis",
	"chatId": "51953508109@c.us",
	"messageId": "true_51949203300@c.us_3EB0B919F4BC22547E7EE8"
}'`,
        response: `{
	"id": "true_51953508109@c.us_3EB0E9F3A1EFD34629C52E",
	"timestamp": 1761033132,
	"from": "51953508109@c.us",
	"fromMe": true,
	"source": "api",
	"body": null,
	"hasMedia": false,
	"media": null,
	"ack": 0,
	"ackName": "PENDING",
	"replyTo": null,
	"_data": {
		"messageStubParameters": [],
		"labels": [],
		"userReceipt": [],
		"reactions": [],
		"pollUpdates": [],
		"eventResponses": [],
		"statusMentions": [],
		"messageAddOns": [],
		"statusMentionSources": [],
		"supportAiCitations": [],
		"key": {
			"remoteJid": "51953508109@s.whatsapp.net",
			"fromMe": true,
			"id": "3EB0E9F3A1EFD34629C52E"
		},
		"message": {
			"contactMessage": {
				"vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:Diego Quiroz\nORG:Diego Quiroz;\nTEL;type=CELL;type=VOICE;waid=51949203300:+51 949 203 347\nEND:VCARD",
				"contextInfo": {
					"forwardingScore": 1,
					"isForwarded": true
				}
			}
		},
		"messageTimestamp": 1761033132,
		"status": 1
	}
}`
      },
      {
        id: 'start-typing',
        method: 'POST',
        path: '/api/startTyping',
        title: 'Empezar a escribir',
        description: 'Inicia estado de escritura en un chat.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "session": "elDieguis",
  "chatId": "51953508109@c.us"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/startTyping' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "elDieguis",
  "chatId": "51953508109@c.us"
}'`,
        response: `{
  "result": true
}`
      },
      {
        id: 'stop-typing',
        method: 'POST',
        path: '/api/stopTyping',
        title: 'Detener escritura',
        description: 'Detiene el estado de escritura en un chat.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        bodyExample: `{
  "session": "elDieguis",
  "chatId": "51953508109@c.us"
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/stopTyping' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "session": "elDieguis",
  "chatId": "51953508109@c.us"
}'`,
        response: `{
  "result": true
}`
      }
    ]
  },
  {
    key: 'status',
    name: 'Status',
    endpoints: [
      {
        id: 'status-text',
        method: 'POST',
        path: '/api/{session}/status/text',
        title: 'Enviar estado de texto',
        description: 'Publica un estado de texto; puede incluir vista previa de enlaces.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `{
  "contacts": [
	  "51991649433@c.us"
	],
  "text": "Have a look! https://github.com/",
  "backgroundColor": "#38b42f",
  "font": 0,
  "linkPreview": true,
  "linkPreviewHighQuality": false
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/default/status/text' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"contacts": [
		"51991649433@c.us"
	],
	"text": "Have a look! https://github.com/",
	"backgroundColor": "#38b42f",
	"font": 0,
	"linkPreview": true,
	"linkPreviewHighQuality": false
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "status@broadcast",
		"fromMe": true,
		"id": "3EB0833131B586164FDD37"
	},
	"message": {
		"extendedTextMessage": {
			"text": "Have a look! https://github.com/",
			"matchedText": "https://github.com/",
			"jpegThumbnail": {
				"type": "Buffer",
				"data": ""
			},
			"description": "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
			"title": "GitHub · Build and ship software on a single, collaborative platform",
			"previewType": 0,
			"backgroundArgb": 4281906223
		}
	},
	"messageTimestamp": 1761094923,
	"participant": "51949203333:8@s.whatsapp.net",
	"status": 1
}`
      },
      {
        id: 'status-image',
        method: 'POST',
        path: '/api/{session}/status/image',
        title: 'Enviar estado de imagen',
        description: 'Publica un estado de imagen (URL o Base64).',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `URL:
{
	"contacts": [
		"51991649444@c.us"
	],
	"caption": "Mira esta imagen",
	"file": {
		"mimetype": "image/jpeg",
		"filename": "status.jpg",
		"url": "https://picsum.photos/400/300"
	}
}

BASE64:
{
	"contacts": [
		"51991649444@c.us"
	],
	"caption": "Base64",
	"file": {
		"mimetype": "image/jpeg",
		"data": "/9j/4AAQSkZJRgABAgAAA...."	
  }
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/default/status/image' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"contacts": [
		"51991649444@c.us"
	],
	"caption": "Mira esta imagen",
	"file": {
		"mimetype": "image/jpeg",
		"filename": "status.jpg",
		"url": "https://picsum.photos/400/300"
	}
}'

curl -X POST \
'{{BASE_URL}}/api/default/status/image' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"contacts": [
		"51991649444@c.us"
	],
	"caption": "Base64",
	"file": {
		"mimetype": "image/jpeg",
		"data": "/9j/4AAQSkZJRgABAgAAA...."	
  }
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "status@broadcast",
		"fromMe": true,
		"id": "3EB075EA2B577FDC4E2A26"
	},
	"message": {
		"imageMessage": {
			"interactiveAnnotations": [],
			"scanLengths": [],
			"annotations": [],
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "5fTEGWCyy7Ba7et5VsyfV87mirlzau2PqSXDMK5Dsno="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "ldtnSRuh6rtWgP7uMF3q9+ig4PPOy25Yqs6RxPTdRYU="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "2rNP7Q+ulHSNsVwABkmjSZ3v6xWZni/Liv01I30XcV0="
			},
			"fileLength": 129301,
			"mediaKeyTimestamp": 1761096649,
			"mimetype": "image/jpeg",
			"caption": "Base64",
			"ptt": false,
			"jpegThumbnail": "",
			"width": 1024,
			"height": 768
		}
	},
	"messageTimestamp": 1761096649,
	"participant": "51991649444:8@s.whatsapp.net",
	"status": 1
}`
      },
      {
        id: 'status-voice',
        method: 'POST',
        path: '/api/{session}/status/voice',
        title: 'Enviar estado de voz',
        description: 'Publica un estado de voz vía URL o Base64. El archivo debe estar en OGG (OPUS). Usa "convert": true si tu audio no cumple el formato.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `URL:
{
  "contacts": ["51991649444@c.us"],
  "backgroundColor": "#38b42f",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "url": "https://github.com/myaudio.opus"
  },
  "convert": false
}

BASE64:
{
  "contacts": ["51991649444@c.us"],
  "backgroundColor": "#38b42f",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "data": "SUQzBAAAAAAAW...."
	},
  "convert": false
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/default/status/voice' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "contacts": ["51991649444@c.us"],
  "backgroundColor": "#38b42f",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "url": "https://github.com/myaudio.opus"
  },
  "convert": false
}'

curl -X POST \
'{{BASE_URL}}/api/default/status/voice' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "contacts": ["51991649444@c.us"],
  "backgroundColor": "#38b42f",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "data": "SUQzBAAAAAAAW...."
	},
  "convert": false
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "status@broadcast",
		"fromMe": true,
		"id": "3EB07C440F51BFD0F4D1AC"
	},
	"message": {
		"audioMessage": {
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "GTIiXDmN2rdODsQvrXGABDZPPcvJbNydRAVmjFsP/88="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "R4tZg3e3Acd2Ucn4rXf+7OQijFB5OQ54lM8Tyak7RVM="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "HS12q66/0Nm5Nrj+ILGJu519H8Ih5P4lhzHglNjAUpQ="
			},
			"fileLength": 18890,
			"mediaKeyTimestamp": 1761097286,
			"mimetype": "audio/ogg; codecs=opus",
			"caption": "",
			"ptt": true,
			"seconds": 4.62475,
			"waveform": {
				"type": "Buffer",
				"data": "LGNPPDs1MC4oIx8bGBUSEQ8NDAsJCAcHBgUEBAMDAwICAgIBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
			},
			"backgroundArgb": 4281906223
		}
	},
	"messageTimestamp": 1761097286,
	"participant": "51949203344:8@s.whatsapp.net",
	"status": 1
}`
      },
      {
        id: 'status-video',
        method: 'POST',
        path: '/api/{session}/status/video',
        title: 'Enviar estado de video',
        description: 'Publica un estado de video vía URL o Base64. El video debe ser MP4 con códec H.264 (libx264). Usa "convert": true si tu video no cumple el formato.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `URL:
{
  "contacts": ["51949203333@c.us"],
  "caption": "Mira este video",
  "file": {
    "mimetype": "video/mp4",
    "filename": "status.mp4",
    "url": "https://example.com/status.mp4"
  },
  "convert": false
}

BASE64:
{
  "contacts": ["51991649400@c.us"],
  "caption": "Mira este video",
  "file": {
    "mimetype": "video/mp4",
    "filename": "status.mp4",
    "data": "AAAAGGZ0eXBt...."
  },
  "convert": false
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/default/status/video' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "contacts": ["51991649400@c.us"],
  "caption": "Mira este video",
  "file": {
    "mimetype": "video/mp4",
    "filename": "status.mp4",
    "data": "AAAAGGZ0eXBt...."
  },
  "convert": false
},
  "convert": false
}'

curl -X POST \
'{{BASE_URL}}/api/default/status/video' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "contacts": ["5199164999@c.us"],
  "caption": "Mira este video",
  "file": {
    "mimetype": "video/mp4",
    "filename": "status.mp4",
    "data": "AAAAGGZ0eXBt...."
  },
  "convert": false
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "status@broadcast",
		"fromMe": true,
		"id": "3EB0B4B74FB349EEC971A6"
	},
	"message": {
		"videoMessage": {
			"interactiveAnnotations": [],
			"annotations": [],
			"processedVideos": [],
			"url": "",
			"directPath": "",
			"mediaKey": {
				"type": "Buffer",
				"data": "wbnqL3w6fMgpycw1LLuYTXZWOSAaz2pFtm5PpHC6qos="
			},
			"fileEncSha256": {
				"type": "Buffer",
				"data": "UQmg5D6v8SRyH8wa9DOwtkwhv4PsyCHNEpAfRVxvDkM="
			},
			"fileSha256": {
				"type": "Buffer",
				"data": "8vCmxkkHlUgyuT+f8Wq5ecouNevr2a07Cr+G5YPFg3c="
			},
			"fileLength": 1310587,
			"mediaKeyTimestamp": 1761097789,
			"mimetype": "video/mp4",
			"caption": "Mira este video",
			"fileName": "status.mp4",
			"ptt": false,
			"jpegThumbnail": ""
		}
	},
	"messageTimestamp": 1761097789,
	"participant": "51949203300:8@s.whatsapp.net",
	"status": 1
}`
      },
      {
        id: 'status-delete',
        method: 'POST',
        path: '/api/{session}/status/delete',
        title: 'Eliminar estado enviado',
        description: 'Elimina un estado previamente enviado por su ID. Puedes limitarlo a una lista de contactos.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        bodyExample: `{
	"id": "3EB0B4B74FB349EEC971A6",
	"contacts": [
		"51991649400@c.us"
	]
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/default/status/delete' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"id": "3EB0B4B74FB349EEC971A6",
	"contacts": [
		"51991649400@c.us"
	]
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "status@broadcast",
		"fromMe": true,
		"id": "3EB086E89ABE6E979D804F"
	},
	"message": {
		"protocolMessage": {
			"key": {
				"id": "3EB0B4B74FB349EEC971A6",
				"fromMe": true,
				"remoteJid": "status@broadcast"
			},
			"type": 0
		}
	},
	"messageTimestamp": 1761098053,
	"participant": "51949203300:8@s.whatsapp.net",
	"status": 1
}`
      }
    ]
  },
  {
    key: 'chats',
    name: 'Chats',
    endpoints: [
      {
        id: 'chats-overview-get',
        method: 'GET',
        path: '/api/{session}/chats/overview',
        title: 'Listado de chats (overview)',
        description: 'Obtén el resumen de chats (id, nombre, foto, último mensaje). Ordenado por timestamp del último mensaje.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' }
        ],
        query: [
          { name: 'limit', type: 'number', required: false, description: 'Cantidad de resultados (por defecto 20)', example: '20' },
          { name: 'offset', type: 'number', required: false, description: 'Desplazamiento para paginación', example: '0' },
          { name: 'ids', type: 'string[]', required: false, description: 'Filtra por IDs de chat; repetir el parámetro para múltiples valores', example: '111111111@c.us' }
        ],
        request: `Contacts:

curl -X GET \
'{{BASE_URL}}/api/default/chats/overview?limit=20' \
-H 'X-Api-Key: <api_key>'


Filter Contact:

curl -X GET \
'{{BASE_URL}}/api/default/chats/overview?limit=20&ids=111111111@c.us' \
-H 'X-Api-Key: <api_key>'


`,
        response: `[
	{
		"id": "51991649400@c.us",
		"name": "Dona",
		"picture": "",
		"lastMessage": {
			"id": "true_51991649400@c.us_3EB0D69A45E78A7084EAB4",
			"timestamp": 1761095975,
			"from": "51991649400@c.us",
			"fromMe": true,
			"source": "app",
			"body": "last message",
			"hasMedia": false,
			"media": null,
			"ack": 2,
			"ackName": "DEVICE",
			"replyTo": null,
			"_data": {
				"key": {
					"remoteJid": "51991649400@s.whatsapp.net",
					"fromMe": true,
					"id": "3EB0D69A45E78A7084EAB4"
				},
				"message": {
					"extendedTextMessage": {
						"text": "last message"
					}
				},
				"messageTimestamp": 1761095975,
				"status": 3
			}
		},
		"_chat": {
			"id": "51991649400@s.whatsapp.net",
			"conversationTimestamp": 1761095975
		}
	}
]`
      },
      {
        id: 'chats-get-picture',
        method: 'GET',
        path: '/api/{session}/chats/{chatId}/picture',
        title: 'Foto del chat',
        description: 'Obtiene la foto de perfil del chat. Usa refresh=true si necesitas forzar actualización (caché ~24h).',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' }
        ],
        query: [
          { name: 'refresh', type: 'boolean', required: false, description: 'Forzar refresco desde servidor', example: 'false' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/default/chats/111111111@c.us/picture?refresh=false' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "url": "https://example.com/pictures/chat-111.jpg"
}`
      },
      {
        id: 'chats-get-messages',
        method: 'GET',
        path: '/api/{session}/chats/{chatId}/messages',
        title: 'Mensajes del chat',
        description: 'Lista los mensajes del chat con filtros y paginación. Soporta descarga de media.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' }
        ],
        query: [
          { name: 'limit', type: 'number', required: false, description: 'Cantidad de resultados (por defecto 10)', example: '20' },
          { name: 'offset', type: 'number', required: false, description: 'Desplazamiento para paginación', example: '0' },
          { name: 'downloadMedia', type: 'boolean', required: false, description: 'Descargar media asociado a los mensajes', example: 'true' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages?limit=20&offset=0&downloadMedia=true' \
-H 'X-Api-Key: <api_key>'`,
        response: `[
	{
		"id": "true_51991649400@c.us_3EB0D69A45E78A7084EAB4",
		"timestamp": 1761095975,
		"from": "51991649400@c.us",
		"fromMe": true,
		"source": "app",
		"body": "the last message",
		"hasMedia": false,
		"media": null,
		"ack": 2,
		"ackName": "DEVICE",
		"replyTo": null,
		"_data": {
			"key": {
				"remoteJid": "51991649400@s.whatsapp.net",
				"fromMe": true,
				"id": "3EB0D69A45E78A7084EAB4"
			},
			"message": {
				"extendedTextMessage": {
					"text": "the last message"
				}
			},
			"messageTimestamp": 1761095975,
			"status": 3
		}
	},
	{
		"id": "true_51991649400@c.us_3EB0B85CCDDE917420B820",
		"timestamp": 1761095957,
		"from": "51991649400@c.us",
		"fromMe": true,
		"source": "app",
		"body": "llamame tons",
		"hasMedia": false,
		"media": null,
		"ack": 2,
		"ackName": "DEVICE",
		"replyTo": null,
		"_data": {
			"key": {
				"remoteJid": "51991649400@s.whatsapp.net",
				"fromMe": true,
				"id": "3EB0B85CCDDE917420B820"
			},
			"message": {
				"extendedTextMessage": {
					"text": "llamame tons"
				}
			},
			"messageTimestamp": 1761095957,
			"status": 3
		}
	}
]`
      },
      {
        id: 'chats-read-messages',
        method: 'POST',
        path: '/api/{session}/chats/{chatId}/messages/read',
        title: 'Marcar mensajes como leídos',
        description: 'Marca mensajes como leídos (últimos primero). Puedes limitar por cantidad o días).',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' }
        ],
        query: [
          { name: 'messages', type: 'number', required: false, description: 'Cantidad de mensajes a marcar como leídos', example: '30' },
          { name: 'days', type: 'number', required: false, description: 'Cantidad de días hacia atrás (por defecto 7)', example: '7' }
        ],
        request: `curl -X POST \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages/read?messages=30&days=7' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "ids": ["false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA"]
}`
      },
      {
        id: 'chats-get-message',
        method: 'GET',
        path: '/api/{session}/chats/{chatId}/messages/{messageId}',
        title: 'Obtener mensaje por ID',
        description: 'Obtiene un mensaje específico por su ID. Puede descargar media asociada.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' },
          { name: 'messageId', type: 'string', required: true, description: 'ID del mensaje', example: 'false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' }
        ],
        query: [
          { name: 'downloadMedia', type: 'boolean', required: false, description: 'Descargar media del mensaje', example: 'true' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages/false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA?downloadMedia=true' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
	"id": "true_51991649400@c.us_3EB0C6CD19755F4D55288A",
	"timestamp": 1761102233,
	"from": "51991649400@c.us",
	"fromMe": true,
	"source": "api",
	"body": "darly, if you want call me ",
	"hasMedia": false,
	"media": null,
	"ack": 2,
	"ackName": "DEVICE",
	"replyTo": null,
	"_data": {
		"key": {
			"remoteJid": "51991649400@s.whatsapp.net",
			"fromMe": true,
			"id": "3EB0C6CD19755F4D55288A"
		},
		"message": {
			"extendedTextMessage": {
				"text": "darly, if you want call me"
			}
		},
		"messageTimestamp": 1761102233,
		"status": 3
	}
}`
      },
      {
        id: 'chats-delete-message',
        method: 'DELETE',
        path: '/api/{session}/chats/{chatId}/messages/{messageId}',
        title: 'Eliminar mensaje del chat',
        description: 'Elimina un mensaje específico del chat por su ID.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' },
          { name: 'messageId', type: 'string', required: true, description: 'ID del mensaje', example: 'false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' }
        ],
        request: `curl -X DELETE \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages/false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51949203300@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB009FE9C056BDBBE7856"
	},
	"message": {
		"protocolMessage": {
			"key": {
				"fromMe": true,
				"id": "3EB05AB2AE33A81783D72B",
				"remoteJid": "51949203300@s.whatsapp.net"
			},
			"type": 0
		}
	},
	"messageTimestamp": 1761102460,
	"status": 1
}`
      },
      {
        id: 'chats-edit-message',
        method: 'PUT',
        path: '/api/{session}/chats/{chatId}/messages/{messageId}',
        title: 'Editar mensaje del chat',
        description: 'Edita el contenido de un mensaje existente. Puedes incluir vista previa de enlaces.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' },
          { name: 'messageId', type: 'string', required: true, description: 'ID del mensaje', example: 'false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' }
        ],
        bodyExample: `{
	"text": "Mensaje editado: Donite, i love you",
	"linkPreview": true,
	"linkPreviewHighQuality": false
}`,
        request: `curl -X PUT \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages/false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"text": "Mensaje editado: Donite, i love you",
	"linkPreview": true,
	"linkPreviewHighQuality": false
}'`,
        response: `{
	"messageStubParameters": [],
	"labels": [],
	"userReceipt": [],
	"reactions": [],
	"pollUpdates": [],
	"eventResponses": [],
	"statusMentions": [],
	"messageAddOns": [],
	"statusMentionSources": [],
	"supportAiCitations": [],
	"key": {
		"remoteJid": "51991649400@s.whatsapp.net",
		"fromMe": true,
		"id": "3EB0E3EDA3F315A472DB70"
	},
	"message": {
		"protocolMessage": {
			"key": {
				"fromMe": true,
				"id": "3EB068A0DD432E166E041A",
				"remoteJid": "51991649400@s.whatsapp.net"
			},
			"editedMessage": {
				"extendedTextMessage": {
					"text": "Mensaje editado: Donite i love you"
				}
			},
			"timestampMs": 1761103130779,
			"type": 14
		}
	},
	"messageTimestamp": 1761103130,
	"status": 1
}`
      },
      {
        id: 'chats-pin-message',
        method: 'POST',
        path: '/api/{session}/chats/{chatId}/messages/{messageId}/pin',
        title: 'Pinear mensaje del chat',
        description: `Pinea un mensaje dentro del chat por una duración específica. \t
        - 24 hours - duration=86400
        - 7 days - duration=604800
        - 30 days - duration=2592000
        `,
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' },
          { name: 'messageId', type: 'string', required: true, description: 'ID del mensaje', example: 'false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' }
        ],
        bodyExample: `{
  "duration": 86400
}`,
        request: `curl -X POST \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages/false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA/pin' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
  "duration": 86400
}'`,
        response: `{
  "success": true
}`
      },
      {
        id: 'chats-unpin-message',
        method: 'POST',
        path: '/api/{session}/chats/{chatId}/messages/{messageId}/unpin',
        title: 'Despinear mensaje del chat',
        description: 'Quita el pin de un mensaje dentro del chat.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del chat', example: '111111111@c.us' },
          { name: 'messageId', type: 'string', required: true, description: 'ID del mensaje', example: 'false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA' }
        ],
        request: `curl -X POST \
'{{BASE_URL}}/api/default/chats/111111111@c.us/messages/false_111111111@c.us_AAAAAAAAAAAAAAAAAAAA/unpin' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "success": true
}`
      }
    ]
  },
  {
    key: 'contacts',
    name: 'Contacts',
    endpoints: [
      {
        id: 'contacts-get-basic',
        method: 'GET',
        path: '/api/contacts',
        title: 'Obtener info básica del contacto',
        description: 'Devuelve datos básicos del contacto. Usa /contacts/check-exists para verificar si el número está registrado.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        query: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'contactId', type: 'string', required: true, description: 'ID del contacto (JID)', example: '51949203300@c.us' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/contacts?session=default&contactId=51949203300@c.us' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
	"id": "51991649400@c.us",
	"name": "Dona Linda Linda",
	"lid": "171657108918432@lid",
	"pushname": "K.P.M"
}`
      },
      {
        id: 'contacts-check-exists',
        method: 'GET',
        path: '/api/contacts/check-exists',
        title: 'Verificar si número existe en WhatsApp',
        description: 'Verifica si el número está registrado en WhatsApp.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        query: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'phone', type: 'string', required: true, description: 'Número telefónico sin "+" ni sufijo', example: '51949203300' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/contacts/check-exists?session=default&phone=51949203300' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "numberExists": true,
  "chatId": "51949203300@c.us"
}`
      },
      {
        id: 'contacts-profile-picture',
        method: 'GET',
        path: '/api/contacts/profile-picture',
        title: 'Obtener URL de foto de perfil',
        description: 'Devuelve la URL de la foto de perfil. Puede retornar null por privacidad. Usa refresh para forzar actualización.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        query: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'contactId', type: 'string', required: true, description: 'ID del contacto (JID)', example: '51949203300@c.us' },
          { name: 'refresh', type: 'boolean', required: false, description: 'Forzar refresco (cache 24h por defecto)', example: 'false' }
        ],
        request: `curl -X GET \
'{{BASE_URL}}/api/contacts/profile-picture?session=default&contactId=51949203300@c.us&refresh=false' \
-H 'X-Api-Key: <api_key>'`,
        response: `{
  "profilePictureURL": "https://mm.whatsapp.net/d/f/AbCdEfGhIjKlMn.jpg"
}`
      },
      {
        id: 'contacts-upsert',
        method: 'PUT',
        path: '/api/{session}/contacts/{chatId}',
        title: 'Crear o actualizar contacto',
        description: 'Crea o actualiza el contacto en la libreta del dispositivo.',
        headers: [
          { name: 'X-Api-Key', required: true, description: 'API key para autenticar', example: '<api_key>' }
        ],
        pathParams: [
          { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión', example: 'default' },
          { name: 'chatId', type: 'string', required: true, description: 'ID del contacto (JID)', example: '51949203300@c.us' }
        ],
        bodyExample: `{
	"firstName": "Dona",
	"lastName": "Sweet"
}`,
        request: `curl -X PUT \
'{{BASE_URL}}/api/default/contacts/51949203300@c.us' \
-H 'X-Api-Key: <api_key>' \
-H 'Content-Type: application/json' \
-d '{
	"firstName": "Dona",
	"lastName": "Sweet"
}'`,
        response: `{
  "success": true
}`
      }
    ]
  }
]