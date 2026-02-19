import React from 'react';
import { AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { useTranslations } from '../hooks/useTranslations';

const PROBLEMS_KEYS = [
  'problem_1',
  'problem_2',
  'problem_3',
  'problem_4',
];

export const Problems: React.FC = () => {
  const t = useTranslations();

  return (
    <section id="problems" className="py-24 bg-white relative">
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              {t('problems_title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('problems_subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROBLEMS_KEYS.map((key, index) => (
            <Reveal key={key} delay={index * 100} width="100%" direction="up">
              <div 
                className="group h-full p-8 rounded-2xl bg-cream-50 border border-cream-200 hover:border-brand-orange/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300 shadow-sm">
                  <HelpCircle size={32} />
                </div>
                <p className="text-lg font-medium text-gray-800 leading-snug">
                  "{t(key)}"
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} width="100%">
          <div className="mt-16 p-8 bg-brand-light/50 border border-brand-light rounded-3xl flex flex-col items-center gap-8 justify-center text-center backdrop-blur-sm">
             <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-3 bg-white rounded-full shadow-md">
                  <AlertCircle className="text-brand-orange flex-shrink-0" size={32} />
                </div>
                <p className="text-lg md:text-xl font-medium text-brand-dark max-w-2xl text-center md:text-left">
                  {t('problems_solution_part1')} <span className="text-brand-orange font-bold decoration-brand-orange/30 underline decoration-2 underline-offset-2">{t('problems_solution_part2')}</span>.
                </p>
             </div>
             <Button 
              variant="success"
              href="https://payhip.com/b/vaAPR" 
              className="group payhip-buy-button"
              data-product="vaAPR"
            >
               {t('buy_now')}
               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
