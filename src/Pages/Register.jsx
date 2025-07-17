import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncregisteruser } from '../Store/action/Useraction';
import { toast } from 'react-toastify';
const Register = () => {
  const navigate = useNavigate()
  const { register, reset, handleSubmit } = useForm()
  const dispatch = useDispatch();
  const registerhandler = (user) => {
    user.id = nanoid();
    user.isadmin = false;
    user.cart = [];
    dispatch(asyncregisteruser(user))
    toast.success("Registered successfully", {
      autoClose: 800,
    })
    navigate('/login')
  }
  return (
    <div className='flex justify-center '>
      <form onSubmit={handleSubmit(registerhandler)} className='flex flex-col items-center w-[50%] rounded-[20px] p-[20px] py-[50px] duration-500  gap-[40px]  hover: login ' >
        <h1 className='text-3xl font-bold self-center '>Register</h1>

        <div className=' flex justify-evenly'>
          <input {...register("fname")} className='border-b outline-none w-[40%] pl-[5px] pb-[5px]' type="text" placeholder='First Name...' />
          <input {...register("lname")} className='border-b outline-none w-[40%] pl-[5px] pb-[5px]' type="text" placeholder='Last Name ...' />

        </div>
        <input {...register("username")} className='border-b outline-none w-[60%] pl-[5px] pb-[5px]' type="text" placeholder='Username...' />

        <input {...register("email_id")} className='border-b outline-none w-[60%] pl-[5px] pb-[5px]' type="email" placeholder='Email ID...' />

        <input {...register("password")} className='border-b outline-none w-[60%] pl-[5px] pb-[5px]' type="password" placeholder='Password...' />

        <button className='px-10 py-2 duration-200 rounded-[10px] font-bold text-xl bg-[#ee6c4d] cursor-pointer login-button'  >Register</button>

        <p>Already't have an account ?
          <Link to='/login' className='text-blue-400'>   Login</Link></p>
      </form>
    </div>
  )
}

export default Register