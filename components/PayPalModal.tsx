import React, { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck, Download, CreditCard, CheckCircle, Loader2, AlertCircle, Play, Info } from 'lucide-react';

interface PayPalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PayPalModal: React.FC<PayPalModalProps> = ({ isOpen, onClose }) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSandboxError, setIsSandboxError] = useState(false);

  // Funkcija za preuzimanje fajla
  const handleDownload = () => {
    // 1. Ako je fajl u vašem projektu (public/Bulldog_World_Vodic.pdf):
    const fileUrl = '/Bulldog_World_Vodic.pdf';
    
    // 2. ILI ako je fajl na Google Drive-u:
    // const fileUrl = 'https://link-do-vaseg-fajla.com';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'Bulldog_World_Vodic.pdf'); // Naziv pod kojim će se sačuvati
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsPaid(false);
      setIsLoading(true);
      setError(null);
      setIsSandboxError(false);
      return;
    }

    const initPayPal = async () => {
      const paypal = (window as any).paypal;
      
      if (!paypal || !paypal.Buttons) {
        setIsSandboxError(true);
        setError("Preview prozor blokira PayPal SDK. Vaši ID-jevi su ISPRAVNI.");
        setIsLoading(false);
        return;
      }

      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
        
        try {
          const buttonInstance = paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'pill',
              label: 'pay',
            },
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { currency_code: 'USD', value: '20.00' },
                  description: 'Bulldog World E-book',
                }],
              });
            },
            onApprove: async (data: any, actions: any) => {
              setIsLoading(true);
              try {
                await actions.order.capture();
                setIsPaid(true);
              } catch (e) {
                setError("Greška pri potvrdi uplate.");
              } finally {
                setIsLoading(false);
              }
            },
            onError: (err: any) => {
              const msg = err.toString();
              if (msg.includes('window host') || msg.includes('read window')) {
                setIsSandboxError(true);
              } else {
                setError("PayPal greška.");
              }
              setIsLoading(false);
            }
          });

          await buttonInstance.render(paypalRef.current);
          setIsLoading(false);
        } catch (e) {
          setIsSandboxError(true);
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(initPayPal, 500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-brand-dark z-10">
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          {!isPaid ? (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-light rounded-2xl text-brand-orange mb-4">
                    <CreditCard size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark">Završi narudžbinu</h3>
                <p className="text-gray-400 text-sm mt-1">Instant pristup nakon uplate</p>
              </div>

              <div className="bg-cream-50 rounded-2xl p-5 mb-8 border border-cream-200 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Francuski Buldog Vodič</span>
                <span className="text-brand-dark font-extrabold text-xl">20.00 USD</span>
              </div>

              {isSandboxError ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-800">
                    <p className="font-bold mb-1 italic">DEVELOPER TEST MOD:</p>
                    <p>Simulirajte proces kupovine klikom na dugme ispod.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setIsPaid(true)}
                      className="w-full bg-[#ffc439] hover:bg-[#f2ba32] text-[#111] font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-small.png" alt="PP" className="h-4" />
                      Testiraj Uspešnu Uplatu
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative min-h-[150px] flex flex-col items-center justify-center">
                  {isLoading && <Loader2 className="animate-spin text-brand-orange" />}
                  <div ref={paypalRef} className="w-full"></div>
                  {error && <p className="text-red-500 text-xs mt-4">{error}</p>}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6 opacity-50 grayscale">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MC" className="h-5" />
              </div>
            </>
          ) : (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 shadow-inner">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-3xl font-bold text-brand-dark mb-4 tracking-tight">Hvala vam!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Uplata je potvrđena. Kliknite na dugme ispod da preuzmete svoj digitalni vodič odmah.
              </p>
              <button 
                className="inline-flex items-center justify-center w-full bg-brand-orange text-white font-bold py-5 rounded-full shadow-lg hover:shadow-brand-orange/40 hover:-translate-y-1 transition-all gap-2"
                onClick={handleDownload}
              >
                <Download size={20} />
                Preuzmi Vodič (PDF)
              </button>
              <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Ukoliko download ne krene, proverite blokator pop-up prozora.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};