import { useEffect } from 'react';

type SupportedLocale = 'en' | 'sr' | 'de' | 'ru';

declare global {
  interface Window {
    onPaddleEvent?: (event: any) => void;
  }
}

const PADDLE_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: 'en',
  sr: 'en',
  de: 'de',
  ru: 'en',
};

export const usePaddleCheckout = () => {
  useEffect(() => {
    window.onPaddleEvent = (event: any) => {
      if (!event || !event.name || !event.data) return;

      const { name, data } = event;

      if (
        name === 'checkout.customer.created' ||
        name === 'checkout.customer.updated' ||
        name === 'checkout.completed'
      ) {
        const email =
          data.customer?.email ||
          data.payment?.customer?.email ||
          data.checkout?.customer?.email ||
          '';

        if (email) {
          localStorage.setItem('lastPaddleEmail', email);
        }

        if (name === 'checkout.completed') {
          const txnId = data.transaction_id || data.id || '';
          if (txnId) {
            localStorage.setItem('paddleTransactionId', txnId);
          }
        }
      }
    };

    return () => {
      window.onPaddleEvent = undefined;
    };
  }, []);

  const openCheckout = () => {
    if (typeof window !== 'undefined' && window.Paddle) {
      const lang = (localStorage.getItem('language') ?? 'en') as SupportedLocale;
      const paddleLocale = PADDLE_LOCALE_MAP[lang] ?? 'en';
      const priceId = (import.meta.env.VITE_PADDLE_PRICE_ID as string)?.trim();

      if (!priceId) {
        alert('Greška: VITE_PADDLE_PRICE_ID nije podešen. Restartuj dev server.');
        return;
      }

      const sessionToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('paddleSession', sessionToken);

      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customData: { locale: lang },
        settings: {
          displayMode: 'overlay' as const,
          theme: 'light' as const,
          locale: paddleLocale,
          successUrl:
            window.location.origin + '/?success=true&session=' + sessionToken,
        },
      });
    }
  };

  return { openCheckout };
};
