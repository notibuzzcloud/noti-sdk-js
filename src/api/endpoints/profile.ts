// AUTO-GENERATED from data.ts. Do not edit.
import { getClient } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Obtén la información del perfil de la cuenta.
 * Method: GET
 * Path: /api/{session}/profile
 */
export async function getMyProfile<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/profile', args.pathParams) || '/api/{session}/profile'
  return getClient().get<T>(p, args.query)
}

/**
 * Actualiza el nombre del perfil.
 * Method: PUT
 * Path: /api/{session}/profile/name
 */
export async function setProfileName<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/profile/name', args.pathParams) || '/api/{session}/profile/name'
  return getClient().put<T>(p, args.body)
}

/**
 * Actualiza el estado (About) del perfil.
 * Method: PUT
 * Path: /api/{session}/profile/status
 */
export async function setProfileStatus<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/profile/status', args.pathParams) || '/api/{session}/profile/status'
  return getClient().put<T>(p, args.body)
}

/**
 * Actualiza la foto de perfil; acepta archivo remoto o binario.
 * Method: PUT
 * Path: /api/{session}/profile/picture
 */
export async function setProfilePicture<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/profile/picture', args.pathParams) || '/api/{session}/profile/picture'
  return getClient().put<T>(p, args.body)
}

/**
 * Elimina la foto de perfil.
 * Method: DELETE
 * Path: /api/{session}/profile/picture
 */
export async function deleteProfilePicture<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/profile/picture', args.pathParams) || '/api/{session}/profile/picture'
  return getClient().delete<T>(p)
}