export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  baseUrl: string
  path: string
  apiKey: string
  query?: Record<string, string | number | boolean | undefined>
  body?: any
  headers?: Record<string, string>
}

export async function request<T = unknown>(opts: RequestOptions): Promise<T> {
  // Asegurar que la baseUrl termine con / y el path no empiece con /
  const baseUrl = opts.baseUrl.endsWith('/') ? opts.baseUrl : `${opts.baseUrl}/`
  const path = opts.path.startsWith('/') ? opts.path.slice(1) : opts.path
  const url = new URL(path, baseUrl)
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== null) {
        if (Array.isArray(v)) {
          for (const item of v) {
            if (item !== undefined && item !== null) {
              url.searchParams.append(k, String(item))
            }
          }
        } else {
          url.searchParams.append(k, String(v))
        }
      }
    }
  }

  // Asegurar que el API Key siempre se envíe como header
  if (!opts.apiKey) {
    throw new Error('API Key is required')
  }

  // Construir headers: primero los opcionales, luego los requeridos (para que no se sobrescriban)
  const apiKeyValue = String(opts.apiKey).trim()
  
  // Determinar si necesitamos enviar body
  let body: string | undefined = undefined
  if (opts.method === 'GET') {
    body = undefined
  } else if (opts.method === 'DELETE') {
    // DELETE solo envía body si está explícitamente definido
    body = opts.body !== undefined ? JSON.stringify(opts.body) : undefined
  } else {
    // POST y PUT siempre envían body (puede ser objeto vacío)
    body = JSON.stringify(opts.body ?? {})
  }
  
  // Construir headers base
  // Solo incluir Content-Type si hay body o si es POST/PUT
  const baseHeaders: Record<string, string> = {
    ...(opts.headers || {}),
  }
  
  // Agregar Content-Type solo si hay body o es POST/PUT
  if (body !== undefined || (opts.method !== 'GET' && opts.method !== 'DELETE')) {
    baseHeaders['Content-Type'] = 'application/json'
  }
  
  // Asegurar que X-Api-Key siempre esté presente y no se sobrescriba
  const headers: Record<string, string> = {
    ...baseHeaders,
    'X-Api-Key': apiKeyValue,
  }

  // Debug: mostrar headers en desarrollo (comentar en producción)
  if (typeof process !== 'undefined' && (process.env?.DEBUG || process.env?.NODE_ENV === 'development')) {
    console.log('🔍 Request Debug:')
    console.log('  URL:', url.toString())
    console.log('  Method:', opts.method)
    console.log('  Headers:', JSON.stringify(headers, null, 2))
    console.log('  Body:', body || '(none)')
    console.log('  API Key present:', !!apiKeyValue)
    console.log('  API Key length:', apiKeyValue.length)
  }

  const res = await fetch(url, {
    method: opts.method,
    headers,
    body,
  })

  const text = await res.text()
  let data: any
  try { data = text ? JSON.parse(text) : undefined } catch { data = text }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${typeof data === 'string' ? data : JSON.stringify(data)}`)
  }

  return data as T
}