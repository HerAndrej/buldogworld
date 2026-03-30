import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabaseClient';
import { Reveal } from './Reveal';
import { Button } from './Button';

export const LeadMagnet: React.FC = () => {
  const t = useTranslations();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          { email, language },
        ]);

      if (error) throw error;
      
      // Auto-download the PDF
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lgrfyuyllgfiberpbove.supabase.co';
      const pdfUrl = `${supabaseUrl}/storage/v1/object/public/ebooks/mistakes-${language}.pdf`;
      window.open(pdfUrl, '_blank');
      
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Lead capture error:', err);
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-dark/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal width="100%" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-14 md:flex items-center gap-12 relative overflow-hidden">
            
            {/* Visual element on left (or top on mobile) */}
            <div className="flex-1 mb-10 md:mb-0">
              <div className="bg-brand-orange text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full inline-block mb-6 shadow-md shadow-brand-orange/20">
                {t('lead_magnet_badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark leading-tight">
                {t('lead_magnet_title')}
              </h2>
              <p className="text-gray-600 text-lg mb-0 leading-relaxed">
                {t('lead_magnet_subtitle')}
              </p>
            </div>

            {/* Form on right */}
            <div className="flex-1 w-full max-w-md">
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
                  <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">{t('lead_magnet_success')}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      disabled={status === 'loading'}
                      placeholder={t('lead_magnet_placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <div className="text-red-500 text-sm flex items-center gap-1.5 px-1 animate-fade-in">
                      <AlertCircle size={16} />
                      <span>{t('lead_magnet_error')}</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    fullWidth 
                    variant="primary" 
                    className="py-4 shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 group"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t('lead_magnet_button')}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-3 pt-2">
                    {t('lead_magnet_subtext')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
