import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { TermsOfService } from './components/TermsOfService';
import { RefundPolicy } from './components/RefundPolicy';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Success } from './components/Success';
import { AdminDashboard } from './components/AdminDashboard';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC<{ isSuccess: boolean }> = ({ isSuccess }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
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
  );
};

const App: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // Paddle automatski dodaje _ptxn (Transaction ID) u link nakon uspešne kupovine.
  // Zahtevamo da ovaj kod postoji kako bismo otežali ljudima da samo ukucaju ?success=true
  const isSuccess = searchParams.get('success') === 'true' && searchParams.has('_ptxn');

  return (
    <LanguageProvider>
      <Router>
        <AppContent isSuccess={isSuccess} />
      </Router>
    </LanguageProvider>
  );
};

export default App;
