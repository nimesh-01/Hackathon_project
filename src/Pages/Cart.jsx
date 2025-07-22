import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncupdateprofile } from '../Store/action/Useraction';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { userreducer: { users }, productreducer: { products } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incquantity = (productId) => {
    const updatedCart = users.cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    const updatedUser = {
      ...users,
      cart: updatedCart,
    };

    dispatch(asyncupdateprofile(users.id, updatedUser));
  };

  const descquantity = (productId) => {
    const existingItem = users.cart.find(item => item.productId === productId);
    if (!existingItem) return;

    if (existingItem.quantity <= 1) {
      const updatedCart = users.cart.filter(item => item.productId !== productId);
      dispatch(asyncupdateprofile(users.id, { ...users, cart: updatedCart }));
    } else {
      const updatedCart = users.cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      dispatch(asyncupdateprofile(users.id, { ...users, cart: updatedCart }));
    }
  };

  const removeitem = (id) => {
    const copyuser = {
      ...users,
      cart: users.cart.filter(item => item.productId !== id),
    };
    dispatch(asyncupdateprofile(copyuser.id, copyuser));
  };

  const calculateTotal = () => {
    return users.cart.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      return acc + parseFloat(product?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  const handleBuyNow = (productId) => {
    alert(`Proceeding to buy product ID: ${productId}`);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-[#6D4C41] text-center md:text-left">
          Shopping Cart
        </h1>

        {users?.cart?.length > 0 ? (
          <>
            {/* Header for Desktop */}
            <div className="hidden md:grid grid-cols-6 text-[#6D4C41] font-semibold border-b border-[#D7CCC8] pb-3 mb-4">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div></div>
            </div>

            {/* Cart Items */}
            {users.cart.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              const total = (parseFloat(product?.price) * item.quantity).toFixed(2);

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center border-b border-[#D7CCC8] py-4 gap-4"
                >
                  {/* Product Details */}
                  <div
                    className="flex items-center gap-4 cursor-pointer col-span-2"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  >
                    <img
                      src={product?.image[0]}
                      alt={product?.title}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <span className="text-[#6D4C41] font-medium hover:underline">{product?.title}</span>
                  </div>

                  {/* Price (Desktop) */}
                  <div className="text-[#8D6E63] hidden md:block">₹{parseFloat(product?.price).toFixed(2)}</div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => descquantity(item.productId)}
                      className="px-2 bg-[#D7CCC8] hover:bg-[#A1887F] hover:text-white rounded transition"
                    >-</button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => incquantity(item.productId)}
                      className="px-2 bg-[#D7CCC8] hover:bg-[#A1887F] hover:text-white rounded transition"
                    >+</button>
                  </div>

                  {/* Total (Desktop) */}
                  <div className="text-[#8D6E63] font-semibold hidden md:block">₹{total}</div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <button
                      onClick={() => handleBuyNow(item.productId)}
                      className="px-4 py-1 bg-[#A1887F] text-white rounded hover:bg-[#6D4C41] transition"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => removeitem(item.productId)}
                      className="px-3 py-1 border border-red-500 duration-300 text-red-600 font-medium rounded hover:bg-red-800 hover:text-white transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Total Section */}
            <div className="flex justify-center md:justify-end mt-10">
              <div className="bg-white border border-[#D7CCC8] rounded p-6 shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold text-[#6D4C41] mb-4 text-center md:text-left">
                  Cart Total
                </h2>
                <div className="flex justify-between text-[#8D6E63] text-md font-medium mb-2">
                  <span>Total:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-[#6D4C41] text-white rounded hover:bg-[#8D6E63] transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-2xl text-[#6D4C41] font-semibold text-center">
            Your Cart is Empty
          </h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
