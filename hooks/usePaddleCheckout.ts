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

      const checkoutConfig = {
        items: [
          {
            priceId: import.meta.env.VITE_PADDLE_PRICE_ID as string,
            quantity: 1,
          },
        ],
        // Pass language to Edge Function via webhook customData
        customData: { locale: lang },
        settings: {
          displayMode: 'overlay' as const,
          theme: 'dark' as const,
          locale: paddleLocale,
        },
      };

      console.log('Initiating Paddle checkout with config:', checkoutConfig);
      window.Paddle.Checkout.open(checkoutConfig);
    }
  };

  return { openCheckout };
};
