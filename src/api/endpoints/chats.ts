// AUTO-GENERATED from data.ts. Do not edit.
import { getClient } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Obtén el resumen de chats (id, nombre, foto, último mensaje). Ordenado por timestamp del último mensaje.
 * Method: GET
 * Path: /api/{session}/chats/overview
 */
export async function chatsOverviewGet<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/overview', args.pathParams) || '/api/{session}/chats/overview'
  return getClient().get<T>(p, args.query)
}

/**
 * Obtén el resumen de chats usando POST (permite filtros más complejos).
 * Method: POST
 * Path: /api/{session}/chats/overview
 */
export async function chatsOverviewPost<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/overview', args.pathParams) || '/api/{session}/chats/overview'
  return getClient().post<T>(p, args.body)
}

/**
 * Lista los chats de la sesión.
 * Method: GET
 * Path: /api/{session}/chats
 */
export async function chatsGet<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats', args.pathParams) || '/api/{session}/chats'
  return getClient().get<T>(p, args.query)
}

/**
 * Elimina un chat.
 * Method: DELETE
 * Path: /api/{session}/chats/{chatId}
 */
export async function chatsDelete<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}', args.pathParams) || '/api/{session}/chats/{chatId}'
  return getClient().delete<T>(p)
}

/**
 * Elimina mensajes del chat (sin especificar messageId).
 * Method: DELETE
 * Path: /api/{session}/chats/{chatId}/messages
 */
export async function chatsDeleteMessages<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages', args.pathParams) || '/api/{session}/chats/{chatId}/messages'
  return getClient().delete<T>(p)
}

/**
 * Obtiene la foto de perfil del chat. Usa refresh=true si necesitas forzar actualización (caché ~24h).
 * Method: GET
 * Path: /api/{session}/chats/{chatId}/picture
 */
export async function chatsGetPicture<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/picture', args.pathParams) || '/api/{session}/chats/{chatId}/picture'
  return getClient().get<T>(p, args.query)
}

/**
 * Lista los mensajes del chat con filtros y paginación. Soporta descarga de media.
 * Method: GET
 * Path: /api/{session}/chats/{chatId}/messages
 */
export async function chatsGetMessages<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages', args.pathParams) || '/api/{session}/chats/{chatId}/messages'
  return getClient().get<T>(p, args.query)
}

/**
 * Marca mensajes como leídos (últimos primero). Puedes limitar por cantidad o días).
 * Nota: El bridge usa query params (messages, days) en lugar de body.
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/messages/read
 */
export async function chatsReadMessages<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: { messages?: number, days?: number }, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages/read', args.pathParams) || '/api/{session}/chats/{chatId}/messages/read'
  return getClient().post<T>(p, args.body, { query: args.query })
}

/**
 * Obtiene un mensaje específico por su ID. Puede descargar media asociada.
 * Method: GET
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}
 */
export async function chatsGetMessage<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}'
  return getClient().get<T>(p, args.query)
}

/**
 * Elimina un mensaje específico del chat por su ID.
 * Method: DELETE
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}
 */
export async function chatsDeleteMessage<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}'
  return getClient().delete<T>(p)
}

/**
 * Edita el contenido de un mensaje existente. Puedes incluir vista previa de enlaces.
 * Method: PUT
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}
 */
export async function chatsEditMessage<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}'
  return getClient().put<T>(p, args.body)
}

/**
 * Pinea un mensaje dentro del chat por una duración específica. 	
        - 24 hours - duration=86400
        - 7 days - duration=604800
        - 30 days - duration=2592000
        
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}/pin
 */
export async function chatsPinMessage<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}/pin', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}/pin'
  return getClient().post<T>(p, args.body)
}

/**
 * Quita el pin de un mensaje dentro del chat.
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}/unpin
 */
export async function chatsUnpinMessage<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}/unpin', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}/unpin'
  return getClient().post<T>(p, args.body)
}