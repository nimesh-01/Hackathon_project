import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asynclogoutuser } from '../Store/action/Useraction';
import CircleTransition from './CircleTransition';
import './NavbarResponsive.css';

const Nav = ({ openLogin }) => {
    const dispatch = useDispatch();
    const reduxUser = useSelector((state) => state.userreducer.users);
    const user = reduxUser || JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.isadmin === true;
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [transitionActive, setTransitionActive] = useState(false);
    const [transitionTarget, setTransitionTarget] = useState('/');
    const [origin, setOrigin] = useState({ x: '50%', y: '50%' });

    const lastScrollY = useRef(window.scrollY);
    const menuRef = useRef();
    const currentPath = location.pathname;

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            if (currentPath !== '/products') {
                navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
            } else {
                const event = new CustomEvent('search-products', {
                    detail: searchTerm.trim(),
                });
                window.dispatchEvent(event);
            }
            setSearchTerm('');
            setMenuOpen(false);
        }
    };

    const triggerTransition = (e, targetPath, callback) => {
        const rect = e.target.getBoundingClientRect();
        setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setTransitionTarget(targetPath);
        setTransitionActive(true);
        if (callback) callback(); // For logout or closing menu
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (Math.abs(currentScroll - lastScrollY.current) < 5) return;
            setShowHeader(currentScroll < lastScrollY.current || currentScroll < 80);
            lastScrollY.current = currentScroll;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!user && ["/cart", "/user-profile", "/admin/create-product"].includes(currentPath)) {
            navigate("/");
        }
    }, [user, currentPath, navigate]);

    return (
        <>
            <header
                className={`w-full px-6 py-3 md:py-0 sticky top-0 z-50 bg-[#F5F5F5] transition-transform duration-300 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ boxShadow: '0 4px 10px rgba(109, 76, 65, 0.5)' }}
            >
                <div className="w-full flex justify-between items-center gap-4 lg:justify-around">
                    <div className="text-[#6D4C41] text-4xl font-bold tracking-wide whitespace-nowrap logo">
                        SYS<span className="text-[#8D6E63]">TUMM</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#D7CCC8]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            onKeyDown={handleKeyDown}
                            className="px-2 py-1 text-sm bg-transparent text-[#6D4C41] outline-none w-[8rem] md:w-[10rem] lg:w-[16rem]"
                        />
                        <button
                            onClick={handleSearch}
                            className="text-xs font-semibold text-white bg-[#6D4C41] hover:bg-[#4E342E] px-3 py-1 rounded-xl"
                        >
                            Search
                        </button>
                    </div>

                     <div className="hidden lg:flex px-3 py-2 my-3 mr-1 rounded-full items-center gap-5 custom-shadow desktop-nav" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
                        {currentPath !== "/About" && (
                            <button onClick={(e) => triggerTransition(e, "/About")} className="text-[#6D4C41] text-sm font-semibold hover:text-[#8D6E63]">
                                About
                            </button>
                        )}
                        {currentPath !== "/" && (
                            <button onClick={(e) => triggerTransition(e, "/")} className="text-[#6D4C41] text-sm font-semibold hover:text-[#8D6E63]">
                                Home
                            </button>
                        )}
                        {currentPath !== "/products" && (
                            <button onClick={(e) => triggerTransition(e, "/products")} className="text-[#6D4C41] text-sm font-semibold hover:text-[#8D6E63]">
                                Products
                            </button>
                        )}
                        {isAdmin && currentPath !== "/admin/create-product" && (
                            <button onClick={(e) => triggerTransition(e, "/admin/create-product")} className="text-[#6D4C41] text-sm font-semibold hover:text-[#8D6E63]">
                                Add Product
                            </button>
                        )}
                        {user && currentPath !== "/user-profile" && (
                            <button onClick={(e) => triggerTransition(e, "/user-profile")} className="hover:scale-105 transition">
                                <img className="w-8 h-8 rounded-full border-2 border-[#D7CCC8]" src="https://tse4.mm.bing.net/th?id=OIP.tgmmCh4SA36j0dMT0ay9_AHaHa&pid=Api&P=0&h=220" alt="User" />
                            </button>
                        )}
                        {user && currentPath !== "/cart" && (
                            <button onClick={(e) => triggerTransition(e, "/cart")} className="hover:scale-110 transition">
                                <img className="w-6 h-6" src="https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/shopping-cart-1024.png" alt="Cart" />
                            </button>
                        )}
                        {!user ? (
                            <button onClick={openLogin} className="text-[#6D4C41] text-xs font-semibold px-3 py-1 bg-[#D7CCC8] hover:bg-[#A1887F] rounded-full">
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={(e) => triggerTransition(e, "/", () => dispatch(asynclogoutuser()))}
                                className="text-[#6D4C41] text-xs font-semibold px-3 py-1 bg-[#D7CCC8] hover:bg-[#A1887F] rounded-full"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    <div className="lg:hidden flex items-center">
                        <img
                            src="./assets/Icons/hambergurg.png"
                            alt="Menu"
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => setMenuOpen(prev => !prev)}
                        />
                    </div>
                </div>

                {/* Mobile Dropdown */}
              <div
  ref={menuRef}
  className={`lg:hidden absolute right-6 mt-4 p-4 bg-white text-[#4E342E] rounded-xl shadow-lg transition-all duration-300 ease-in-out z-50 w-1/2 max-w-[90vw] ${menuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
>
  <div className="block sm:hidden mb-4">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      onKeyDown={handleKeyDown}
      className="w-full mb-2 px-3 py-1 border border-[#D7CCC8] rounded text-sm"
    />
    <button
      onClick={handleSearch}
      className="w-full py-1 text-sm font-semibold bg-[#6D4C41] text-white rounded hover:bg-[#4E342E]"
    >
      Search
    </button>
  </div>

  {currentPath !== "/" && (
    <button onClick={(e) => triggerTransition(e, "/", () => setMenuOpen(false))} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Home
    </button>
  )}
  {currentPath !== "/products" && (
    <button onClick={(e) => triggerTransition(e, "/products", () => setMenuOpen(false))} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Products
    </button>
  )}
  {isAdmin && currentPath !== "/admin/create-product" && (
    <button onClick={(e) => triggerTransition(e, "/admin/create-product", () => setMenuOpen(false))} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Add Product
    </button>
  )}
  {user && currentPath !== "/user-profile" && (
    <button onClick={(e) => triggerTransition(e, "/user-profile", () => setMenuOpen(false))} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Profile
    </button>
  )}
  {user && currentPath !== "/cart" && (
    <button onClick={(e) => triggerTransition(e, "/cart", () => setMenuOpen(false))} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Cart
    </button>
  )}

  {!user ? (
    <button onClick={() => { openLogin(); setMenuOpen(false); }} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Login
    </button>
  ) : (
    <button onClick={(e) => triggerTransition(e, "/", () => { dispatch(asynclogoutuser()); setMenuOpen(false); })} className="block w-full text-left py-2 px-3 hover:bg-[#6D4C41] hover:text-white rounded-md">
      Logout
    </button>
  )}
</div>

            </header >

            <CircleTransition
                isVisible={transitionActive}
                onComplete={() => {
                    setTransitionActive(false);
                    navigate(transitionTarget);
                }}
                origin={origin}
            />
        </>
    );
};

export default Nav;
