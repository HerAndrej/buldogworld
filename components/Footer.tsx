import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

const TikTokIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93v8.12c0 4.48-3.58 8.11-8.06 8.11c-4.48 0-8.06-3.63-8.06-8.11c0-4.48 3.58-8.11 8.06-8.11c.91 0 1.83.15 2.7.45v4.06c-.88-.28-1.78-.29-2.67-.09c-1.4.31-2.58 1.34-3.04 2.69c-.48 1.41-.18 2.97.8 4.09c.97 1.12 2.5 1.66 3.98 1.46c1.48-.21 2.68-1.22 3.19-2.62c.2-.56.28-1.15.28-1.74V.02z" />
  </svg>
);

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

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href="https://www.instagram.com/bulldogworlds_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-orange transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://www.tiktok.com/@bulldogworlds_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-orange transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon />
          </a>
        </div>

        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('privacy_policy')}</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">{t('terms_of_service')}</Link>
          <Link to="/refund-policy" className="hover:text-white transition-colors">{t('refund_policy')}</Link>
        </div>
        <div className="mt-8 text-xs text-gray-600">
          © {new Date().getFullYear()} Bulldog World. {t('all_rights_reserved')}
        </div>
      </div>
    </footer>
  );
};
