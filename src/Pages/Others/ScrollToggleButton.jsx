import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollToggleButton = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < window.innerHeight / 3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isHome && isAtTop) {
      // Scroll down to target only if on home page
      const target = document.getElementById('scroll-target');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } else {
      // Scroll up
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // On non-home pages, only show button if not at top
  if (!isHome && isAtTop) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#6D4C41] hover:bg-[#4E342E] text-white p-3 rounded-full shadow-lg transition-transform duration-300"
      title={isHome && isAtTop ? 'Scroll Down' : 'Scroll Up'}
    >
      {isHome && isAtTop ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
    </button>
  );
};

export default ScrollToggleButton;
