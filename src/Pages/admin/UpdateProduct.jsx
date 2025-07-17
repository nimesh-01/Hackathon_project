import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { asyncdeleteproduct, asyncupdateproduct } from '../../Store/action/Productaction';
import { asyncupdateprofile } from '../../Store/action/Useraction';
const UpdateProduct = () => {
    const { id } = useParams()
    const products = useSelector((state) => state.productreducer.products)
    const users = useSelector((state) => state.userreducer)

    const product = products?.find((p) => p.id == id)
    console.log(users);
    console.log(id);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {
            title: product?.title,
            description: product?.description,
            price: product?.price,
            image: product?.image,
            category: product?.category,
        }
    })

    const updatehandler = (product) => {
        toast.success("Product Updated", {
            autoClose: 800,
        })
        dispatch(asyncupdateproduct(id, product))
        reset();
        navigate(-1)
    }
    const Deletehandler = async () => {
    const productIdToDelete = product?.id;

    if (!productIdToDelete) return;

    // Ensure cart is an array
    const copyuser = {
        ...users,
        cart: Array.isArray(users.cart) ? [...users.cart] : [],
    };

    // Remove the product from the user's cart
    copyuser.cart = copyuser.cart.filter((item) => item.productId !== productIdToDelete);

    // Update user profile first
    await dispatch(asyncupdateprofile(copyuser.id, copyuser));

    // Then delete the product from product list
    await dispatch(asyncdeleteproduct(productIdToDelete));

    // Show toast
    toast.success("Product Deleted", {
        autoClose: 800,
    });

    // Navigate away
    navigate("/products");
};


    return (
        <div className='w-[100%] flex justify-center'>
            <form className='w-[70%] self-center flex py-[30px] h-[120%] items-center flex-col gap-[20px] rounded-[20px] duration-300 hover:scale-105 login' onSubmit={handleSubmit(updatehandler)}>
                <h1 className='text-3xl font-bold tracking-[1px]'>Product Details</h1>
                <div className='w-[90%] flex flex-col items-center'>
                    <input className='w-[100%] block border-b outline-0 p-2' {...register("title", { required: "Product title empty" })} type="text" placeholder='Product Title' />
                    <small className='text-red-400 self-start text-xs'>{errors?.title?.message}</small>
                </div>
                <div className='w-[90%] flex flex-col items-center'>
                    <textarea className='w-[100%] block border-b outline-0 p-2' {...register("description", { required: "Enter product Description" })} placeholder="Product Description..." ></textarea>
                    <small className='text-red-400 self-start text-xs'>{errors?.description?.message}</small>
                </div>
                <div className='w-[90%] flex flex-col items-center'>
                    <input className='w-[100%] block  border-b outline-0 p-2' {...register("price", { required: "Enter price..." })} type="number" placeholder="price of product..." />
                    <small className='text-red-400 self-start text-xs'>{errors?.price?.message}</small>
                </div>
                <div className='w-[90%] flex flex-col items-center'>
                    <input className=' w-[100%] block border-b outline-0 p-2' {...register("image", { required: "Upload Product Image" })} type="url" placeholder='Enter image URL' />
                    <small className='text-red-400 self-start text-xs'>{errors?.image?.message}</small>
                </div>
                <div className='w-[90%] flex flex-col items-center'>
                    <select className=' w-[60%] self-center text-white block border-b outline-0 p-2' {...register("category", { required: "Choose product category" })} >
                        {/* <option disabled selected>Select Product Category</option> */}
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home-kitchen">Home & Kitchen</option>
                        <option value="grocery">Grocery & Essentials</option>
                        <option value="beauty-health">Beauty & Health</option>
                        <option value="books">Books & Stationery</option>
                        <option value="sports">Sports & Fitness</option>
                        <option value="toys">Toys & Baby Products</option>
                        <option value="automotive">Automotive</option>
                        <option value="pet">Pet Supplies</option>
                    </select>
                    <small className='text-red-400 text-xs'>{errors?.category?.message}</small>
                </div>
                <div className='flex gap-10'>
                    <button className='mt-5 cursor-pointer block rounded-[10px] bg-blue-400 text-gray-800 font-semibold p-2 duration-200 delete-button'>Update Product</button>
                    <button onClick={Deletehandler} type="button" className='mt-5 cursor-pointer block rounded-[10px] bg-red-400 duration-200 text-gray-800 font-semibold p-2 update-button'>Delete Product</button>
                </div> </form>
        </div>
    )

}

export default UpdateProduct