import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { TermsOfService } from './components/TermsOfService';
import { RefundPolicy } from './components/RefundPolicy';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Success } from './components/Success';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const isSuccess = new URLSearchParams(window.location.search).get('success') === 'true';

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-cream-50/50">
          <Header />
          <main className="flex-grow">
            {isSuccess ? (
              <Success />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            )}
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
