import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { useTranslations } from '../hooks/useTranslations';

export const Testimonials: React.FC = () => {
  const t = useTranslations();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      id: 1,
      name: 'Marko Petrović',
      location: 'Beograd, Srbija',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: t('testimonial_1'),
    },
    {
      id: 2,
      name: 'Jelena Jovanović',
      location: 'Novi Sad, Srbija',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: t('testimonial_2'),
    },
    {
      id: 3,
      name: 'Stefan Schmidt',
      location: 'Berlin, Nemačka',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
      text: t('testimonial_3'),
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal width="100%">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-16">
            {t('testimonials_title')}
          </h2>
        </Reveal>

        <div className="relative -mx-4 md:mx-0">
           <div className="flex overflow-x-auto gap-6 px-4 pb-12 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="min-w-[85vw] md:min-w-0 snap-center">
                <Reveal delay={index * 100} width="100%" direction="up" className="h-full">
                  <div 
                    className="bg-cream-50 p-8 rounded-[2rem] h-full relative border border-cream-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                  >
                    <Quote className="absolute top-8 right-8 text-brand-orange/10" size={64} />
                    
                    <div className="flex gap-1 text-yellow-400 mb-6">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>

                    <p className="text-gray-700 font-medium italic relative z-10 leading-relaxed mb-8 flex-grow">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                      />
                      <div>
                        <h4 className="font-bold text-brand-dark text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent md:hidden pointer-events-none"></div>
          <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent md:hidden pointer-events-none"></div>
        </div>

        <Reveal delay={400} width="100%" className="mt-8 flex justify-center">
           <Button onClick={scrollToPricing} className="group">
             {t('buy_now')}
             <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </Reveal>
      </div>
    </section>
  );
};