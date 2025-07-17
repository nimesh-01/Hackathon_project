import React, { useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { asyncupdateproduct } from '../Store/action/Productaction'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncloadproduct } from '../Store/action/Productaction'
import { asyncupdateprofile } from "../Store/action/Useraction";
import { toast } from 'react-toastify';


const Productdetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {
        productreducer: { products },
        userreducer: { users }
    } = useSelector((state) => state)
    const product = products?.find((p) => p.id == id)
    console.log(id);


    const addtocarthandler = () => {
        toast.success("Product Added ", {
            autoClose: 800,
        })
        const copyuser = {
            ...users, cart: [...users.cart],
        };
        const index = copyuser.cart.findIndex((item) => item.productId == id);

        if (index == -1) {
            copyuser.cart.push({ productId: id, quantity: 1 });
        } else {
            copyuser.cart[index] = {
                productId: id,
                quantity: copyuser.cart[index].quantity + 1,
            }

        }
        dispatch(asyncupdateprofile(copyuser.id, copyuser));
    };
    console.log(users);
    
    const navigate = useNavigate();
    if (!product) {
        console.log("No product");
    }
    else {

        return (
            <div className='min-w-[100%]  flex justify-center '>
                <div className='w-[80%] mt-5 mb-10 rounded-[10px] flex gap-10 bg-slate-900 px-20 py-10 product'>
                    <div className='w-[40%] relative '>
                        <img className='sticky top-10 rounded-[10px]' src={product.image} alt="product image" />
                        {users && (users.isadmin) && (
                            <Link className='duration-200 absolute bottom-[-30px] p-2 text-center w-[120px] rounded-[10px] font-bold text-xs bg-[#ee6c4d]  cursor-pointer login-button' to={`/admin/update-product/${product.id}`} >Update Product</Link>

                        )}    </div>
                    <div className='flex flex-col gap-5 w-[50%]'>
                        <h1 className='text-3xl font-bold tracking-[1px]'>{product.title}</h1>
                        <h1 className='font-bold text-xl'>Price : &#8377;{product.price}</h1>
                        {(users != null ) ?
                            (<button onClick={addtocarthandler} className=' duration-200 p-2  w-[100px] rounded-[10px] font-bold text-xs bg-[#ee6c4d]  cursor-pointer login-button'  >Add to cart</button>)
                            : ""}
                        <p className='leading-5'><span className='text-2xl font-semibold'>About this item: </span> <br></br>{product.description}</p>
                    </div>
                </div>
            </div>

        )

    }
}

export default Productdetail