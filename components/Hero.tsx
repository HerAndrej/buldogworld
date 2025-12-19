import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  const [ownerCount, setOwnerCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 1534;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setOwnerCount(end);
        clearInterval(timer);
      } else {
        setOwnerCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-gradient-to-b from-cream-100 to-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-light rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 z-0"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-12 lg:gap-16">
          <div className="space-y-8 max-w-4xl mx-auto flex flex-col items-center">
            <Reveal delay={200}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-brand-orange/20 rounded-full text-brand-dark font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 mx-auto">
                <span className="flex text-yellow-500 gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </span>
                <span className="text-gray-600 border-l border-gray-200 pl-2 ml-1">
                  Preko <strong>{ownerCount.toLocaleString()}+</strong> vlasnika
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={400}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-brand-dark tracking-tight">
                Odgajite srećnog i zdravog <span className="text-brand-orange">Francuskog buldoga</span> bez stresa
              </h1>
            </Reveal>
            
            <Reveal delay={600}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Kompletan vodič kroz ishranu, zdravlje, vaspitanje i negu. 
                Sve što niste znali, a veterinar vam nije rekao – na jednom mestu.
              </p>
            </Reveal>

            <Reveal delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="https://payhip.com/b/vaAPR" 
                  className="group payhip-buy-button"
                  data-product="vaAPR"
                >
                  Kupi Odmah
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth'})}>
                  Sadržaj Knjige
                </Button>
              </div>
            </Reveal>

            <Reveal delay={1000}>
              <div className="pt-2 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>Instant preuzimanje</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>Doživotni pristup</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative w-full max-w-5xl mx-auto">
            <Reveal direction="up" delay={600} width="100%">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img 
                  src="https://iili.io/fcB7o42.webp" 
                  alt="Srećan Francuski buldog" 
                  className="w-full h-auto object-cover max-h-[600px] object-center"
                />
              </div>
            </Reveal>
            <div className="absolute inset-0 bg-brand-dark rounded-[2.5rem] transform rotate-1 scale-[1.02] -z-10 opacity-10"></div>
            <div className="absolute -bottom-6 left-10 z-20 animate-bounce-slow hidden md:block">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-cream-200 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-brand-dark">Veterinarski</p>
                  <p className="text-xs text-gray-500">odobrili stručnjaci</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};