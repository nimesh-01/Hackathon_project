import React from "react";
import ImageSlider from "./ImageSlider";
import CurvedLoop from '../Libraries/CurvedLoop';
import SplitText from '../Libraries/SplitText'
import ScrollVelocity from '../Libraries/ScrollVelocity';
import InfoGrid from "./InfoGrid";
import BlurText from '../Libraries/BlurText';
import SpecialSaleSection from "./SpecialSaleSection";
import Footer from './Footer'
import ScrollFloat from "../Libraries/ScrollFloat";
import Login from "./Login";
import Register from "./Register";
import { NavLink } from "react-router-dom";
export default function FashionHome({ showLogin, setShowLogin, showRegister, setShowRegister }) {
  function renderedItem() {
    let data = JSON.parse(localStorage.getItem("products")).slice(0, 6)
    console.log(data);
    return data
  }
  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };
  return (
    <>

      <div className="font-sans text-[#6D4C41] bg-[#F5F5F5]">
        {/* Hero Section */}

        <section className="relative w-full overflow-hidden">
          <ImageSlider />

          {/* Overlay Text and Button */}
          <div className="hidden md:absolute md:inset-0 md:flex md:items-end md:justify-center">

            <div className="bg-[#6D4C41]/70 p-6 mb-5 rounded-xl text-center text-white max-w-xl w-[90%]">
              <h1>
                <SplitText
                  text="SPRING / SUMMER 2025"
                  className="text-4xl font-bold text-center"
                  delay={100}
                  duration={0.3}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
              </h1>
              <CurvedLoop
                marqueeText="The ✦ SS25 ✦ Ready-to-Wear ✦ fashion ✦ show ✦ savings ✦ are ✦ now ✦ live ✦"
                speed={5}
                curveAmount={450}
                direction="right"
                interactive={true}
                className="custom-text-style"
              />
              <div className="space-x-4 mt-4">
               <NavLink
  to="/products"
  className="inline-block bg-[#F5F5F5] text-[#6D4C41] px-6 py-2 rounded hover:bg-[#D7CCC8] transition font-semibold"
>
  SHOP NOW
</NavLink>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="px-4 md:px-16 py-10 bg-[#D7CCC8]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold"> <SplitText
              text="NEW ARRIVALS"
              className="text-3xl font-bold text-center"
              delay={100}
              duration={0.3}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            /></h2>
            <NavLink
              to="/products"
              className="inline-block px-4 py-2 bg-[#6D4C41] text-white text-sm rounded hover:bg-[#8D6E63] transition"
            >
              See All
            </NavLink>
          </div>
          <p className="text-xl text-[#6D4C41] mb-6">
            Discover the latest drops in ready-to-wear, shoes and accessories.
          </p>

          <div
            id="Scroll"
            className="flex overflow-x-auto space-x-4 pb-2 rounded-lg scrollbar-hide"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE & Edge
            }}
          >
            {renderedItem().map((item, idx) => (
              <div
                key={idx}
                className="min-w-[200px] h-[500px] md:min-w-[240px] lg:min-w-[280px] flex-shrink-0 border rounded-lg overflow-hidden bg-[#F5F5F5] shadow-md"
              >
                {/* Fixed Aspect Ratio Container */}
                <div className="aspect-[3/4] h-[80%] bg-[#A1887F] overflow-hidden">
                  <div
                    className="flex overflow-x-auto scrollbar-hide h-full w-full space-x-2 snap-x snap-mandatory scroll-smooth"
                    style={{
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none", // IE & Edge
                    }}
                  >
                    {item.image.map((imgUrl, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={imgUrl}
                        alt=""
                        className="h-full w-full object-cover flex-shrink-0 rounded snap-center transition-all duration-500 ease-in-out"
                        style={{ minWidth: "100%" }}
                      />
                    ))}
                  </div>
                </div>



                {/* Card Content */}
                <div className="p-3">
                  <p className="text-sm font-semibold text-[#6D4C41]">{item.title}</p>
                  <p className="text-xs text-[#8D6E63]">{item.price}</p>
                  <p className="text-xs text-yellow-700">★★★★★</p>
                </div>
              </div>
            ))}
          </div>


        </section>

        {/* Promo Banners */}
        <section className="px-4 md:px-16 py-12 bg-[#A1887F]">
          <div className="text-center text-2xl font-extrabold text-white mb-8">
            <ScrollVelocity
              texts={["FEEL AUTHENTIC ✦", "FEEL TRENDY ✦"]}
              velocity={50}
              className="text-[#F5F5F5]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "MENS WEAR",
                url: "./src/assets/Banner/mens.webp",
                route: "/products/Mens-wear"
              },
              {
                title: "WOMENS WEAR",
                url: "./src/assets/Banner/womens.jpg",
                route: "/products/womens-wear"
              },
              {
                title: "KIDS WEAR",
                url: "./src/assets/Banner/kids.jpg",
                route: "/products/Kids-wear"
              }
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.route}
                className="relative h-120 overflow-hidden rounded-lg group block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.url})` }}
                />
                <div className="absolute bottom-0 p-4 bg-[#6D4C41]/70 w-full text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        {/* Footer Banner */}
        <section
          className="relative h-[60vh] bg-cover bg-center flex items-end justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585914924626-15adac1e6402?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
          <div className="bg-[#6D4C41]/70 w-full text-center py-6 text-white text-lg font-semibold">

            <BlurText
              text="Spring Summer 2025 Collection Launching Now"
              animateBy="words"
              className="text-3xl md:text-5xl font-bold text-[#fff]"
              direction="top"
              delay={300}
              stepDuration={2}
            />

          </div>
        </section>
      </div>
      <SpecialSaleSection />
      <InfoGrid />
      <Footer />
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="absolute inset-0" onClick={closeModal}></div>
          <div className="relative z-50 max-h-[90vh] max-w-[90vw] overflow-y-auto">
            {showLogin && (
              <Login
                onClose={closeModal}
                switchToRegister={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
              />
            )}
            {showRegister && (
              <Register
                onClose={closeModal}
                switchToLogin={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
