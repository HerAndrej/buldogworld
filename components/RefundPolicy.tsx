import React from 'react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      <p className="mb-4">
        We offer a 30-day money-back guarantee on all of our products. If you are not satisfied with your purchase, you can request a full refund within 30 days of the purchase date.
      </p>
      <h2 className="text-2xl font-bold mb-2">How to Request a Refund</h2>
      <p className="mb-4">
        To request a refund, please contact us at our email address with your order number and a brief explanation of why you are requesting a refund.
      </p>
      <h2 className="text-2xl font-bold mb-2">Processing Time</h2>
      <p className="mb-4">
        Refunds are processed within 5-7 business days. You will receive an email notification once your refund has been processed.
      </p>
    </div>
  );
};
