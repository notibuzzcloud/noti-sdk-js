import { request } from '../utils/request.js'

export interface RequestOptions {
  query?: Record<string, any>
  headers?: Record<string, string>
  async?: boolean
}

export interface ClientConfig {
  notiUrl: string
  notiApiKey: string
}

export class NotiSenderClient {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl: string, apiKey: string) {
    if (!baseUrl) throw new Error('Base URL is required')
    if (!apiKey) throw new Error('API Key is required')
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  get<T = unknown>(path: string, params?: Record<string, any>, options?: RequestOptions) {
    const query = { ...params, ...(options?.query || {}) }
    if (options?.async) query.async = 'true'
    const headers = options?.async ? { 'X-Async': 'true', ...(options.headers || {}) } : options?.headers
    return request<T>({ method: 'GET', baseUrl: this.baseUrl, path, apiKey: this.apiKey, query, headers })
  }
  post<T = unknown>(path: string, body?: any, options?: RequestOptions) {
    const query = options?.query || {}
    if (options?.async) query.async = 'true'
    const headers = options?.async ? { 'X-Async': 'true', ...(options.headers || {}) } : options?.headers
    return request<T>({ method: 'POST', baseUrl: this.baseUrl, path, apiKey: this.apiKey, body, query, headers })
  }
  put<T = unknown>(path: string, body?: any, options?: RequestOptions) {
    const query = options?.query || {}
    if (options?.async) query.async = 'true'
    const headers = options?.async ? { 'X-Async': 'true', ...(options.headers || {}) } : options?.headers
    return request<T>({ method: 'PUT', baseUrl: this.baseUrl, path, apiKey: this.apiKey, body, query, headers })
  }
  delete<T = unknown>(path: string, options?: RequestOptions) {
    const query = options?.query || {}
    if (options?.async) query.async = 'true'
    const headers = options?.async ? { 'X-Async': 'true', ...(options.headers || {}) } : options?.headers
    return request<T>({ method: 'DELETE', baseUrl: this.baseUrl, path, apiKey: this.apiKey, query, headers })
  }
}

let _client: NotiSenderClient | undefined

/**
 * Configura el cliente global con la URL base del Bridge y la API Key.
 * 
 * Puedes usar la sintaxis de objeto:
 * ```typescript
 * configureClient({
 *   notiUrl: ''your_base_url'',
 *   notiApiKey: 'your_api_key'
 * })
 * ```
 * 
 * O la sintaxis tradicional (mantenida por compatibilidad):
 * ```typescript
 * configureClient(''your_base_url'', 'your_api_key')
 * ```
 */
export function configureClient(config: ClientConfig): void
export function configureClient(notiUrl: string, notiApiKey: string): void
export function configureClient(configOrUrl: ClientConfig | string, notiApiKey?: string): void {
  if (typeof configOrUrl === 'string') {
    // Sintaxis tradicional: configureClient(url, key)
    if (!notiApiKey) throw new Error('API Key is required when using string syntax')
    _client = new NotiSenderClient(configOrUrl, notiApiKey)
  } else {
    // Sintaxis de objeto: configureClient({ notiUrl, notiApiKey })
    _client = new NotiSenderClient(configOrUrl.notiUrl, configOrUrl.notiApiKey)
  }
}

export function getClient(): NotiSenderClient {
  if (_client) return _client
  const envUrl = (typeof process !== 'undefined') ? process.env?.NOTI_URL : undefined
  const envKey = (typeof process !== 'undefined') ? process.env?.NOTI_KEY : undefined
  if (envUrl && envKey) {
    _client = new NotiSenderClient(envUrl, envKey)
    return _client
  }
  throw new Error('NotiSenderClient no configurado. Llame a configureClient({ notiUrl, notiApiKey }) o configureClient(url, key) o defina NOTI_URL/NOTI_KEY.')
}