import React, { useState, useEffect } from "react";
import EyeIntro from "./EyeIntro";
// import EyeEffect from "./EyeEffect";

const Home = () => {

  return (
    <>
      {/* <EyeEffect /> */}
      <div className="bg-transparent text-black font-sans">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Layer Up For Success <br /> With Every Meeting
            </h1>
            <div className="flex gap-4">
              <button className="bg-black text-white py-2 px-6 rounded-full">
                Shop Now
              </button>
              <button className="border border-black py-2 px-6 rounded-full">
                Discover More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-end">
            <div className="bg-black w-64 h-96" />
          </div>
        </section>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 py-6">
          {['New Arrivals', 'Suit Jackets', 'Co-ords', 'Loungewear', 'Athleisure'].map((item) => (
            <button
              key={item}
              className="border border-gray-400 px-4 py-2 rounded-full hover:bg-black hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Trends */}
        <section className="text-center py-8">
          <h2 className="text-3xl font-semibold">Timeless & Classic Trends</h2>
          <div className="flex justify-center gap-4 mt-6">
            {['Casual Wear', 'Loungewear', 'Athletic Wear'].map((cat) => (
              <button key={cat} className="text-gray-500 hover:text-black transition">
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-black w-full h-64 rounded" />
            ))}
          </div>
        </section>

        {/* Offer Countdown */}
        <section className="bg-gray-100 py-8 flex flex-col md:flex-row justify-between items-center px-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Act Fast! Incredible Offers Expire Soon</h3>
            <div className="flex space-x-2 text-lg font-mono">
              <span>210</span>:<span>03</span>:<span>43</span>:<span>43</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-black w-64 h-64" />
        </section>

        {/* Crafted Collections */}
        <section className="bg-black text-white py-8">
          <h3 className="text-center text-xl font-semibold mb-4">Crafted For The Modern Man</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
            {['Dream Fashion', 'Winter Fashion'].map((label) => (
              <div key={label} className="relative">
                <div className="bg-white w-full h-64 opacity-10" />
                <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Collections */}
        <section className="py-8">
          <h3 className="text-center text-2xl font-semibold mb-6">Browse Our Collections</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-black w-full h-64 rounded" />
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-100 py-8 px-6 text-center">
          <h4 className="text-xl font-semibold mb-2">Join Our Newsletter For Access To Exclusive Discounts Today</h4>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded w-full md:w-96"
            />
            <button className="bg-black text-white px-6 py-2 rounded">Subscribe</button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-8 px-6 text-center">
          <h4 className="text-2xl font-semibold mb-4">What Customers Say</h4>
          <blockquote className="text-lg italic">“Comfy Jackets For Every Occasion!”</blockquote>
          <p className="mt-2 text-gray-500">- Customer Name</p>
        </section>

        {/* Instagram */}
        <section className="bg-gray-100 py-8 text-center">
          <h5 className="text-xl font-semibold mb-6">Join Us On Instagram</h5>
          <div className="grid grid-cols-3 gap-4 px-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-black w-full h-40 rounded" />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h6 className="text-lg font-bold mb-4 md:mb-0">Kushi.</h6>
            <div className="flex flex-wrap gap-4 text-sm">
              {['HOME', 'ABOUT', 'SHOP', 'LOOKBOOK', 'BLOG', 'CONTACT'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="flex gap-2 text-sm mt-4 md:mt-0">
              <span>FB</span>
              <span>IG</span>
              <span>X</span>
              <span>YT</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}


export default Home;
