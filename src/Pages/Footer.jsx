import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#6D4C41] text-[#F5F5F5] px-6 py-14 md:px-20 text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold">SYSTUMM</h2>
          <p className="mt-4 text-md text-[#D7CCC8] leading-relaxed">
              Rehna h to Systumm k niche rehna padega
            <br />
            Not just a brand, it’s an emotion. <br />
            Founded by <span className="text-[#F5F5F5] font-semibold">Elvish Yadav</span>.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-md text-[#D7CCC8]">
            <li className="hover:text-white transition">Men</li>
            <li className="hover:text-white transition">Women</li>
            <li className="hover:text-white transition">Kids</li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-md text-[#D7CCC8]">
            <li className="hover:text-white transition">Contact Us</li>
            <li className="hover:text-white transition">Instagram</li>
            <li className="hover:text-white transition">Youtube</li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <div className="flex bg-[#8D6E63] rounded overflow-hidden mb-5">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 bg-[#8D6E63] text-[#F5F5F5] placeholder-[#F5F5F5] focus:outline-none text-md"
            />
            <button className="h-[40px] px-4 bg-[#A1887F] hover:bg-[#D7CCC8] text-[#6D4C41] transition">
              <img
                className="h-[80%]"
                src="https://cdn1.iconfinder.com/data/icons/uiux-001-solid/32/Next-1024.png"
                alt="arrow"
              />
            </button>
          </div>

          <div className="flex gap-4 text-2xl text-[#D7CCC8]">
            <a href="#" className="hover:text-white transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-youtube"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-[#A1887F] mt-12 pt-6 flex flex-col md:flex-row justify-between text-md text-[#D7CCC8]">
        <p>© {new Date().getFullYear()} SYSTUMM. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
