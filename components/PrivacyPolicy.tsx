import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This privacy policy sets out how we use and protect any information that you give us when you use this website.
      </p>
      <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect the following information:
        <ul className="list-disc ml-8">
          <li>Name and contact information</li>
          <li>Demographic information</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
      </p>
      <h2 className="text-2xl font-bold mb-2">How We Use the Information</h2>
      <p className="mb-4">
        We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
        <ul className="list-disc ml-8">
          <li>Internal record keeping</li>
          <li>Improving our products and services</li>
          <li>Sending promotional emails about new products, special offers or other information which we think you may find interesting</li>
        </ul>
      </p>
      <h2 className="text-2xl font-bold mb-2">Security</h2>
      <p className="mb-4">
        We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
      </p>
    </div>
  );
};
