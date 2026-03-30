import React from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Success: React.FC = () => {
  const { language } = useLanguage();
  
  // Ako je VITE_SUPABASE_URL dostupan korsitimo ga, u suprotnom fallback na direktni link iz tvog uputstva
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lgrfyuyllgfiberpbove.supabase.co';
  
  // Formatiramo linkove ka fajlovima (PDF i ZIP obezbedjeni iste strukture)
  const pdfUrl = `${supabaseUrl}/storage/v1/object/public/ebooks/bulldog-${language}.pdf`;
  const zipUrl = `${supabaseUrl}/storage/v1/object/public/ebooks/bulldog-${language}.zip`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 space-y-2">
          <span className="block">Thank you for your purchase.</span>
          <span className="block italic">Your "Bulldog World" materials are ready.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={pdfUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-4 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto gap-2"
          >
            <Download className="w-5 h-5" />
            E-book (PDF)
          </a>
          <a 
            href={zipUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-4 text-sm font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-amber-200 w-full sm:w-auto gap-2"
          >
            <Download className="w-5 h-5" />
            Extra fajlovi (ZIP)
          </a>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          If you have any issues downloading your files, please contact our support team.
        </p>
      </div>
    </div>
  );
};
