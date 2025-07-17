import { nanoid } from 'nanoid'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncnewproduct } from '../../Store/action/Productaction';
const CreateProduct = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const submithandler = (product) => {
        product.id = nanoid();
        toast.success("New Product Added", {
            autoClose: 800,
        })
        reset();
        dispatch(asyncnewproduct(product))
        navigate('/products')
    }
    return (
        <div className='w-[100%] flex justify-center'>
            <form className='w-[70%] self-center flex pt-[20px] h-[120%] items-center flex-col gap-[20px] rounded-[20px] duration-300 hover:scale-105 login' onSubmit={handleSubmit(submithandler)}>
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
                    <select className=' w-[60%] self-center block border-b outline-0 p-2' {...register("category", { required: "Choose product category" })} >
                        <option disabled selected>Select Product Category</option>
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

                <button className='px-10 py-2 mt-[20px] duration-200 rounded-[10px] font-bold text-xl bg-[#ee6c4d] cursor-pointer login-button' to="/create">Create Product</button>
            </form>
        </div>
    )
}

export default CreateProduct