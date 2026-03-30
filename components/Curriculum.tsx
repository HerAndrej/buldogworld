import React, { useState } from 'react';
import { ChevronDown, BookOpen, Lock, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { useTranslations } from '../hooks/useTranslations';

const CURRICULUM_KEYS = [
  {
    id: 1,
    title: "curriculum_1_title",
    items: [
      "curriculum_1_item_1",
      "curriculum_1_item_2",
      "curriculum_1_item_3",
      "curriculum_1_item_4",
    ]
  },
  {
    id: 2,
    title: "curriculum_2_title",
    items: [
      "curriculum_2_item_1",
      "curriculum_2_item_2",
      "curriculum_2_item_3",
      "curriculum_2_item_4",
    ]
  },
  {
    id: 3,
    title: "curriculum_3_title",
    items: [
      "curriculum_3_item_1",
      "curriculum_3_item_2",
      "curriculum_3_item_3",
    ]
  },
  {
    id: 4,
    title: "curriculum_4_title",
    items: [
      "curriculum_4_item_1",
      "curriculum_4_item_2",
      "curriculum_4_item_3",
    ]
  },
  {
    id: 5,
    title: "curriculum_5_title",
    items: [
      "curriculum_5_item_1",
      "curriculum_5_item_2",
      "curriculum_5_item_3",
    ]
  },
  {
    id: 6,
    title: "curriculum_6_title",
    items: [
      "curriculum_6_item_1",
      "curriculum_6_item_2",
    ]
  }
];

export const Curriculum: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number | null>(1);
  const t = useTranslations();

  const toggleChapter = (id: number) => {
    setActiveChapter(activeChapter === id ? null : id);
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="curriculum" className="py-24 bg-cream-50 relative">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-bold tracking-wider uppercase text-sm">{t('curriculum_subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
              {t('curriculum_title')}
            </h2>
            <p className="text-gray-600 mt-4">{t('curriculum_description')}</p>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {CURRICULUM_KEYS.map((chapter, index) => (
            <Reveal key={chapter.id} delay={index * 100} width="100%" direction="up">
              <div 
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  activeChapter === chapter.id 
                    ? 'border-brand-orange shadow-xl shadow-brand-orange/10 scale-[1.02]' 
                    : 'border-cream-200 shadow-sm hover:border-brand-orange/50'
                }`}
              >
                <button 
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full p-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      activeChapter === chapter.id ? 'bg-brand-orange text-white' : 'bg-brand-light text-brand-dark'
                    }`}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('curriculum_chapter')} {chapter.id}</span>
                      <h3 className={`text-lg md:text-xl font-bold transition-colors ${
                        activeChapter === chapter.id ? 'text-brand-orange' : 'text-brand-dark'
                      }`}>
                        {t(chapter.title)}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown 
                    size={24} 
                    className={`text-gray-400 transition-transform duration-300 ${activeChapter === chapter.id ? 'rotate-180 text-brand-orange' : ''}`} 
                  />
                </button>

                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeChapter === chapter.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 pl-[5.5rem]">
                    <ul className="space-y-3">
                      {chapter.items.map((item, idx) => (
                        <Reveal key={idx} delay={idx * 80} direction="up" width="100%">
                          <li className="flex items-center gap-3 text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/60"></div>
                            {t(item)}
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-400">
                      <Lock size={14} />
                      <span>{t('curriculum_premium')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600} width="100%" className="mt-16 flex justify-center">
           <Button onClick={scrollToPricing} className="group">
             {t('buy_now')}
             <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </Reveal>
      </div>
    </section>
  );
};
