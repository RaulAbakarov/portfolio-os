import { createContext, useContext, useState, useCallback } from 'react'
import en from './en'
import az from './az'
import ru from './ru'

const translations = { en, az, ru }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-lang')
      if (saved && translations[saved]) return saved
    } catch {}
    return 'en'
  })

  const changeLang = useCallback((newLang) => {
    if (translations[newLang]) {
      setLang(newLang)
      try { localStorage.setItem('portfolio-lang', newLang) } catch {}
    }
  }, [])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
