import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncupdateprofile } from '../Store/action/Useraction';


const Cart = () => {
  const { userreducer: { users }, productreducer: { products } } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(users);

  const renderproduct = (item, q) => {
    const product = products?.find((p) => p.id == item)
    console.log(item, q);

    const incquantity = (id) => {
      const copyuser = {
        ...users, cart: [...users.cart],
      };
      const index = copyuser.cart.findIndex((item) => item.productId == id);
      copyuser.cart[index] = {
        productId: id,
        quantity: copyuser.cart[index].quantity + 1,
      }
      dispatch(asyncupdateprofile(copyuser.id, copyuser));
    }

    const descquantity = (id) => {
      const copyuser = {
        ...users, cart: [...users.cart],
      };
      const index = copyuser.cart.findIndex((item) => item.productId == id);
      copyuser.cart[index] = {
        productId: id,
        quantity: copyuser.cart[index].quantity - 1,
      }
      if (copyuser.cart[index].quantity <1) removeitem(id)
      else
        dispatch(asyncupdateprofile(copyuser.id, copyuser));
    }

    const removeitem = (id) => {
      const copyuser = {
        ...users, cart: [...users.cart],
      };
      const index = copyuser.cart.findIndex((item) => item.productId == id);
      console.log(index);
      const newArray = copyuser.cart.filter((_, i) => i !== index);
      copyuser.cart = newArray;
      dispatch(asyncupdateprofile(copyuser.id, copyuser));
    }
    return (
      <div className='w-[95%] p-5 flex justify-between  rounded-[10px] bg-slate-800 product '>
        <img className='w-[25%]' src={product?.image} alt="" />
        <div className='w-[70%] flex flex-col gap-2 '>
          <h1 className='font-bold text-2xl'>{product?.title}</h1>
          <h2 className='text-xl font-medium'>Price : {product?.price}</h2>
          <h3 className='text-lg font-medium'>Quantity: <button onClick={() => descquantity(product?.id)} className='mx-2 cursor-pointer'>-</button> {q} <button onClick={() => incquantity(product?.id)} className='mx-2 cursor-pointer' >+</button> </h3>
          <button onClick={() => removeitem(product?.id)} className='text-center font-medium bg-[#ee6c48] rounded-[5px] w-[100px] px-3 py-1'>Remove</button>
        </div>
      </div>
    )
  };
  return (
    <div className='w-[100%] flex justify-center h-screen '>
      <div className='flex flex-col items-center gap-7 '>

        {users?.cart && users?.cart?.length > 0 ? (
          users.cart.map((item, index) => (
            <div key={index} className='w-[100%] flex flex-col items-center'>
              {renderproduct(item.productId, item.quantity)}
            </div>
          ))

        ) : (
          <h1 className="text-white text-2xl font-semibold">Empty Cart</h1>
        )}
      </div >
    </div>
  )
}

export default Cart