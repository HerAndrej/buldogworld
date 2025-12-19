import { LucideIcon } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  image: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Problem {
  id: number;
  text: string;
}

export interface CurriculumItem {
  id: number;
  title: string;
  items: string[];
}