import React, { useState, useEffect, useRef } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asynclogoutuser } from '../Store/action/Useraction';
import { useNavigate } from 'react-router-dom';
const Nav = ({ openLogin }) => {
    const dispatch = useDispatch();
    const reduxUser = useSelector((state) => state.userreducer.users);
    const user = reduxUser || JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.isadmin === true;
    const navigate = useNavigate();

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            console.log("Searching for:", searchTerm);
        }
    };

    useEffect(() => {
    const handleScroll = () => {
        const currentScroll = window.scrollY;

        // Only show header if the user scrolls *up* (not equal)
        if (currentScroll < lastScrollY.current) {
            setShowHeader(true);
        } else if (currentScroll > lastScrollY.current) {
            setShowHeader(false);
        }

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
    const currentPath = location.pathname;
    useEffect(() => {
        if (!user && (currentPath === "/cart" || currentPath === "/user-profile" || currentPath==='/admin/create-product')) {
            navigate("/"); // Redirect to home when user logs out from cart/profile
        }
    }, [user, currentPath, navigate]);

    return (
        <header
            className={`w-full px-6 py-3 sticky top-0 z-50 bg-[#F5F5F5] transition-transform duration-300 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'
                }`}
            style={{ boxShadow: '0 4px 10px rgba(109, 76, 65, 0.5)' }}
        >
            <div className="flex items-center justify-between lg:justify-around">
                <div className="text-[#6D4C41] text-4xl font-bold tracking-wide">
                    SYS<span className="text-[#8D6E63]">TUMM</span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="mobile-search-bar flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#D7CCC8]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="px-2 py-1 text-sm bg-transparent text-[#6D4C41] outline-none w-28 md:w-48 lg:w-64"
                        />
                        <button
                            onClick={handleSearch}
                            className="text-xs font-semibold text-white bg-[#6D4C41] hover:bg-[#4E342E] px-3 py-1 rounded-xl"
                        >
                            Search
                        </button>
                    </div>

                    <img
                        src="./src/assets/Icons/hambergurg.png"
                        alt="Menu"
                        className="w-8 h-8 cursor-pointer block md:hidden"
                        onClick={() => setMenuOpen(prev => !prev)}
                    />
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex px-5 py-2 rounded-3xl items-center gap-10 shadow-lg"
                    style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)' }}>
                    {currentPath !== "/" && (
                        <NavLink to="/" className="text-[#6D4C41] text-lg font-semibold hover:text-[#8D6E63] transition">Home</NavLink>
                    )}
                    {currentPath !== "/products" && (
                        <NavLink to="/products" className="text-[#6D4C41] text-lg font-semibold hover:text-[#8D6E63] transition">Products</NavLink>
                    )}
                    {isAdmin && (
                        <NavLink to="/admin/create-product" className="text-[#6D4C41] text-lg font-semibold hover:text-[#8D6E63] transition">Add Product</NavLink>
                    )}
                    {user && currentPath !== "/user-profile" && (
                        <NavLink to="/user-profile" className="hover:scale-105 transition duration-300">
                            <img
                                className="w-8 h-8 rounded-full border-2 border-[#D7CCC8]"
                                src="https://tse4.mm.bing.net/th?id=OIP.tgmmCh4SA36j0dMT0ay9_AHaHa&pid=Api&P=0&h=220"
                                alt="User"
                            />
                        </NavLink>
                    )}
                    {currentPath !== "/cart" && (
                        <NavLink to="/cart" className="hover:scale-110 transition duration-300">
                            <img className="w-6 h-6" src="./src/assets/Icons/Cart.png" alt="Cart" />
                        </NavLink>
                    )}
                    {!user && (
                        <button
                            onClick={openLogin}
                            className="text-[#6D4C41] text-xs font-semibold px-3 py-1 bg-[#D7CCC8] hover:bg-[#A1887F] rounded-full transition duration-300 active:scale-95"
                        >
                            Login
                        </button>
                    )}
                    {user && (
                        <button onClick={() => dispatch(asynclogoutuser())} className="text-[#6D4C41] text-xs font-semibold px-3 py-1 bg-[#D7CCC8] hover:bg-[#A1887F] rounded-full transition duration-300 active:scale-95">
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`md:hidden absolute right-6 mt-4 p-4 bg-white text-[#4E342E] rounded-xl shadow-lg transition-all duration-300 ease-in-out z-50 w-1/2 max-w-[90vw] small:w-[70%] ${menuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
            >
                <div className="dropdown-search-bar mb-3 hidden small:block">
                    <div className="flex items-center gap-2 border border-[#D7CCC8] px-3 py-1 rounded-full w-full overflow-hidden">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 text-sm bg-transparent outline-none text-[#6D4C41]"
                        />
                        <button onClick={handleSearch} className="text-xs font-semibold text-[#4E342E] hover:text-[#6D4C41]">
                            Go
                        </button>
                    </div>
                </div>

                {currentPath !== "/" && (
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all">
                        Home
                    </NavLink>
                )}
                {currentPath !== "/products" && (
                    <NavLink to="/products" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all">
                        Products
                    </NavLink>
                )}
                {isAdmin && (
                    <NavLink to="/admin/create-product" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all">
                        Add Product
                    </NavLink>
                )}
                {user && currentPath !== "/user-profile" && (
                    <NavLink to="/user-profile" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all">
                        Profile
                    </NavLink>
                )}
                {currentPath !== "/cart" && (
                    <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all">
                        Cart
                    </NavLink>
                )}
                {!user && (
                    <button
                        onClick={() => {
                            openLogin();
                            setMenuOpen(false);
                        }}
                        className="block py-2 w-full text-left px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all"
                    >
                        Login
                    </button>
                )}
                {user && (
                    <button
                        onClick={async () => {
                            dispatch(asynclogoutuser());  // Wait for logout to complete
                            setMenuOpen(false);
                        }}
                        className="block py-2 w-full text-left px-3 rounded-md hover:bg-[#6D4C41] hover:text-white transition-all"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default Nav;
