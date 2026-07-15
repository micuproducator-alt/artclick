import ro from './ro'
import en from './en'
import type { I18nData, Lang } from '../types'

const translations: Record<Lang, I18nData> = { ro, en }

export function t(lang: Lang): I18nData {
  return translations[lang]
}

export { ro, en }
