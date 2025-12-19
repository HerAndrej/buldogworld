import React from 'react';
import { HeartHandshake, Award, BookCheck, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';

export const Expertise: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 relative">
             <Reveal direction="right">
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-[4/5]">
                  <img 
                    src="https://iili.io/fcB7z2S.webp" 
                    alt="Vlasnik sa psom" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <p className="font-serif text-2xl italic">"Francuski buldozi nisu samo psi, oni su članovi porodice."</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cream-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 -z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 -z-10"></div>
             </Reveal>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                Zašto sam napisao ovaj vodič?
              </h2>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="text-lg text-gray-600 leading-relaxed">
                Kao dugogodišnji vlasnik i ljubitelj rase, prošao sam kroz sve faze – od panike zbog čudnog disanja do beskrajnih poseta veterinaru zbog alergija. Shvatio sam da <strong>ne postoji jedinstveno mesto</strong> gde možete naći proverene informacije specifične za naše "francuze".
              </p>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={300} direction="up" width="100%">
                <div className="flex gap-4 p-4 rounded-xl bg-cream-50 border border-cream-100">
                  <div className="bg-brand-light p-3 rounded-full h-fit text-brand-dark">
                    <HeartHandshake size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-dark">Iskustvo iz prve ruke</h4>
                    <p className="text-gray-600">Pretočeno 7 godina suživota i učenja u jasne korake.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={400} direction="up" width="100%">
                 <div className="flex gap-4 p-4 rounded-xl bg-cream-50 border border-cream-100">
                  <div className="bg-brand-light p-3 rounded-full h-fit text-brand-dark">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-dark">Veterinarska saradnja</h4>
                    <p className="text-gray-600">Svi zdravstveni saveti su pregledani i odobreni od strane stručnjaka.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={500} direction="up" width="100%">
                <div className="flex gap-4 p-4 rounded-xl bg-cream-50 border border-cream-100">
                  <div className="bg-brand-light p-3 rounded-full h-fit text-brand-dark">
                    <BookCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-dark">Praktično i primenljivo</h4>
                    <p className="text-gray-600">Bez suvoparne teorije, samo rešenja koja rade u praksi.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={600} width="100%">
              <Button 
                href="https://payhip.com/b/vaAPR" 
                className="group mt-4 payhip-buy-button"
                data-product="vaAPR"
              >
                Kupi Odmah
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};