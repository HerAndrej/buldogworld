import React from 'react';
import { Hero } from './Hero';
import { Problems } from './Problems';
import { BeforeAfter } from './BeforeAfter';
import { Solution } from './Solution';
import { Expertise } from './Expertise';
import { Curriculum } from './Curriculum';
import { Testimonials } from './Testimonials';
import { Gallery } from './Gallery';
import { Guarantee } from './Guarantee';
import { FAQ } from './FAQ';
import { FinalCTA } from './FinalCTA';
import { LeadMagnet } from './LeadMagnet';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Problems />
      <BeforeAfter />
      <Solution />
      <Expertise />
      <Curriculum />
      <Testimonials />
      <LeadMagnet />
      <Gallery />
      <Guarantee />
      <FAQ />
      <FinalCTA />
    </>
  );
};
