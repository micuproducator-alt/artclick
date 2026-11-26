import { createContext, useContext, type ReactNode } from 'react'
import type { Lang, I18nData } from '../types'
import { t } from '../i18n'

interface LangContextValue {
  lang: Lang
  i18n: I18nData
}

const LangContext = createContext<LangContextValue | null>(null)

// The site is English-only.
export function LangProvider({ children }: { children: ReactNode }) {
  return (
    <LangContext.Provider value={{ lang: 'en', i18n: t('en') }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
