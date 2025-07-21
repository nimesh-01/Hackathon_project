import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncupdateprofile } from '../../Store/action/Useraction';
import { toast } from 'react-toastify';

const Mens = () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userreducer);
  const navigate = useNavigate();

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = allProducts.filter(product => product.type === "mens");
    setMensProducts(filtered);
    setFilteredProducts(filtered);
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);

    if (category === "top") {
      setFilteredProducts(mensProducts.filter(p => p.category === "top"));
    } else if (category === "bottom") {
      setFilteredProducts(mensProducts.filter(p => p.category === "bottom"));
    } else if (category === "other") {
      setFilteredProducts(mensProducts.filter(p => p.category !== "top" && p.category !== "bottom"));
    } else {
      setFilteredProducts(mensProducts); // show all
    }
  };

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

  const renderProduct = filteredProducts.map((product) => (
    <div
      key={product.id}
      className="cursor-pointer flex flex-col gap-3 p-4 rounded-xl shadow-md bg-[#F5F5F5] hover:shadow-xl transition-shadow duration-300"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative group w-full h-[200px]">
        <img
          src={`.${product.image[0]}`}
          alt={product.title}
          className="w-full h-full object-contain transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        />
        {product.image[1] && (
          <img
            src={`.${product.image[1]}`}
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
  ));

  return (
    <div className="bg-[#D7CCC8] w-full min-h-screen py-6 px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl text-[#6D4C41] font-bold mb-4 text-center">Men's Wear</h1>

      {/* Filter Buttons - Always visible */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["all", "top", "bottom", "other"].map((val) => (
          <button
            key={val}
            onClick={() => handleFilter(val)}
            className={`px-4 py-2 rounded-full font-semibold transition 
              ${activeCategory === val
                ? "bg-[#6D4C41] text-white"
                : "bg-[#A1887F] text-white hover:bg-[#6D4C41]"}`}
          >
            {val === "all" ? "All" : val.charAt(0).toUpperCase() + val.slice(1) }
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Suspense fallback={<h1 className="text-3xl text-red-500 text-center">Loading...</h1>}>
          {renderProduct.length ? renderProduct : (
            <p className="col-span-full text-center text-[#6D4C41] font-semibold">
              No products found in this category.
            </p>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Mens;
