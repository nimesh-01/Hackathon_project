// ImageSlider.jsx
import React, { useState, useEffect } from "react";

const images = [
  "./src/assets/Logo/Front1.webp",
  "./src/assets/Logo/Front2.webp",
  "./src/assets/Logo/Front3.webp"
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // every 3 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="w-full h-[80vh] overflow-hidden relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-screen object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
