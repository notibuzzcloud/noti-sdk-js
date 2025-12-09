export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface Endpoint {
  id: string
  method: HttpMethod
  path: string
  description?: string
  requestExample?: string
  responseExample?: string
}

export interface Header {
  key: string
  value?: string
  required?: boolean
  description?: string
}

export interface Param {
  key: string
  type?: string
  required?: boolean
  description?: string
}