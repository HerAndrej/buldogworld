import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// Supported language codes for the ebook
type SupportedLocale = 'en' | 'sr' | 'de' | 'ru';

declare global {
  interface Window {
    onPaddleEvent?: (event: any) => void;
  }
}

const PADDLE_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: 'en',
  sr: 'en', // Paddle doesn't support sr, fallback to English UI
  de: 'de',
  ru: 'en', // Paddle doesn't support ru, fallback to English UI
};

export const usePaddleCheckout = () => {
  useEffect(() => {
    window.onPaddleEvent = async (event: any) => {
      if (!event || !event.name || !event.data) return;
      
      const { name, data } = event;

      // Hvatamo email cim kupac popuni formu, ali jos nije konacno platio (pending status - abandoned cart)
      // Takodje, pratimo kada transakcija bude vracena kao declined, ili prosla uspesno!
      if (
        name === 'checkout.customer.created' || 
        name === 'checkout.customer.updated' || 
        name === 'checkout.payment.failed' ||
        name === 'checkout.completed'
      ) {
        const email = data.customer?.email || data.payment?.customer?.email || data.shipping?.email;
        if (!email) return;

        const paddleProductId = data.items?.[0]?.price?.product_id;
        const amountTotal = parseFloat(data.totals?.grand_total || '0') / 100;
        const currency = data.currency_code || 'USD';
        
        // Ponekad transaction_id u ranim fazama mozda nije definisan, ali ako jeste da ga iskoristimo
        const transactionId = data.transaction_id || data.id;

        try {
          await supabase.from('orders').upsert({
             email,
             paddle_order_id: transactionId || `pending_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
             paddle_product_id: paddleProductId,
             amount_total: amountTotal,
             currency,
             status: name === 'checkout.completed' ? 'completed' : (name === 'checkout.payment.failed' ? 'failed' : 'pending'),
             locale: localStorage.getItem('language') || 'en'
          }, { onConflict: 'paddle_order_id' });
        } catch (err) {
          console.error("Error saving pending order to DB", err);
        }
      }
    };

    return () => {
      window.onPaddleEvent = undefined;
    };
  }, []);

  const openCheckout = () => {
    if (typeof window !== 'undefined' && window.Paddle) {
      // Read current language selected by the user
      const lang = (localStorage.getItem('language') ?? 'en') as SupportedLocale;
      const paddleLocale = PADDLE_LOCALE_MAP[lang] ?? 'en';

      const priceId = (import.meta.env.VITE_PADDLE_PRICE_ID as string)?.trim();

      if (!priceId) {
        alert("CRITIČNA GREŠKA: VITE_PADDLE_PRICE_ID ključ nije učitan u ovom okruženju! Proveri da li je env varijabla ubačena i restartuj server.");
        console.error("Missing Paddle Price ID! Checkout aborted.");
        return;
      }

      const checkoutConfig = {
        items: [
          {
            priceId: priceId,
            quantity: 1,
          },
        ],
        // Pass language to Edge Function via webhook customData
        customData: { locale: lang },
        settings: {
          displayMode: 'overlay' as const,
          theme: 'dark' as const,
          locale: paddleLocale,
          successUrl: window.location.origin + "/?success=true",
        },
      };

      console.log('Initiating Paddle checkout with config:', checkoutConfig);
      window.Paddle.Checkout.open(checkoutConfig);
    }
  };

  return { openCheckout };
};
