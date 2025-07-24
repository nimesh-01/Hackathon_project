import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-[#F5F5F5] text-[#6D4C41] px-4 md:px-16 py-10">
      <div className="max-w-5xl mx-auto bg-[#D7CCC8] p-6 md:p-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-[#6D4C41]">Terms & Conditions</h1>

        {/* Section: Overview */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Overview</h2>
          <p className="text-[#6D4C41] leading-relaxed">
            By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound
            by the following terms and conditions ("Terms of Service", "Terms")...
          </p>
        </section>

        {/* Section: Online Store Terms */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Online Store Terms</h2>
          <p className="text-[#6D4C41] leading-relaxed">
            By agreeing to these Terms of Service, you represent that you are at least the age of majority in your
            state...
          </p>
        </section>

        {/* Section: Prohibited Uses */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Prohibited Uses</h2>
          <ul className="list-disc pl-6 text-[#6D4C41] space-y-1">
            <li>Belongs to another person and to which the user does not have any right;</li>
            <li>Is defamatory, obscene, pornographic, or invasive of another’s privacy;</li>
            <li>Threatens the unity, integrity, or sovereignty of India;</li>
            <li>Contains software viruses or any code meant to destroy functionality;</li>
            <li>Violates any law currently in force.</li>
          </ul>
        </section>

        {/* Section: Changes to Terms */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">Changes to Terms of Service</h2>
          <p className="text-[#6D4C41] leading-relaxed">
            We reserve the right, at our sole discretion, to update or change any part of these Terms by posting updates
            to our website...
          </p>
        </section>

        {/* Optional Philosophy Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#8D6E63] mb-2">A Note on Philosophy</h2>
          <p className="text-[#6D4C41] leading-relaxed italic">
            "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not
            know how to pursue pleasure rationally encounter consequences..."
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
