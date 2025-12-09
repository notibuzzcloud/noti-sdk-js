// AUTO-GENERATED from data.ts. Do not edit.
import { getClient } from '../client.js'
import type { RequestOptions } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Detiene una campaña de envío masivo en curso.
 * Method: POST
 * Path: /api/bulk/campaigns/{id}/stop
 */
export async function bulkStopCampaign<T = any>(args: { 
  pathParams?: Record<string, string | number | boolean>, 
  query?: Record<string, any>, 
  body?: {
    sessions?: string[]
  }
} = {}): Promise<T> {
  const p = makePath('/api/bulk/campaigns/{id}/stop', args.pathParams) || '/api/bulk/campaigns/{id}/stop'
  return getClient().post<T>(p, args.body)
}

/**
 * Reanuda una campaña de envío masivo previamente detenida.
 * Method: POST
 * Path: /api/bulk/campaigns/{id}/resume
 */
export async function bulkResumeCampaign<T = any>(args: { 
  pathParams?: Record<string, string | number | boolean>, 
  query?: Record<string, any>, 
  body?: {
    sessions?: string[]
  }
} = {}): Promise<T> {
  const p = makePath('/api/bulk/campaigns/{id}/resume', args.pathParams) || '/api/bulk/campaigns/{id}/resume'
  return getClient().post<T>(p, args.body)
}

/**
 * Verifica la disponibilidad de capacidad para envíos masivos.
 * Retorna información sobre la capacidad actual y máxima de envíos en paralelo.
 * Method: GET
 * Path: /api/bulk/availability
 */
export async function bulkAvailability<T = any>(args: { 
  pathParams?: Record<string, string | number | boolean>, 
  query?: {
    requester?: string
  }
} = {}): Promise<T> {
  const p = makePath('/api/bulk/availability', args.pathParams) || '/api/bulk/availability'
  return getClient().get<T>(p, args.query)
}

