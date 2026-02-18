import React, { createContext, useState, useContext, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Available languages
export const availableLanguages = ['sr', 'de', 'en', 'ru'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // 1. Check URL first
    const params = new URLSearchParams(window.location.search);
    const langFromURL = params.get('lang');
    if (langFromURL && availableLanguages.includes(langFromURL)) {
      return langFromURL;
    }

    // 2. Check localStorage
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage && availableLanguages.includes(langFromStorage)) {
      return langFromStorage;
    }
    
    // 3. Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (availableLanguages.includes(browserLang)) {
      return browserLang;
    }

    // 4. Default to 'sr'
    return 'sr';
  });

  useEffect(() => {
    // Save language to localStorage whenever it changes
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
