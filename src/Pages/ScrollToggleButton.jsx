import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react'; // or use any icon

const ScrollToggleButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < window.innerHeight / 3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtTop) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#6D4C41] hover:bg-[#4E342E] text-white p-3 rounded-full shadow-lg transition-transform duration-300"
      title={isAtTop ? 'Scroll Down' : 'Scroll Up'}
    >
      {isAtTop ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
    </button>
  );
};

export default ScrollToggleButton;
