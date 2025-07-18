import React, { useEffect, useState } from "react";

export default function EyeIntro({ onComplete }) {
  const [animate, setAnimate] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const animateTimer = setTimeout(() => setAnimate(true), 100);

    const revealTimer = setTimeout(() => {
      setReveal(true);
    }, 3000); // Trigger exit animation

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6000); // Let fade-out complete

    return () => {
      clearTimeout(animateTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`relative w-full h-screen bg-black overflow-hidden flex items-center justify-center transition-opacity duration-[3000ms] ease-in-out ${
        reveal ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 🔷 Border Lines */}
      <div
        className={`absolute top-10 left-0 h-1 bg-cyan-400 transition-all duration-[3000ms] 
          ${animate ? "w-full" : "w-0"}`}
      />
      <div
        className={`absolute top-0 right-10 w-1 bg-cyan-400 transition-all duration-[3000ms] 
          ${animate ? "h-full" : "h-0"}`}
      />
      <div
        className={`absolute bottom-10 left-0 h-1 bg-cyan-400 transition-all duration-[3000ms] 
          ${animate ? "w-full" : "w-0"}`}
      />
      <div
        className={`absolute top-0 left-10 w-1 bg-cyan-400 transition-all duration-[3000ms] 
          ${animate ? "h-full" : "h-0"}`}
      />

      {/* 👁️ Center Content */}
      <div className="w-full flex items-center justify-evenly px-10">
        {/* Left side: Logo + Text */}
        <div
          className={`flex flex-col items-start gap-4 transition-all duration-[2000ms] ease-in-out
            ${animate ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-0"}
          `}
        >
          <img
            src="./src/assets/Logo/Systumm_logo.avif"
            alt="Left Logo"
            className="h-24 object-contain"
          />
          <p className="text-4xl text-white">Clothing Brand</p>
        </div>

        {/* Right side: Eye Image */}
        <div
          className={`transition-all duration-[2000ms] ease-in-out 
            ${animate ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-0"}
          `}
        >
          <img
            src="./src/assets/Logo/logos-removebg-preview.png"
            alt="eye"
            className="h-[50%] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
