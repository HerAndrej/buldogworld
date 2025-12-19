import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { Reveal } from './Reveal';
import { X, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-cream-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal width="100%">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">Naši Prijatelji</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark">Galerija Srećnih Buldoga</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Svaki od ovih pasa uživa u najboljem mogućem životu. Pridružite se hiljadama vlasnika koji su transformisali svakodnevicu svog ljubimca.
            </p>
          </div>
        </Reveal>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <Reveal key={index} delay={index * 50} direction="up" width="100%">
              <div 
                className={`relative group cursor-pointer overflow-hidden rounded-[2rem] aspect-square transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  index % 5 === 0 ? 'md:col-span-2 md:aspect-video lg:aspect-square lg:col-span-1' : ''
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Frenchie ${index}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 size={24} />
                   </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={() => setSelectedImage(null)}></div>
          <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 md:-right-12 p-2 text-white hover:text-brand-orange transition-colors"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-scale-up"
            />
          </div>
        </div>
      )}
    </section>
  );
};