import jwt from 'jsonwebtoken'
import { DownloadTokenPayload, DownloadTokenSchema } from '@/types/jwt'

// T017: JWT token generation and verification
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'

if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'dev-secret-change-in-production') {
  throw new Error('JWT_SECRET must be set in production environment')
}

export function generateDownloadToken(payload: Omit<DownloadTokenPayload, 'iat' | 'expiresAt'>): string {
  const now = Math.floor(Date.now() / 1000)
  const expiresIn24Hours = now + 24 * 60 * 60 // 24 hours from now

  const fullPayload: DownloadTokenPayload = {
    ...payload,
    iat: now,
    expiresAt: expiresIn24Hours,
    downloadCount: payload.downloadCount || 0,
  }

  // Validate payload before signing
  DownloadTokenSchema.parse(fullPayload)

  return jwt.sign(fullPayload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h',
  })
}

export function verifyDownloadToken(token: string): DownloadTokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    })

    // Validate decoded token against schema
    return DownloadTokenSchema.parse(decoded)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Download token has expired')
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid download token')
    }
    throw error
  }
}

export function isTokenExpired(payload: DownloadTokenPayload): boolean {
  const now = Math.floor(Date.now() / 1000)
  return now > payload.expiresAt
}
