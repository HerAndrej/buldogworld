import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslations = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, string> | null>(null);

  const t = useCallback((key: string): string => {
    if (!translations) {
      // Translations are loading
      return '';
    }
    return translations[key] || key;
  }, [translations]);

  useEffect(() => {
    let active = true;
    const loadTranslations = async () => {
      try {
        const module = await import(`../translations/${language}.json`);
        if (active) {
            setTranslations(module.default);
        }
      } catch (error) {
        console.error(`Could not load translations for ${language}`, error);
        if (active) {
            setTranslations({});
        }
      }
    };

    loadTranslations();
    
    return () => {
        active = false;
    }
  }, [language, t]);

  return t;
};
