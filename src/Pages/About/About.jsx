import React from 'react';
import Galaxy from '../../Libraries/Galaxy';

const AboutElvish = () => {
  return (
    <section className="relative h-auto bg-black py-20 px-6 md:px-20 overflow-hidden">
      {/* Galaxy background */}
      <div className="absolute inset-0 z-0">
        <Galaxy />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        {/* Image */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <img
            src="https://thestarsbio.in/wp-content/uploads/2023/08/elvish-yadav-age.webp"
            alt="Elvish Yadav"
            className="w-80 h-100 object-cover bg-top rounded-xl border-4 border-[#D7CCC8] shadow-md"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-[#F5F5F5]">
          <h1 className="text-5xl font-bold text-[#FFE0B2] mb-4">Meet Elvish Yadav</h1>
          <h2 className="text-2xl font-semibold text-[#FFCCBC] mb-8">
            YouTuber • Influencer • Entrepreneur
          </h2>

          {/* Biography Highlights */}
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong className="text-[#FFB74D]">Elvish Yadav</strong> is a popular Indian YouTuber, content creator, and
              founder of <strong>Systumm Clothing</strong>. With over <strong>10 million YouTube subscribers</strong> and
              <strong> 7 million Instagram followers</strong>, he's known for his energetic Haryanvi roasting videos.
            </p>

            <p>
              Born on <strong>14 September 1997</strong> in <strong>Gurgaon, Haryana</strong>, Elvish grew up in a humble family.
              He attended <strong>Amity International School</strong> and earned a <strong>Bachelor of Business</strong> from
              <strong> Hansraj College, Delhi</strong>.
            </p>

            <p>
              He launched his YouTube channel in <strong>2016</strong> and quickly gained traction with relatable college-life
              skits. In <strong>2023</strong>, he made headlines by winning <strong>Bigg Boss OTT 2</strong> as the first wildcard champion.
            </p>

            <p>
              His brand <strong>Systumm Clothing</strong> reflects his personality—bold, real, and unapologetically expressive.
            </p>
          </div>

          {/* Personal Info Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#D7CCC8] text-[#4B2F26] p-6 rounded-xl shadow-inner">
            <div><strong className="text-[#6D4C41]">Full Name:</strong> Elvish Yadav</div>
            <div><strong className="text-[#6D4C41]">Age:</strong> 26 (as of 2023)</div>
            <div><strong className="text-[#6D4C41]">Birthplace:</strong> Gurgaon, Haryana</div>
            <div><strong className="text-[#6D4C41]">Education:</strong> Bachelors in Business</div>
            <div><strong className="text-[#6D4C41]">Father:</strong> Ram Avtar Singh Yadav</div>
            <div><strong className="text-[#6D4C41]">Mother:</strong> Sushma Yadav</div>
            <div><strong className="text-[#6D4C41]">Sister:</strong> Komal Yadav</div>
            <div><strong className="text-[#6D4C41]">Height:</strong> 5'11"</div>
          </div>

          {/* Social Media Stats */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-[#FFE0B2] mb-3">Social Media Presence</h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>Instagram: 7.1 Million Followers</li>
              <li>YouTube: 10 Million Subscribers</li>
              <li>Active with over 1000+ posts on Instagram</li>
            </ul>
          </div>

          {/* Brand Message */}
          <div className="mt-10 bg-[#8D6E63] text-white p-6 rounded-lg shadow-md">
            <p className="text-xl font-medium">
              "From roasting videos to fashion, Elvish Yadav's journey is a blend of grit and creativity.
              <br />
              <span className="text-[#F5F5F5] font-bold">Systumm Clothing</span> is not just a label—it's an attitude."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutElvish;
