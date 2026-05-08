import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

export const Success: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lgrfyuyllgfiberpbove.supabase.co';

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDownloadLink = async () => {
      const txnId = localStorage.getItem('paddleTransactionId') || '';

      if (!txnId) {
        setError(t('success_error_no_transaction') || 'Transaction not found. Please check your email for the download link.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${supabaseUrl}/functions/v1/get-download-link`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transaction_id: txnId, locale: language }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to verify purchase');
        }

        const data = await res.json();
        setDownloadUrl(data.url);
      } catch (err: any) {
        setError(err.message || 'Something went wrong. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadLink();
  }, [language, supabaseUrl, t]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('success_title') || 'Payment Successful!'}
        </h1>
        <p className="text-gray-600 mb-8 space-y-2">
          <span className="block">{t('success_thankyou') || 'Thank you for your purchase.'}</span>
          <span className="block italic">{t('success_ready') || 'Your "Bulldog World" Premium Package is ready.'}</span>
        </p>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <span className="text-gray-500 text-sm">{t('success_verifying') || 'Verifying your purchase...'}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 text-sm">{error}</p>
            <p className="text-gray-500 text-xs mt-3">
              {t('success_contact_support') || 'If you completed the payment, please contact our support team.'}
            </p>
          </div>
        )}

        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto gap-3"
          >
            <Download className="w-6 h-6" />
            {t('success_download_btn') || 'Download Complete Package (ZIP)'}
          </a>
        )}

        <p className="mt-8 text-sm text-gray-500">
          {t('success_note') || '* This ZIP file contains your guide, MP3 audio, and all promised bonuses.'}
          <br /><br />
          {t('success_support') || 'If you have any issues downloading your files, please contact our support team.'}
        </p>
      </div>
    </div>
  );
};
