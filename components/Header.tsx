import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from '../hooks/useTranslations';

export const Header: React.FC = () => {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream-100/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <img 
            src="https://iili.io/q2Xpfku.png" 
            alt="Bulldog World Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span className="text-xl font-bold tracking-tight text-brand-dark">
            Bulldog<span className="text-brand-orange">World</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => scrollToSection('problems')} className="text-gray-600 hover:text-brand-orange font-medium transition-colors">{t('nav_problems')}</button>
          <button onClick={() => scrollToSection('curriculum')} className="text-gray-600 hover:text-brand-orange font-medium transition-colors">{t('nav_curriculum')}</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-brand-orange font-medium transition-colors">{t('nav_testimonials')}</button>
          <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-brand-orange font-medium transition-colors">{t('nav_gallery')}</button>
          <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-brand-orange font-medium transition-colors">{t('nav_faq')}</button>
        </nav>

        {/* Language Switcher & CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <Button 
            variant={isScrolled ? 'primary' : 'secondary'} 
            className="!px-6 !py-2 !text-base payhip-buy-button"
            href="https://payhip.com/b/vaAPR"
            data-product="vaAPR"
          >
            {t('order_guide')}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-dark p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl p-4 flex flex-col gap-4 lg:hidden animate-fade-in-down border-t border-gray-100">
          <button onClick={() => scrollToSection('problems')} className="text-left p-2 text-lg font-medium text-gray-700">{t('nav_problems')}</button>
          <button onClick={() => scrollToSection('curriculum')} className="text-left p-2 text-lg font-medium text-gray-700">{t('nav_curriculum')}</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-left p-2 text-lg font-medium text-gray-700">{t('nav_testimonials')}</button>
          <button onClick={() => scrollToSection('gallery')} className="text-left p-2 text-lg font-medium text-gray-700">{t('nav_gallery')}</button>
          <button onClick={() => scrollToSection('faq')} className="text-left p-2 text-lg font-medium text-gray-700">{t('nav_faq')}</button>
          <div className="border-t border-gray-100 pt-4">
            <LanguageSwitcher />
          </div>
          <Button 
            href="https://payhip.com/b/vaAPR" 
            className="payhip-buy-button" 
            data-product="vaAPR"
            fullWidth
          >
            {t('order_guide')}
          </Button>
        </div>
      )}
    </header>
  );
};