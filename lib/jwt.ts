import jwt from 'jsonwebtoken'

const APP_SECRET = process.env.APP_SECRET || 'fallback-secret'

export interface JWTPayload {
  email: string
  userId: string
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '90d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, APP_SECRET) as JWTPayload
  } catch {
    return null
  }
}


