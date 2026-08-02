import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'ar' || saved === 'tr')) {
      return saved;
    }
    // Try to detect from browser language
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'ar' || browserLang === 'tr') ? (browserLang as Language) : 'ar';
  });

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Load data from JSON
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('language', language);
    // Update HTML dir attribute
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): any => {
    if (!data) return key;
    
    const keys = key.split('.');
    let value: any = data;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    // If value is an object with language keys, return the appropriate language
    if (value && typeof value === 'object' && language in value) {
      return value[language];
    }
    
    return value;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
