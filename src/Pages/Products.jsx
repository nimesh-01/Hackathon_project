import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { asyncupdateprofile } from "../Store/action/Useraction";
import { toast } from 'react-toastify';
import Infinitescroll from "react-infinite-scroll-component";
import Useinfiniteproducts from '../Utility/Useinfiniteproducts';

const Products = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userreducer);
  const { products, hasMore, fetchproducts } = Useinfiniteproducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Read from URL or dispatched event
  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search).get('q') || '';
    setSearchQuery(urlQuery.toLowerCase());

    const handleCustomSearch = (e) => {
      setSearchQuery(e.detail.toLowerCase());
    };

    window.addEventListener('search-products', handleCustomSearch);
    return () => window.removeEventListener('search-products', handleCustomSearch);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(p => p.title.toLowerCase().includes(searchQuery));
  }, [products, searchQuery]);

  const addToCartHandler = (e, id) => {
    e.stopPropagation();
    toast.success("Product Added", { autoClose: 800 });

    const copyuser = {
      ...users.users,
      cart: Array.isArray(users?.cart) ? [...users.users.cart] : [...users.users.cart],
    };

    const index = copyuser.cart.findIndex((item) => item.productId === id);
    if (index === -1) {
      copyuser.cart.push({ productId: id, quantity: 1 });
    } else {
      copyuser.cart[index].quantity += 1;
    }

    dispatch(asyncupdateprofile(copyuser.id, copyuser));
  };

  return (
    <div className="bg-[#D7CCC8] w-full min-h-screen">
      {/* Category Buttons */}
      <div className="w-full flex flex-wrap justify-center gap-6 py-6 px-4">
        {[
          {
            label: "Men's",
            path: "/products/mens-wear",
            image: "./assets/Banner/mens.webp",
          },
          {
            label: "Women's",
            path: "/products/womens-wear",
            image: "./assets/Banner/womens.jpg",
          },
          {
            label: "Kids",
            path: "/products/kids-wear",
            image: "./assets/Banner/kids.jpg",
          },
        ].map((category) => (
          <NavLink
            key={category.label}
            to={category.path}
            className={({ isActive }) =>
              `relative flex items-end justify-center
              w-[90px] h-[90px] sm:w-[150px] sm:h-[150px] 
              rounded-full bg-cover bg-top overflow-hidden 
              shadow-md hover:shadow-xl transition duration-300 
              ${isActive ? 'ring-4 ring-[#6D4C41]' : 'ring-1 ring-gray-300'}`
            }
            style={{
              backgroundImage: `url(${category.image})`,
            }}
          >
            <span className="bg-[#6D4C41CC] text-white text-[12px] sm:text-sm font-semibold px-2 py-1 w-full text-center rounded-b-full">
              {category.label}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Products Grid */}
      <Infinitescroll
        dataLength={filteredProducts.length}
        next={fetchproducts}
        hasMore={hasMore}
        endMessage={
          <p className="text-center font-bold text-[#6D4C41] my-6">Yay! You have seen it all</p>
        }
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 pb-10">
          <Suspense fallback={<h1 className="text-3xl text-red-500 text-center">Loading</h1>}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer flex flex-col gap-3 p-4 rounded-xl shadow-md bg-[#F5F5F5] hover:shadow-xl transition-shadow duration-300"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative group w-full h-[200px]">
                    <img
                      src={product.image[0]}
                      alt={product.title}
                      className="w-full h-full object-contain transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                    />
                    {product.image[1] && (
                      <img
                        src={product.image[1]}
                        alt={product.title}
                        className="absolute top-0 left-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                  </div>

                  <h2 className="font-bold text-[#6D4C41] text-sm">{product.title}</h2>
                  <p className="text-[#8D6E63] font-semibold text-sm">&#8377;{product.price}</p>
                  <p className="text-xs text-[#A1887F] capitalize">Type: {product.type}</p>
                  <p className="text-xs text-[#A1887F] capitalize">Category: {product.category}</p>
                  {product.rating && (
                    <p className="text-xs text-[#6D4C41]">
                      Rating: {product.rating.rate} ⭐ ({product.rating.count})
                    </p>
                  )}
                  <p className={`text-xs font-medium ${product.stock === false ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock === false ? 'Out of Stock' : 'In Stock'}
                  </p>

                  {users.users && (
                    <button
                      onClick={(e) => addToCartHandler(e, product.id)}
                      className="bg-[#A1887F] hover:bg-[#8D6E63] text-white rounded-md px-4 py-2 text-xs font-bold transition duration-200"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-[#6D4C41] font-semibold text-xl">
                No Product Found
              </div>
            )}
          </Suspense>
        </div>
      </Infinitescroll>
    </div>
  );
};

export default Products;
