// AUTO-GENERATED from data.ts. Do not edit.
import { getClient } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Validates and normalizes contacts array
 */
function validateAndNormalizeContacts(contacts: any): string[] {
  if (contacts === null || contacts === undefined) {
    throw new Error('contacts is required and must be an array with at least one element')
  }
  if (!Array.isArray(contacts)) {
    throw new Error('contacts must be an array')
  }
  if (contacts.length === 0) {
    throw new Error('contacts must have at least one element')
  }
  
  const normalized: string[] = []
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i]
    if (typeof contact !== 'string' || !contact.trim()) {
      throw new Error(`contacts[${i}] must be a non-empty string`)
    }
    const trimmed = contact.trim()
    
    // Validate format: must be digits only or digits@c.us, no @g.us or @lid
    if (trimmed.includes('@g.us')) {
      throw new Error(`contacts[${i}] cannot contain @g.us (group chats not allowed)`)
    }
    if (trimmed.includes('@lid')) {
      throw new Error(`contacts[${i}] cannot contain @lid (LID format not allowed)`)
    }
    
    // Normalize: if it's just digits, keep as is; if it has @c.us, keep as is
    if (trimmed.includes('@c.us')) {
      // Validate it's a valid @c.us format
      const match = trimmed.match(/^(\d+)@c\.us$/)
      if (!match) {
        throw new Error(`contacts[${i}] has invalid format. Expected format: digits or digits@c.us`)
      }
      normalized.push(trimmed)
    } else {
      // Just digits, validate it's only digits
      if (!/^\d+$/.test(trimmed)) {
        throw new Error(`contacts[${i}] must contain only digits or be in format digits@c.us`)
      }
      normalized.push(trimmed)
    }
  }
  return normalized
}

/**
 * Processes status request with batching support
 */
async function processStatusRequest<T = any>(
  endpoint: string,
  body: any
): Promise<T> {
  const isDeleteEndpoint = endpoint.includes('/status/delete')
  
  // For delete endpoint, id must be a valid string
  // For other status endpoints, id must be null
  if (isDeleteEndpoint) {
    if (!body.id || typeof body.id !== 'string' || !body.id.trim()) {
      throw new Error('id is required and must be a non-empty string for delete endpoint')
    }
  } else {
    // For create endpoints (text, image, voice, video), id must be null
    if (body.id !== null && body.id !== undefined) {
      throw new Error('id must be null for status creation endpoints')
    }
  }
  
  // Validate and normalize contacts
  const normalizedContacts = validateAndNormalizeContacts(body.contacts)
  
  // Build request body: for delete, keep id as is; for create, ensure id is null
  const { contacts, ...restBody } = body
  const baseBody = isDeleteEndpoint 
    ? { ...restBody, contacts: normalizedContacts } // Keep id for delete
    : { ...restBody, id: null, contacts: normalizedContacts } // Set id to null for create
  
  // If contacts <= 10, process directly
  if (normalizedContacts.length <= 10) {
    const requestBody = { ...baseBody, contacts: normalizedContacts }
    return getClient().post<T>(endpoint, requestBody)
  }
  
  // Process in batches of 10
  const batchSize = 10
  const batches: string[][] = []
  for (let i = 0; i < normalizedContacts.length; i += batchSize) {
    batches.push(normalizedContacts.slice(i, i + batchSize))
  }
  
  const results: any[] = []
  const errors: any[] = []
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    const requestBody = { ...baseBody, contacts: batch }
    try {
      const result = await getClient().post<T>(endpoint, requestBody)
      results.push({ batch: i + 1, totalBatches: batches.length, result })
    } catch (e: any) {
      errors.push({ batch: i + 1, totalBatches: batches.length, error: e?.message || String(e) })
    }
  }
  
  return {
    batched: true,
    totalContacts: normalizedContacts.length,
    totalBatches: batches.length,
    successful: results.length,
    failed: errors.length,
    results,
    errors: errors.length > 0 ? errors : undefined
  } as T
}

/**
 * Publica un estado de texto; puede incluir vista previa de enlaces.
 * Method: POST
 * Path: /api/{session}/status/text
 * 
 * Validaciones:
 * - id debe ser null
 * - contacts debe ser un array con al menos un elemento (máximo 10 por request, se procesa en batches si hay más)
 * - contacts solo acepta números (ej: "51949203347") o formato @c.us (ej: "51949203347@c.us")
 * - No se permiten @g.us ni @lid
 */
export async function statusText<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/status/text', args.pathParams) || '/api/{session}/status/text'
  return processStatusRequest<T>(p, args.body || {})
}

/**
 * Publica un estado de imagen (URL o Base64).
 * Method: POST
 * Path: /api/{session}/status/image
 * 
 * Validaciones:
 * - id debe ser null
 * - contacts debe ser un array con al menos un elemento (máximo 10 por request, se procesa en batches si hay más)
 * - contacts solo acepta números (ej: "51949203347") o formato @c.us (ej: "51949203347@c.us")
 * - No se permiten @g.us ni @lid
 */
export async function statusImage<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/status/image', args.pathParams) || '/api/{session}/status/image'
  return processStatusRequest<T>(p, args.body || {})
}

/**
 * Publica un estado de voz vía URL o Base64. El archivo debe estar en OGG (OPUS). Usa "convert": true si tu audio no cumple el formato.
 * Method: POST
 * Path: /api/{session}/status/voice
 * 
 * Validaciones:
 * - id debe ser null
 * - contacts debe ser un array con al menos un elemento (máximo 10 por request, se procesa en batches si hay más)
 * - contacts solo acepta números (ej: "51949203347") o formato @c.us (ej: "51949203347@c.us")
 * - No se permiten @g.us ni @lid
 */
export async function statusVoice<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/status/voice', args.pathParams) || '/api/{session}/status/voice'
  return processStatusRequest<T>(p, args.body || {})
}

/**
 * Publica un estado de video vía URL o Base64. El video debe ser MP4 con códec H.264 (libx264). Usa "convert": true si tu video no cumple el formato.
 * Method: POST
 * Path: /api/{session}/status/video
 * 
 * Validaciones:
 * - id debe ser null
 * - contacts debe ser un array con al menos un elemento (máximo 10 por request, se procesa en batches si hay más)
 * - contacts solo acepta números (ej: "51949203347") o formato @c.us (ej: "51949203347@c.us")
 * - No se permiten @g.us ni @lid
 */
export async function statusVideo<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/status/video', args.pathParams) || '/api/{session}/status/video'
  return processStatusRequest<T>(p, args.body || {})
}

/**
 * Elimina un estado previamente enviado por su ID. Puedes limitarlo a una lista de contactos.
 * Method: POST
 * Path: /api/{session}/status/delete
 * 
 * Validaciones:
 * - id debe ser un string no vacío (ID del status a eliminar)
 * - contacts debe ser un array con al menos un elemento (máximo 10 por request, se procesa en batches si hay más)
 * - contacts solo acepta números (ej: "51949203347") o formato @c.us (ej: "51949203347@c.us")
 * - No se permiten @g.us ni @lid
 */
export async function statusDelete<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/status/delete', args.pathParams) || '/api/{session}/status/delete'
  return processStatusRequest<T>(p, args.body || {})
}