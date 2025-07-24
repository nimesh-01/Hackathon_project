import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncupdateprofile } from '../../Store/action/Useraction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    userreducer: { users },
    productreducer: { products },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("cart");

  const incquantity = (productId) => {
    const updatedCart = users.cart.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(asyncupdateprofile(users.id, { ...users, cart: updatedCart }));
  };

  const descquantity = (productId) => {
    const existingItem = users.cart.find((item) => item.productId === productId);
    if (!existingItem) return;

    const updatedCart =
      existingItem.quantity <= 1
        ? users.cart.filter((item) => item.productId !== productId)
        : users.cart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        );

    dispatch(asyncupdateprofile(users.id, { ...users, cart: updatedCart }));
  };

  const removeitem = (id) => {
    const updatedCart = users.cart.filter((item) => item.productId !== id);
    dispatch(asyncupdateprofile(users.id, { ...users, cart: updatedCart }));
  };

  const calculateTotal = () => {
    return users.cart
      .reduce((acc, item) => {
        const product = products.find((p) => p.id === item.productId);
        return acc + parseFloat(product?.price || 0) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleBuyNow = (productId) => {
    const item = users.cart.find((i) => i.productId === productId);
    if (!item) return;
    navigate('/checkout', { state: { items: [item], fromBuyNow: true } });
  };

  const handleCheckoutAll = () => {
    if (users.cart.length === 0) return;
    navigate('/checkout', { state: { items: users.cart } });
  };

  const cancelOrder = (productId) => {
    const updatedOrders = users.orders.filter((item) => item.productId !== productId);
    const updatedUser = { ...users, orders: updatedOrders };

    // Update Redux and localStorage
    dispatch(asyncupdateprofile(users.id, updatedUser)).then(() => {
      // Update localStorage only after update
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Order Cancelled", { autoClose: 800 });
    });
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* TOGGLE BUTTONS */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-6 py-2 rounded ${activeTab === "cart"
                ? "bg-[#6D4C41] text-white"
                : "bg-[#D7CCC8] text-[#6D4C41] hover:bg-[#A1887F] hover:text-white"
              } transition`}
          >
            Cart Items
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded ${activeTab === "orders"
                ? "bg-[#6D4C41] text-white"
                : "bg-[#D7CCC8] text-[#6D4C41] hover:bg-[#A1887F] hover:text-white"
              } transition`}
          >
            Ordered Products
          </button>
        </div>

        {/* CART SECTION */}
        {activeTab === "cart" && (
          <>
            <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-[#6D4C41]">Shopping Cart</h1>

            {users?.cart?.length > 0 ? (
              <>
                <div className="hidden md:grid grid-cols-6 text-[#6D4C41] font-semibold border-b border-[#D7CCC8] pb-3 mb-4">
                  <div className="col-span-2">Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                  <div></div>
                </div>

                {users.cart.map((item, index) => {
                  const product = products.find((p) => p.id === item.productId);
                  const total = (parseFloat(product?.price) * item.quantity).toFixed(2);

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center border-b border-[#D7CCC8] py-4 gap-4"
                    >
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

                      <div className="text-[#8D6E63] hidden md:block">₹{product?.price}</div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => descquantity(item.productId)}
                          className="px-2 bg-[#D7CCC8] hover:bg-[#A1887F] hover:text-white rounded transition"
                        >
                          -
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() => incquantity(item.productId)}
                          className="px-2 bg-[#D7CCC8] hover:bg-[#A1887F] hover:text-white rounded transition"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-[#8D6E63] font-semibold hidden md:block">₹{total}</div>

                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          onClick={() => handleBuyNow(item.productId)}
                          className="px-4 py-1 bg-[#A1887F] text-white rounded hover:bg-[#6D4C41]"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={() => removeitem(item.productId)}
                          className="px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-800 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end mt-10">
                  <div className="bg-white border border-[#D7CCC8] rounded p-6 shadow-md w-full max-w-sm">
                    <h2 className="text-lg font-semibold text-[#6D4C41] mb-4">Cart Total</h2>
                    <div className="flex justify-between text-[#8D6E63] mb-2">
                      <span>Total:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <button
                      onClick={handleCheckoutAll}
                      className="mt-4 w-full px-4 py-2 bg-[#6D4C41] text-white rounded hover:bg-[#8D6E63]"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <h1 className="text-2xl text-[#6D4C41] font-semibold text-center">Your Cart is Empty</h1>
            )}
          </>
        )}

        {/* ORDERS SECTION */}
        {activeTab === "orders" && (
          <>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[#4E342E]">Your Orders</h2>

            {users?.orders?.length > 0 ? (
              <div className="grid gap-6">
                {users.orders.map((item, index) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D7CCC8] bg-white p-4 rounded shadow"
                    >
                      <div
                        className="flex items-center gap-6 cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <img
                          src={product.image[0]}
                          alt={product.title}
                          className="w-20 h-20 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-[#6D4C41] hover:underline">{product.title}</h3>
                          <p className="text-[#8D6E63]">Quantity: {item.quantity}</p>
                          <p className="text-[#8D6E63]">Price: ₹{product.price}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => cancelOrder(product.id)}
                        className="px-4 py-1 border border-red-500 text-red-600 rounded hover:bg-red-700 hover:text-white"
                      >
                        Cancel Order
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-lg text-[#6D4C41] font-medium">No products ordered yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
