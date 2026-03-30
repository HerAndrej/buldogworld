import React from 'react';
import { Download, CheckCircle } from 'lucide-react';

export const Success: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 space-y-2">
          <span className="block">Thank you for your purchase.</span>
          <span className="block italic">Your "Bulldog World" E-book is ready.</span>
        </p>
        <a 
          href="/BulldogWorld-Ebook.pdf" 
          download
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto gap-3"
        >
          <Download className="w-6 h-6" />
          Download E-book
        </a>
        <p className="mt-8 text-sm text-gray-500">
          If you have any issues downloading your book, please contact our support team.
        </p>
      </div>
    </div>
  );
};
