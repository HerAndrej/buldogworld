import React from 'react';
import { Button } from './Button';
import { Check, ShieldCheck, Download, Zap, Star } from 'lucide-react';
import { Reveal } from './Reveal';
import { useTranslations } from '../hooks/useTranslations';
import { usePaddleCheckout } from '../hooks/usePaddleCheckout';

export const FinalCTA: React.FC = () => {
  const t = useTranslations();
  const { openCheckout } = usePaddleCheckout();

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal width="100%" className="max-w-5xl mx-auto">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-dark/20">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <Reveal delay={200}>
                <div className="flex items-center justify-center gap-2 mb-8 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full w-fit mx-auto border border-white/10">
                    <span className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </span>
                    <span className="text-gray-200 text-sm font-medium ml-2">{t('cta_over_1500_owners')}</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                  {t('cta_title')}
                </h2>
              </Reveal>

              <Reveal delay={400}>
                <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {t('cta_subtitle')}
                </p>
              </Reveal>

              {/* Modern Pricing Card */}
              <Reveal delay={600} direction="up" width="100%" className="flex justify-center w-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-1 max-w-md w-full transform hover:-translate-y-1 transition-all duration-500 shadow-2xl">
                    <div className="bg-gradient-to-b from-white/10 to-transparent rounded-[1.3rem] p-8 md:p-10 relative overflow-hidden">
                        
                        {/* Badge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] py-1.5 px-6 rounded-b-xl shadow-lg shadow-brand-orange/30 z-10 w-max">
                            {t('special_offer')}
                        </div>

                        <div className="text-center mb-10 mt-6">
                            <div className="inline-flex flex-col items-center justify-center relative">
                              <span className="text-gray-400 text-lg line-through decoration-red-500/80 decoration-2 mb-1">35$</span>
                              <div className="flex items-start justify-center gap-1">
                                  <span className="text-6xl font-bold text-white tracking-tighter leading-none">20</span>
                                  <span className="text-xl text-white/80 font-bold mt-1">$</span>
                              </div>
                            </div>
                            <div className="mt-4 inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                                <Zap size={14} fill="currentColor" />
                                <span>{t('save_over_40_percent')}</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10 text-left w-full">
                             {[
                                t('feature_ebook'),
                                t('feature_audio'),
                                t('feature_bonus_diet'),
                                t('feature_bonus_foods'),
                                t('feature_lifetime_updates')
                             ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 group">
                                    <div className="bg-brand-orange rounded-full p-0.5 mt-0.5 group-hover:scale-110 transition-transform">
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-200 font-medium text-sm md:text-base">{item}</span>
                                </div>
                             ))}
                        </div>

                        <Button 
                          fullWidth 
                          className="shimmer-btn"
                          onClick={openCheckout}
                        >
                            {t('buy_now')}
                        </Button>

                        <div className="mt-6 flex flex-col gap-2 text-[11px] md:text-xs text-gray-400 font-medium text-center">
                            <div className="flex items-center justify-center gap-4">
                                <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> {t('30_day_guarantee')}</span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                <span className="flex items-center gap-1.5"><Download size={14} /> {t('instant_delivery')}</span>
                            </div>
                        </div>
                    </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};