import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#F5F5F5] text-[#6D4C41] px-4 md:px-16 py-10">
      <div className="max-w-5xl mx-auto bg-[#D7CCC8] p-6 md:p-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-[#6D4C41]">Privacy Policy</h1>

        {/* Intro */}
        <section className="mb-6">
          <p className="text-[#6D4C41] leading-relaxed">
            Systumm Brands Private Limited ("we/us/our") respect the privacy of our customers and users of our website ("you").
            This privacy policy outlines how we collect, use, share, and protect your personal data.
          </p>
        </section>

        {/* Collection Info */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Information We Collect</h2>
          <p className="text-[#6D4C41] leading-relaxed">
            We collect only necessary information to provide our services. This includes:
          </p>
          <ul className="list-disc pl-6 text-[#6D4C41] mt-2 space-y-1">
            <li>Details required to complete your orders and communicate with you.</li>
            <li>Information you provide when registering or subscribing (name, email, phone, address, etc.).</li>
            <li>Shipping and billing address details.</li>
            <li>Anonymous usage data through cookies to enhance functionality.</li>
          </ul>
        </section>

        {/* Use of Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Use of Personal Information</h2>
          <ul className="list-disc pl-6 text-[#6D4C41] space-y-1">
            <li>To respond to queries, requests, or complaints.</li>
            <li>To process your orders and keep you updated.</li>
            <li>To improve our offerings and analyze trends.</li>
            <li>To notify you of new products or important service updates.</li>
            <li>To fulfill legal obligations or respond to law enforcement.</li>
            <li>For other legitimate business operations.</li>
          </ul>
        </section>

        {/* Data Accuracy */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Your Responsibility</h2>
          <p className="text-[#6D4C41] leading-relaxed">
            You represent that the information you provide is accurate and current, and that you have the right to share it.
          </p>
        </section>

        {/* Closing Note */}
        <section>
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">A Note on Philosophy</h2>
          <p className="text-[#6D4C41] leading-relaxed italic">
            "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not
            know how to pursue pleasure rationally encounter consequences that are extremely painful..."
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
