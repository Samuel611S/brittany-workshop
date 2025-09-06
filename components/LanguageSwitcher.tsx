'use client'

import { useLanguage } from '@/lib/language-context'
import { Language } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">{t.language}:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => handleLanguageChange('es')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'es'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🇪🇸 Español
        </button>
      </div>
    </div>
  )
}
