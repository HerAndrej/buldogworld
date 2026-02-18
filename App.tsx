import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problems } from './components/Problems';
import { BeforeAfter } from './components/BeforeAfter';
import { Solution } from './components/Solution';
import { Expertise } from './components/Expertise';
import { Curriculum } from './components/Curriculum';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { Guarantee } from './components/Guarantee';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans bg-cream-50/50">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Problems />
          <BeforeAfter />
          <Solution />
          <Expertise />
          <Curriculum />
          <Testimonials />
          <Gallery />
          <Guarantee />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;