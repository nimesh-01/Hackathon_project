import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncupdateprofile } from '../../Store/action/Useraction';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { state } = useLocation();
  const items = state?.items || [];
  const fromBuyNow = state?.fromBuyNow || false;

  const {
    userreducer: { users },
    productreducer: { products }
  } = useSelector(state => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [addressError, setAddressError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const addresses = users.address || [];

  const onSubmitAddress = (data) => {
    const updatedAddresses = [...addresses, data];
    const updatedUser = { ...users, address: updatedAddresses };
    dispatch(asyncupdateprofile(users.id, updatedUser));
    reset();
    setShowForm(false);
    setSelectedAddressIndex(updatedAddresses.length - 1);
    setAddressError('');
        toast.success("Address Added", { autoClose: 800 });
    
  };

  const resetForm = () => {
    reset();
    setShowForm(false);
    setAddressError('');
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

const placeOrder = () => {
  if (addresses.length === 0) {
    setAddressError('⚠️ Please add an address before placing your order.');
    setShowForm(true);
    return;
  }

  setAddressError('');

  const existingOrders = [...(users.orders || [])];
  const updatedOrders = existingOrders.map(order => ({ ...order })); // clone to avoid direct mutation

  items.forEach(item => {
    const existingOrderIndex = updatedOrders.findIndex(
      orderItem => orderItem.productId === item.productId
    );

    if (existingOrderIndex !== -1) {
      // If item already exists in orders, create new object and update quantity
      updatedOrders[existingOrderIndex] = {
        ...updatedOrders[existingOrderIndex],
        quantity: updatedOrders[existingOrderIndex].quantity + item.quantity
      };
    } else {
      // Add a clone of new item
      updatedOrders.push({ ...item });
    }
  });

  let filteredCart = [...users.cart];

  if (fromBuyNow) {
    filteredCart = users.cart.filter(
      cartItem => !items.some(i => i.productId === cartItem.productId)
    );
  } else {
    filteredCart = users.cart.filter(
      cartItem => !items.some(i => i.productId === cartItem.productId)
    );
  }

  const updatedUser = {
    ...users,
    orders: updatedOrders,
    cart: filteredCart
  };

  dispatch(asyncupdateprofile(users.id, updatedUser));
      toast.success("Order Placed", { autoClose: 800 });
  
  navigate('/cart');
};


  return (
    <div className="bg-[#F5F5F5] min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-[#6D4C41] mb-6 text-center">Checkout</h1>

      {/* Items Summary */}
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-4 mb-6">
        {items.map((item, idx) => {
          const product = products.find(p => p.id === item.productId);
          return (
            <div key={idx} className="flex justify-between items-center border-b border-[#D7CCC8] py-3">
              <div className="flex items-center gap-4">
                <img
                  src={product?.image[0]}
                  alt={product?.title}
                  className="w-16 h-16 rounded object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product?.id}`)}
                />
                <div>
                  <h2
                    className="text-[#6D4C41] font-medium cursor-pointer"
                    onClick={() => navigate(`/product/${product?.id}`)}
                  >
                    {product?.title}
                  </h2>
                  <p className="text-[#8D6E63]">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-[#6D4C41] font-semibold">₹{product?.price}</p>
            </div>
          );
        })}
        <div className="text-right mt-4 text-xl text-[#4E342E] font-semibold">
          Total: ₹{calculateTotal()}
        </div>
      </div>

      {/* Address List */}
      <div className="max-w-3xl max-h-[300px] overflow-y-auto mx-auto bg-white rounded shadow p-4 mb-6 scroll-smooth scrollbar-hide">
        <h2 className="text-lg text-[#6D4C41] font-semibold mb-4">Select Address</h2>

        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((addr, idx) => (
              <label
                key={idx}
                className={`block border p-4 rounded cursor-pointer ${
                  selectedAddressIndex === idx ? 'border-[#6D4C41] bg-[#FAFAFA]' : 'border-[#D7CCC8]'
                }`}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  className="mr-2 accent-[#6D4C41]"
                  checked={selectedAddressIndex === idx}
                  onChange={() => setSelectedAddressIndex(idx)}
                />
                <div>
                  <p className="font-semibold">{addr.name} ({addr.type})</p>
                  <p className="text-sm text-[#5D4037]">
                    {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-[#5D4037]">
                    Phone: {addr.phone} {addr.altPhone ? `/ Alt: ${addr.altPhone}` : ''}
                  </p>
                  {addr.landmark && <p className="text-sm text-[#5D4037]">Landmark: {addr.landmark}</p>}
                </div>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-[#8D6E63]">No address found. Add one below.</p>
        )}

        <button
          onClick={() => {
            setShowForm(true);
            setAddressError('');
          }}
          className="mt-4 bg-[#A1887F] text-white px-4 py-2 rounded hover:bg-[#6D4C41]"
        >
          Add New Address
        </button>

        {/* Error Message */}
        {addressError && (
          <p className="text-red-600 font-medium mt-3">{addressError}</p>
        )}
      </div>

      {/* Address Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmitAddress)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F5F5] p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-3xl mx-auto"
        >
          <div className="col-span-1 flex flex-col">
            <input placeholder="Name" {...register("name", { required: "Name is required" })} className="border p-2 rounded w-full" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="10-digit mobile number" {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone must be 10 digits"
              }
            })} className="border p-2 rounded w-full" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="Pincode" {...register("pincode", { required: "Pincode is required" })} className="border p-2 rounded w-full" />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="Locality" {...register("locality")} className="border p-2 rounded w-full" />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <input placeholder="Address (Area and Street)" {...register("address", { required: "Address is required" })} className="border p-2 rounded w-full" />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="City" {...register("city", { required: "City is required" })} className="border p-2 rounded w-full" />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="State" {...register("state", { required: "State is required" })} className="border p-2 rounded w-full" />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="Landmark (Optional)" {...register("landmark")} className="border p-2 rounded w-full" />
          </div>

          <div className="col-span-1 flex flex-col">
            <input placeholder="Alternate Phone (Optional)" {...register("altPhone")} className="border p-2 rounded w-full" />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
            <label className="font-medium">Address Type:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" value="Home" {...register("type")} defaultChecked /> Home
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="Work" {...register("type")} /> Work
              </label>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
            <button type="submit" className="bg-[#6D4C41] text-white px-6 py-2 rounded-md hover:bg-[#8D6E63] w-full sm:w-auto">Save</button>
            <button type="button" onClick={resetForm} className="border border-[#6D4C41] text-[#6D4C41] px-6 py-2 rounded-md hover:bg-[#EFEAE7] w-full sm:w-auto">Cancel</button>
          </div>
        </form>
      )}

      {/* Place Order Button */}
      <div className="max-w-3xl mx-auto text-center mt-6">
        <button
          onClick={placeOrder}
          className="px-6 py-2 bg-[#6D4C41] text-white rounded hover:bg-[#8D6E63]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
