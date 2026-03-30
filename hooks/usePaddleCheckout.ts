// Supported language codes for the ebook
type SupportedLocale = 'en' | 'sr' | 'de' | 'ru';

const PADDLE_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: 'en',
  sr: 'en', // Paddle doesn't support sr, fallback to English UI
  de: 'de',
  ru: 'en', // Paddle doesn't support ru, fallback to English UI
};

export const usePaddleCheckout = () => {
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
          successUrl: window.location.origin + "/success",
        },
      };

      console.log('Initiating Paddle checkout with config:', checkoutConfig);
      window.Paddle.Checkout.open(checkoutConfig);
    }
  };

  return { openCheckout };
};
