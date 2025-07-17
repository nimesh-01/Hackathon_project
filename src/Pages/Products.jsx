import React, { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncupdateprofile } from "../Store/action/Useraction";
import { toast } from 'react-toastify';
import Infinitescroll from "react-infinite-scroll-component";
import Useinfiniteproducts from '../Utility/Useinfiniteproducts';
const Products = () => {
  // const { userreducer: { users }, productreducer: { products } } = useSelector((state) => state);
  const dispatch=useDispatch()
  const users = useSelector((state) => state.userreducer);
  const {products,hasMore,fetchproducts}=Useinfiniteproducts()
  const navigate = useNavigate();


 const addtocarthandler = (id) => {

  toast.success("Product Added ", {
    autoClose: 800,
  });
  
  const copyuser = {
    ...users.users,
    cart: Array.isArray(users?.cart) ? [...users.users.cart] : [...users.users.cart],
  };
  
  const index = copyuser.cart.findIndex((item) => item.productId == id);

  if (index === -1) {
    copyuser.cart.push({ productId: id, quantity: 1 });
  } else {
    copyuser.cart[index] = {
      productId: id,
      quantity: copyuser.cart[index].quantity + 1,
    };
  }
  dispatch(asyncupdateprofile(copyuser.id, copyuser));
};
  const renderproduct = products.map((product) => {
    return (
      <div key={product.id} className='flex flex-col gap-2 p-5  items-center justify-start  rounded-[10px] product' >
        <Link to={`/product/${product.id}`} className='flex flex-col gap-2 '>
          <img className='h-[200px] cursor-pointer object-contain rounded-[10px] ' src={product.image} alt="" />
          <h1 className='font-bold'> {product.title}</h1>
          <h1 className=' font-semibold'>&#8377;{product.price}</h1>
          <p className='text-xs'>{product.description.slice(0, 60)}...</p>
        </Link>
        {(users.users!=null) ?
          (<button onClick={() => addtocarthandler(product.id)} className=' duration-200 p-2 self-center
 w-[100px] self-start rounded-[10px] font-bold text-xs bg-[#ee6c4d]  cursor-pointer login-button'  >Add to cart</button>)
          : ""}
      </div >

    )
  })
  return (
    <Infinitescroll
      dataLength={products.length} //This is important field to render the next data
      next={fetchproducts}
      hasMore={hasMore}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="w-[100%] p-3 grid grid-cols-3 gap-5">
        <Suspense fallback={<h1 className='text-3xl text-red-500 text-center'> Loading</h1>}>
          {renderproduct}</Suspense>
      </div>
    </Infinitescroll >
  )
}

export default Products