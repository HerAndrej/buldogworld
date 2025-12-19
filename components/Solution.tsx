import React from 'react';
import { Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Solution: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 flex justify-center">
             <div className="relative group perspective-1000 w-full max-w-[400px]">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white/10 transform transition-transform group-hover:scale-105 duration-700">
                   <img 
                     src="https://iili.io/fcB7nEl.webp" 
                     alt="Srećan i zdrav pas" 
                     className="w-full h-auto object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                   <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-bold text-lg">Vaš vodič do srećnog psa</p>
                   </div>
                </div>
                <div className="absolute -bottom-8 left-10 right-10 h-8 bg-black/40 blur-xl rounded-[100%]"></div>
             </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Konačno rešenje za sve vaše nedoumice
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Zaboravite na kontradiktorne savete sa interneta i foruma. Ovaj e-book je nastao u saradnji sa iskusnim odgajivačima i veterinarima specijalizovanim za brahicefalične rase.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-orange rounded-xl text-white">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Proverene informacije</h4>
                  <p className="text-gray-400">Bez nagađanja. Samo metode koje dokazano funkcionišu za francuze.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-orange rounded-xl text-white">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Fokus na zdravlje</h4>
                  <p className="text-gray-400">Poseban akcenat na preventivu najčešćih bolesti i dugovečnost vašeg psa.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                href="https://payhip.com/b/vaAPR" 
                className="group payhip-buy-button"
                data-product="vaAPR"
              >
                Kupi Odmah
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};