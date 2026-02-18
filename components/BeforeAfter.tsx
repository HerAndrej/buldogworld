import React from 'react';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { useTranslations } from '../hooks/useTranslations';

export const BeforeAfter: React.FC = () => {
  const t = useTranslations();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-cream-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">{t('ba_transformation')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
              {t('ba_title')}
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <Reveal direction="right" width="100%" className="flex-1">
            <div className="bg-white rounded-3xl p-8 border-2 border-transparent shadow-lg h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gray-200"></div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-500">{t('ba_without_guide')}</h3>
                <XCircle className="text-gray-400" size={32} />
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>{t('ba_without_1')}</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>{t('ba_without_2')}</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>{t('ba_without_3')}</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>{t('ba_without_4')}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* After Card */}
          <Reveal direction="left" width="100%" className="flex-1">
            <div className="bg-white rounded-3xl p-8 border-2 border-brand-orange shadow-2xl h-full relative overflow-hidden transform md:-translate-y-4 md:scale-105 z-10 transition-transform">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-orange"></div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-brand-dark">{t('ba_with_guide')}</h3>
                <CheckCircle className="text-brand-orange" size={32} />
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>{t('ba_with_1')}</span>
                </li>
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>{t('ba_with_2')}</span>
                </li>
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>{t('ba_with_3')}</span>
                </li>
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>{t('ba_with_4')}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400} width="100%" className="mt-16 flex justify-center">
           <Button onClick={scrollToPricing} className="group">
             {t('buy_now')}
             <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </Reveal>
      </div>
    </section>
  );
};