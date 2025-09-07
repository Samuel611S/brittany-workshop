// Environment variables validation
export function validateEnvironment() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'APP_SECRET'
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  // Validate APP_SECRET strength
  if (process.env.APP_SECRET && process.env.APP_SECRET.length < 32) {
    throw new Error('APP_SECRET must be at least 32 characters long')
  }

  return true
}

// Validate environment on import
try {
  validateEnvironment()
} catch (error) {
  console.error('Environment validation failed:', error)
  process.exit(1)
}
