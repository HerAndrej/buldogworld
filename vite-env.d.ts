/// <reference types="vite/client" />

interface Window {
  Paddle: {
    Environment: { set: (env: 'sandbox' | 'production') => void };
    Initialize: (opts: { token: string }) => void;
    Checkout: {
      open: (opts: object) => void;
    };
  };
}
