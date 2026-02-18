import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languages = [
  {
    code: 'sr',
    name: 'Srpski',
    flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/rs.svg'
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/de.svg'
  },
  {
    code: 'en',
    name: 'English',
    flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg'
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ru.svg'
  }
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={selectedLanguage.flag} alt={selectedLanguage.name} className="w-6 h-auto rounded-sm" />
        <span className="hidden md:inline">{selectedLanguage.name}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20 w-36">
          {languages.map(lang => (
            <button 
              key={lang.code} 
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left w-full ${
                language === lang.code ? 'bg-brand-orange/10 text-brand-orange' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <img src={lang.flag} alt={lang.name} className="w-5 h-auto rounded-sm" />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};