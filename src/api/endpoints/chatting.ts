import { getClient } from '../client.js'
import type { RequestOptions } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Tipos de mensaje soportados por sendMessage según TYPE_PATH_MAP del bridge.
 * Nota: 'typing-start' y 'typing-stop' NO están aquí porque tienen endpoints directos.
 */
export type MessageType = 
  | 'text'
  | 'image'
  | 'file'
  | 'voice'
  | 'video'
  | 'link-custom-preview'
  | 'seen'
  | 'poll'
  | 'location'
  | 'contact-vcard'
  | 'forward'
  | 'list'

/**
 * Envía mensajes en lote o individuales usando el endpoint genérico /api/sendMessage.
 * Este es el único endpoint para enviar mensajes en el bridge.
 * 
 * Soporta dos modos:
 * 1. Modo masivo: { messages: [{ type, payload }], intervalMs }
 * 2. Modo individual: { type, payload }
 * 
 * Tipos soportados según TYPE_PATH_MAP:
 * - 'text' → /api/sendText
 * - 'image' → /api/sendImage
 * - 'file' → /api/sendFile
 * - 'voice' → /api/sendVoice
 * - 'video' → /api/sendVideo
 * - 'link-custom-preview' → /api/send/link-custom-preview
 * - 'seen' → /api/sendSeen
 * - 'poll' → /api/sendPoll
 * - 'location' → /api/sendLocation
 * - 'contact-vcard' → /api/sendContactVcard
 * - 'forward' → /api/forwardMessage
 * - 'list' → /api/sendList
 * 
 * Nota: 'typing-start' y 'typing-stop' tienen endpoints directos (/api/startTyping y /api/stopTyping)
 * 
 * Method: POST
 * Path: /api/sendMessage
 */
export async function sendMessage<T = any>(args: { 
  pathParams?: Record<string, string | number | boolean>, 
  query?: Record<string, any>, 
  body?: {
    // Modo masivo
    messages?: Array<{ 
      type: MessageType
      payload: any 
    }>
    intervalMs?: number
    meta?: {
      campaignId?: string
      requester?: string
      origin?: string
    }
    // Modo individual
    type?: MessageType
    payload?: any
  },
  async?: boolean
} = {}): Promise<T> {
  const p = makePath('/api/sendMessage', args.pathParams) || '/api/sendMessage'
  const options: RequestOptions = {
    query: args.query,
    async: args.async
  }
  return getClient().post<T>(p, args.body, options)
}

/**
 * Agrega o elimina una reacción en un mensaje.
 * Este endpoint NO pasa por sendMessage, es directo.
 * Method: PUT
 * Path: /api/reaction
 */
export async function reaction<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/reaction', args.pathParams) || '/api/reaction'
  return getClient().put<T>(p, args.body)
}

/**
 * Inicia el estado de escritura en un chat.
 * Este endpoint NO pasa por sendMessage, es directo.
 * Method: POST
 * Path: /api/startTyping
 */
export async function startTyping<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any, async?: boolean } = {}): Promise<T> {
  const p = makePath('/api/startTyping', args.pathParams) || '/api/startTyping'
  const options: RequestOptions = {
    query: args.query,
    async: args.async
  }
  return getClient().post<T>(p, args.body, options)
}

/**
 * Detiene el estado de escritura en un chat.
 * Este endpoint NO pasa por sendMessage, es directo.
 * Method: POST
 * Path: /api/stopTyping
 */
export async function stopTyping<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any, async?: boolean } = {}): Promise<T> {
  const p = makePath('/api/stopTyping', args.pathParams) || '/api/stopTyping'
  const options: RequestOptions = {
    query: args.query,
    async: args.async
  }
  return getClient().post<T>(p, args.body, options)
}