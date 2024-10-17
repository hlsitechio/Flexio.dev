import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p>Welcome to Flexio.dev. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
        <p>We collect information that you provide directly to us when you use our application, including:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal information (such as name and email address) when you create an account</li>
          <li>Content you create, upload, or store in our application</li>
          <li>Information about your usage of the application</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Communicate with you about our services</li>
          <li>Protect against, investigate, and prevent potentially unlawful or abusive activities</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Sharing of Information</h2>
        <p>We do not share your personal information with third parties except in the following cases:</p>
        <ul className="list-disc list-inside ml-4">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights, privacy, safety, or property</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: privacy@flexio.dev</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;