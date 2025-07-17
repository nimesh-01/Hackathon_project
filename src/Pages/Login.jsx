import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { asyncloginuser } from '../Store/action/Useraction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate()
  const { register, reset, handleSubmit, formState: { errors }, } = useForm()
  const dispatch = useDispatch();

  const loginhandler = async (user) => {
    const data = await dispatch(asyncloginuser(user));
    if (!data) {
      toast.error("Invalid Email and password", {
        autoClose: 800,
      })
    }
    else navigate('/products')

  }
  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit(loginhandler)} className='flex flex-col items-center w-[50%] rounded-[20px] p-[20px] py-[50px] duration-300  gap-[30px] hover:scale-105 login ' >
        <h1 className='text-3xl font-bold self-center tracking-[2px]'>Login</h1>
        <div className='flex flex-col w-[60%] gap-1'>
          <input {...register("email_id", { required: "Invalid Email_Id" })} className='border-b outline-none  pl-[5px] pb-[5px]' type="email" placeholder='Email ID...' />
          <small className='text-red-400  text-xs'>{errors?.email_id?.message}</small>
        </div>
        <div className="flex flex-col w-[60%] gap-1">
          <input {...register("password", { required: "Invalid Password" })} className='border-b outline-none  pl-[5px] pb-[5px]' type="password" placeholder='Password...' />
          <small className='text-red-400 text-xs'>{errors?.password?.message}</small>
        </div>
        <button className='px-10 py-2 duration-200 rounded-[10px] font-bold text-xl bg-[#ee6c4d] cursor-pointer login-button'  >Login</button>

        <p>Don't have an account ?
          <Link to='/register' className='text-blue-400'>   Register</Link></p>
      </form>
    </div>
  )
}

export default Login