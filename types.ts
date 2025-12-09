export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiHeader {
  name: string
  description?: string
  required?: boolean
  example?: string
}

export interface ApiQueryParam {
  name: string
  type: string
  description?: string
  required?: boolean
  example?: string
}

export interface ApiPathParam {
  name: string
  type: string
  description?: string
  required?: boolean
  example?: string
}

export interface ApiEndpoint {
  id: string
  method: HttpMethod
  path: string
  title: string
  description?: string
  request?: string
  response?: string
  headers?: ApiHeader[]
  query?: ApiQueryParam[]
  pathParams?: ApiPathParam[]
  bodyExample?: string
}

export interface ApiCategory {
  key: string
  name: string
  endpoints: ApiEndpoint[]
}