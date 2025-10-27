// T018: Admin authentication utilities
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

if (process.env.NODE_ENV === 'production' && ADMIN_PASSWORD === 'admin123') {
  console.warn('WARNING: Using default admin password in production. Set ADMIN_PASSWORD environment variable.')
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function hashPassword(password: string): string {
  // MVP: Simple comparison without hashing
  // TODO: Implement proper bcrypt hashing when moving to database
  return password
}

export function comparePassword(provided: string, stored: string): boolean {
  // MVP: Direct comparison
  // TODO: Use bcrypt.compare when implementing proper hashing
  return provided === stored
}

// Simple session management using localStorage on client
export interface AdminSession {
  authenticated: boolean
  timestamp: number
}

export function createAdminSession(): AdminSession {
  return {
    authenticated: true,
    timestamp: Date.now(),
  }
}

export function isSessionValid(session: AdminSession | null): boolean {
  if (!session || !session.authenticated) {
    return false
  }

  // Session expires after 1 hour
  const oneHour = 60 * 60 * 1000
  return Date.now() - session.timestamp < oneHour
}
