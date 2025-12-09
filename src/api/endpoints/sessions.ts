// AUTO-GENERATED from data.ts. Do not edit.
import { getClient } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Lista todas las sesiones; usa ?all=true para incluir STOPPED.
 * Method: GET
 * Path: /api/sessions
 */
export async function listSessions<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/sessions', args.pathParams) || '/api/sessions'
  return getClient().get<T>(p, args.query)
}

/**
 * Obtén información detallada de una sesión por nombre.
 * Method: GET
 * Path: /api/sessions/{session}
 */
export async function getSession<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/sessions/{session}', args.pathParams) || '/api/sessions/{session}'
  return getClient().get<T>(p, args.query)
}

/**
 * Información de la cuenta autenticada de la sesión.
 * Method: GET
 * Path: /api/sessions/{session}/me
 */
export async function getSessionMe<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/sessions/{session}/me', args.pathParams) || '/api/sessions/{session}/me'
  return getClient().get<T>(p, args.query)
}