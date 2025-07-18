import React from "react";
import ImageSlider from "./ImageSlider";
import CurvedLoop from '../Libraries/CurvedLoop';
export default function FashionHome() {
  return (
        <>    
      <div className="font-sans text-[#111]">
      {/* Hero Section */}
     <section className="relative h-[80vh] w-full overflow-hidden">
  {/* Image Slider Behind */}
  <ImageSlider />

  {/* Text Overlay on Top */}
  <div className="absolute inset-0 flex items-end justify-center">
    <div className="bg-black/50 p-6 mb-5 rounded-xl text-center text-white max-w-xl">
      <h1 className="text-4xl md:text-5xl font-bold">SPRING / SUMMER 2025</h1>
      <CurvedLoop 
  marqueeText="The ✦ SS25 ✦ Ready-to-Wear ✦ fashion ✦ show ✦ savings ✦ are ✦ now ✦ lives ✦"
  speed={5}
  curveAmount={400}
  direction="right"
  interactive={true}
  className="custom-text-style"
/>
      <div className="space-x-4">
        <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
          SHOP NOW
        </button>
      </div>
    </div>
  </div>
</section>


      {/* New Arrivals */}
      <section className="px-4 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-4">NEW ARRIVALS</h2>
        <p className="text-sm text-gray-500 mb-6">Discover the latest drops in ready-to-wear, shoes and accessories.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              <div className="aspect-[3/4] bg-gray-200"></div>
              <div className="p-2">
                <p className="text-sm font-semibold">ITEM NAME - COLOR</p>
                <p className="text-xs text-gray-500">$199.99</p>
                <p className="text-xs text-yellow-500">★★★★★</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section className="px-4 md:px-16 py-12 bg-[#f7f7f7]">
        <div className="text-center text-2xl font-extrabold mb-8">
          <span className="mr-4">* FEEL AUTHENTIC *</span>
          <span className="text-gray-400">FEEL TRENDY</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593032465170-ae3b8b7ee3a4')" }}>
            <div className="absolute bottom-0 p-4 bg-black/50 w-full text-white">
              <h3 className="text-lg font-semibold mb-1">BUY NOW OR CRY LATER</h3>
              <button className="bg-white text-black px-4 py-2 rounded">EXPLORE</button>
            </div>
          </div>
          <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620912189864-2da88828d1e9')" }}>
            <div className="absolute bottom-0 p-4 bg-black/50 w-full text-white">
              <h3 className="text-lg font-semibold mb-1">BE FREE. BE BEAUTIFUL.</h3>
              <button className="bg-white text-black px-4 py-2 rounded">EXPLORE</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="relative h-[60vh] bg-cover bg-center flex items-end justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1608662484761-2e2e9f1279d0')" }}>
        <div className="bg-black/50 w-full text-center py-6 text-white text-lg font-semibold">
          READY TO WEAR · COUTURE · SUMMER EDIT · ICONIC
        </div>
      </section>
    </div>
    </>

  );
}
