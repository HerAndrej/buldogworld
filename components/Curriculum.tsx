import React, { useState } from 'react';
import { CURRICULUM } from '../constants';
import { ChevronDown, BookOpen, Lock, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';

export const Curriculum: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number | null>(1);

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
            <span className="text-brand-orange font-bold tracking-wider uppercase text-sm">Ekskluzivan sadržaj</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
              Kompletan vodič u 6 modula
            </h2>
            <p className="text-gray-600 mt-4">Kliknite na poglavlja da vidite detaljan sadržaj.</p>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {CURRICULUM.map((chapter, index) => (
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
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Poglavlje {chapter.id}</span>
                      <h3 className={`text-lg md:text-xl font-bold transition-colors ${
                        activeChapter === chapter.id ? 'text-brand-orange' : 'text-brand-dark'
                      }`}>
                        {chapter.title}
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
                        <li key={idx} className="flex items-center gap-3 text-gray-600 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/60"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-400">
                      <Lock size={14} />
                      <span>Samo u premium verziji</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600} width="100%" className="mt-16 flex justify-center">
           <Button onClick={scrollToPricing} className="group">
             Kupi Odmah
             <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </Reveal>
      </div>
    </section>
  );
};