import React, { useEffect, useState } from "react";
import CircleTransition from "../../components/CircleTransition";

export default function EyeIntro({ onComplete }) {
  const [animate, setAnimate] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [circleVisible, setCircleVisible] = useState(false);

  // Get screen center as origin
  const origin = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  useEffect(() => {
    const animateTimer = setTimeout(() => setAnimate(true), 100);

    const revealTimer = setTimeout(() => {
      setReveal(true);       // Start fade out
      setCircleVisible(true); // Trigger CircleTransition
    }, 3000);

    return () => {
      clearTimeout(animateTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  const handleCircleComplete = () => {
    setCircleVisible(false);
    if (onComplete) onComplete(); // Only after circle is done
  };

  return (
    <>
      <div
        className={`relative w-full h-screen bg-black overflow-hidden flex items-center justify-center transition-opacity duration-[1500ms] ease-in-out 
          ${reveal ? "opacity-0" : "opacity-100"}`}
      >
        {/* 🔷 Border Lines */}
        <div
          className={`absolute top-10 left-0 h-1 bg-[#6D4C41] transition-all duration-[3000ms] 
            ${animate ? "w-full" : "w-0"}`}
        />
        <div
          className={`absolute top-0 right-10 w-1 bg-[#6D4C41] transition-all duration-[3000ms] 
            ${animate ? "h-full" : "h-0"}`}
        />
        <div
          className={`absolute bottom-10 left-0 h-1 bg-[#6D4C41] transition-all duration-[3000ms] 
            ${animate ? "w-full" : "w-0"}`}
        />
        <div
          className={`absolute top-0 left-10 w-1 bg-[#6D4C41] transition-all duration-[3000ms] 
            ${animate ? "h-full" : "h-0"}`}
        />

        {/* 👁️ Center Content */}
        <div className="w-full flex items-center justify-evenly px-10">
          {/* Left: Logo + Text */}
          <div
            className={`flex flex-col items-start gap-4 transition-all duration-[2000ms] ease-in-out
              ${animate ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-0"}`}
          >
            <img
              src="./assets/Logo/Systumm_logo.avif"
              alt="Left Logo"
              className="h-24 object-contain"
            />
            <p className="text-4xl text-white">Clothing Brand</p>
          </div>

          {/* Right: Eye */}
          <div
            className={`transition-all duration-[2000ms] ease-in-out 
              ${animate ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-0"}`}
          >
            <img
              src="./assets/Logo/logos-removebg-preview.png"
              alt="eye"
              className="h-[50%] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Circle Transition starts as EyeIntro fades */}
      <CircleTransition
        isVisible={circleVisible}
        onComplete={handleCircleComplete}
        origin={origin}
          duration={1.2}
      />
    </>
  );
}
