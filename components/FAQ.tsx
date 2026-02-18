import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { useTranslations } from '../hooks/useTranslations';

export const FAQ: React.FC = () => {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: t('faq_1_question'),
      answer: t('faq_1_answer'),
    },
    {
      id: 2,
      question: t('faq_2_question'),
      answer: t('faq_2_answer'),
    },
    {
      id: 3,
      question: t('faq_3_question'),
      answer: t('faq_3_answer'),
    },
    {
      id: 4,
      question: t('faq_4_question'),
      answer: t('faq_4_answer'),
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <Reveal width="100%">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('faq_title')}
            </h2>
            <p className="text-gray-600">{t('faq_subtitle')}</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={faq.id} delay={index * 50} width="100%" direction="up">
              <div 
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  openIndex === index 
                    ? 'border-brand-orange/30 bg-cream-50/50 shadow-md' 
                    : 'border-cream-200 hover:border-gray-300'
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => toggle(index)}
                >
                  <span className={`text-lg font-bold transition-colors ${
                    openIndex === index ? 'text-brand-orange' : 'text-brand-dark'
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`p-2 rounded-full transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 bg-brand-orange/10 text-brand-orange' : 'text-gray-400'
                  }`}>
                    <ChevronDown size={20} />
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-black/5 pt-4 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};