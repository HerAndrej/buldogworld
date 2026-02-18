import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className="bg-brand-dark text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="mb-6">
            <span className="text-2xl font-bold tracking-tight">
            Bulldog<span className="text-brand-orange">World</span>
          </span>
        </div>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          {t('footer_subtitle')}
        </p>
        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">{t('privacy_policy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('terms_of_service')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('contact')}</a>
        </div>
        <div className="mt-8 text-xs text-gray-600">
          © {new Date().getFullYear()} Bulldog World. {t('all_rights_reserved')}
        </div>
      </div>
    </footer>
  );
};