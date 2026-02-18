import React from 'react';
import { ShieldCheck, Lock, Award } from 'lucide-react';
import { Reveal } from './Reveal';
import { useTranslations } from '../hooks/useTranslations';

export const Guarantee: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="py-20 bg-cream-50 border-y border-cream-200">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal width="100%">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-cream-100 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            
            <div className="relative">
              <div className="w-32 h-32 bg-brand-light rounded-full flex items-center justify-center relative z-10 animate-pulse-slow">
                <ShieldCheck size={64} className="text-brand-dark" />
              </div>
              <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-xl transform scale-125 z-0"></div>
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
                {t('guarantee_title')}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('guarantee_subtitle')}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Lock size={14} className="text-green-500" />
                  {t('ssl_secure_purchase')}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Award size={14} className="text-brand-orange" />
                  {t('premium_quality')}
                </div>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};