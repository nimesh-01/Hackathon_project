import React from 'react';
import ScrollVelocity from "../../Libraries/ScrollVelocity";
import ProfileCard from '../../Libraries/ProfileCard/ProfileCard'
import ScrollFloat from '../../Libraries/ScrollFloat';
const SpecialSaleSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center bg-black text-white w-full min-h-[70vh] p-4 lg:p-8 gap-8">

      {/* Left Image */}
      <ProfileCard
        avatarUrl="https://systumm.com/cdn/shop/files/sale_banner.png?v=1744104889&width=800"

      />

      {/* Quote Section */}
      <div className="w-full max-w-md flex items-center justify-center px-4 py-6 text-center">
        <p className="text-3xl italic text-gray-300 leading-relaxed">
          <ScrollFloat
            animationDuration={5}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
            “Style is a way to say who you are without having to speak.”
          </ScrollFloat>
          <br />
          <span className="text-xl not-italic my-0 block text-gray-400">
            <ScrollFloat
            animationDuration={5}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
          — Rachel Zoe
          </ScrollFloat>
          </span>
        </p>
      </div>
    </section>
  );
};

export default SpecialSaleSection;
