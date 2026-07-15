import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang, I18nData } from '../types'
import { t } from '../i18n'

interface LangContextValue {
  lang: Lang
  i18n: I18nData
  toggleLang: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ro')

  useEffect(() => {
    const saved = localStorage.getItem('ac_lang') as Lang | null
    if (saved === 'ro' || saved === 'en') {
      setLang(saved)
      return
    }
    // detect by IP
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const detected: Lang = d.country_code === 'RO' ? 'ro' : 'en'
        setLang(detected)
        localStorage.setItem('ac_lang', detected)
      })
      .catch(() => {
        const detected: Lang = navigator.language.startsWith('ro') ? 'ro' : 'en'
        setLang(detected)
      })
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => {
    const next: Lang = lang === 'ro' ? 'en' : 'ro'
    setLang(next)
    localStorage.setItem('ac_lang', next)
  }

  return (
    <LangContext.Provider value={{ lang, i18n: t(lang), toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
