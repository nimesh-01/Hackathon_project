import React from 'react';
import ScrollVelocity from "../Libraries/ScrollVelocity";

const SpecialSaleSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center bg-black text-white w-full min-h-[80vh] p-4 lg:p-8 gap-8">

      {/* Left Image */}
      <div className="relative w-full max-w-sm lg:max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://systumm.com/cdn/shop/files/sale_banner.png?v=1744104889&width=800"
          alt="Model"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Horizontal marquee instead of rotated */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black/80 py-2">
          <ScrollVelocity
            texts={["  BUY   NOW   ✦  "]}
            velocity={50}
            className="text-white text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Quote Section */}
      <div className="w-full max-w-md flex items-center justify-center px-4 py-6 text-center">
        <p className="text-3xl italic text-gray-300 leading-relaxed">
          “Style is a way to say who you are without having to speak.”
          <br />
          <span className="text-xl not-italic mt-4 block text-gray-400">— Rachel Zoe</span>
        </p>
      </div>
    </section>
  );
};

export default SpecialSaleSection;
