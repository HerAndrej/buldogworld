import React from 'react';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';

export const BeforeAfter: React.FC = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-cream-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Transformacija</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
              Od zbunjenog do sigurnog vlasnika
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <Reveal direction="right" width="100%" className="flex-1">
            <div className="bg-white rounded-3xl p-8 border-2 border-transparent shadow-lg h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gray-200"></div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-500">Bez Vodiča</h3>
                <XCircle className="text-gray-400" size={32} />
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>Stalna briga da li pas jede ispravno</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>Česte posete veterinaru zbog alergija</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>Uništen nameštaj i cipele</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  <span>Frustracija tokom šetnje</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* After Card */}
          <Reveal direction="left" width="100%" className="flex-1">
            <div className="bg-white rounded-3xl p-8 border-2 border-brand-orange shadow-2xl h-full relative overflow-hidden transform md:-translate-y-4 md:scale-105 z-10 transition-transform">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-orange"></div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-brand-dark">Sa Vodičem</h3>
                <CheckCircle className="text-brand-orange" size={32} />
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>Jasan i zdrav plan ishrane</span>
                </li>
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>Zdrav pas bez kožnih problema</span>
                </li>
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>Miran pas koji sluša komande</span>
                </li>
                <li className="flex items-start gap-3 text-brand-dark font-medium">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span>Uživanje u svakom zajedničkom trenutku</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400} width="100%" className="mt-16 flex justify-center">
           <Button onClick={scrollToPricing} className="group">
             Kupi Odmah
             <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </Reveal>
      </div>
    </section>
  );
};