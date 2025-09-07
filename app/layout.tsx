import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import { UserProvider } from '@/lib/user-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextKey Housing Access Foundation - Choose Your Learning Track',
  description: 'Specialized workshop tracks designed for different audiences navigating NYC housing programs',
  robots: 'index, follow',
  other: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}


