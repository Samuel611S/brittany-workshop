import crypto from 'crypto'

// Ultra-secure admin password system
const ADMIN_PASSWORD_HASH = '7b0b1eb818a749add820aaa8603d2557188b62f764cb0fb60743f3ab22dfe17433bd63d262658524ea7cd6dfb8aee056ef558aa356573230f55038e51d499d66'

// Generate a secure admin password
export function generateSecureAdminPassword(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Hash admin password with salt
export function hashAdminPassword(password: string): string {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

// Verify admin password
export function verifyAdminPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':')
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return hash === verifyHash
}

// Check if password meets security requirements
export function validateAdminPasswordStrength(password: string): { valid: boolean; message: string } {
  if (password.length < 16) {
    return { valid: false, message: 'Admin password must be at least 16 characters long' }
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: 'Admin password must contain at least one lowercase letter' }
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'Admin password must contain at least one uppercase letter' }
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Admin password must contain at least one number' }
  }
  
  if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/.test(password)) {
    return { valid: false, message: 'Admin password must contain at least one special character' }
  }
  
  // Check for common patterns
  const commonPatterns = [
    /123456/i,
    /password/i,
    /admin/i,
    /qwerty/i,
    /abc123/i,
    /letmein/i
  ]
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    return { valid: false, message: 'Admin password cannot contain common patterns' }
  }
  
  return { valid: true, message: 'Admin password is secure' }
}

// Generate a secure admin password for initial setup
export function generateInitialAdminPassword(): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  let password = ''
  
  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Fill the rest randomly
  const allChars = uppercase + lowercase + numbers + symbols
  for (let i = 4; i < 20; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}
