import React from 'react';
import SplitText from "../Libraries/SplitText";
import BlurText from "../Libraries/BlurText";

const Pagenotfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6">
      <div className="text-center bg-[#D7CCC8] p-10 rounded-xl shadow-md border border-[#A1887F]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6D4C41] mb-4">
          <SplitText
            text=" Page Not Found"
            className="text-5xl font-bold text-center"
            delay={100}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />
        </h1>
        <p className="text-[#8D6E63] text-lg">
          <BlurText
            text="The page you are looking for doesn’t exist"
            animateBy="words"
            className="text-3xl md:text-5xl font-bold"
            direction="top"
            delay={300}
            stepDuration={0.5}
          />
        </p>
      </div>
    </div>
  );
};

export default Pagenotfound;
