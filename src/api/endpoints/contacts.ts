// AUTO-GENERATED from data.ts. Do not edit.
import { getClient } from '../client.js'

const makePath = (tpl: string, params?: Record<string, string | number | boolean>) => tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params?.[k])))

/**
 * Devuelve datos básicos del contacto. Usa /contacts/check-exists para verificar si el número está registrado.
 * Method: GET
 * Path: /api/contacts
 */
export async function contactsGetBasic<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/contacts', args.pathParams) || '/api/contacts'
  return getClient().get<T>(p, args.query)
}

/**
 * Verifica si el número está registrado en WhatsApp.
 * Method: GET
 * Path: /api/contacts/check-exists
 */
export async function contactsCheckExists<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/contacts/check-exists', args.pathParams) || '/api/contacts/check-exists'
  return getClient().get<T>(p, args.query)
}

/**
 * Devuelve la URL de la foto de perfil. Puede retornar null por privacidad. Usa refresh para forzar actualización.
 * Method: GET
 * Path: /api/contacts/profile-picture
 */
export async function contactsProfilePicture<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/contacts/profile-picture', args.pathParams) || '/api/contacts/profile-picture'
  return getClient().get<T>(p, args.query)
}

/**
 * Crea o actualiza el contacto en la libreta del dispositivo.
 * Method: PUT
 * Path: /api/{session}/contacts/{chatId}
 */
export async function contactsUpsert<T = any>(args: { pathParams?: Record<string, string | number | boolean>, query?: Record<string, any>, body?: any } = {}): Promise<T> {
  const p = makePath('/api/{session}/contacts/{chatId}', args.pathParams) || '/api/{session}/contacts/{chatId}'
  return getClient().put<T>(p, args.body)
}