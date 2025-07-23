import React from 'react';

const Pagenotfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6">
      <div className="text-center bg-[#D7CCC8] p-10 rounded-xl shadow-md border border-[#A1887F]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6D4C41] mb-4">Page Not Found</h1>
        <p className="text-[#8D6E63] text-lg">The page you are looking for doesn’t exist.</p>
      </div>
    </div>
  );
};

export default Pagenotfound;
