import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { asyncloginuser } from '../Store/action/Useraction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = ({ onClose, switchToRegister }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const loginhandler = async (user) => {
    const data = await dispatch(asyncloginuser(user));
    if (!data) {
      toast.error("Invalid Email and password", { autoClose: 800 });
    } else {
      onClose(); // Close popup after successful login
    }
  };

  return (
    <div className="group transition duration-300 ease-in-out rounded-xl overflow-hidden w-[95%] md:w-[90%] mx-auto  text-[#6D4C41] flex flex-col md:flex-row shadow-lg">
      {/* Left Image */}
      <div className="md:w-1/2 bg-[#242124] w-full relative h-[200px] md:h-[500px]">
        <img
          src="./src/assets/Logo/logos-removebg-preview.png"
          alt="Login Visual"
          className="h-full w-full md:object-cover object-contain z-20"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4 md:p-6 text-white">
          <div className="text-right">
            <button onClick={onClose} className="text-xs md:text-sm px-3 py-1 rounded-full bg-white/20 hover:bg-white/30">Close ✕</button>
          </div>
          <div className="text-sm md:text-xl font-semibold animate-fadeInUp space-y-1">
            <p className="tracking-widest text-lg md:text-2xl font-extrabold text-white drop-shadow-md animate-pulse">
              SYSTUMM Clothing Brand!
            </p>
            <p className="italic text-sm md:text-xl font-light text-[#f5f5f5] animate-fadeInUp">"Rehna h to system k niche rehna padega"</p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full bg-[#A1887F] flex items-center justify-center p-4 md:p-8">
        <form onSubmit={handleSubmit(loginhandler)} className="w-full max-w-md space-y-4 md:space-y-6 p-4 md:p-6 rounded-xl bg-[#F5F5F5] shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Login</h2>

          <div>
            <input
              {...register("email_id", { required: "Invalid Email_Id" })}
              type="email"
              placeholder="Email ID..."
              className="w-full p-2 md:p-3 outline-none rounded-md border border-[#A1887F] bg-white text-base"
            />
            <small className="text-red-400 text-xs">{errors?.email_id?.message}</small>
          </div>

          <div className="relative">
            <input
              {...register("password", { required: "Invalid Password" })}
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              className="w-full p-2 md:p-3 pr-10 outline-none rounded-md border border-[#A1887F] bg-white text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6D4C41] hover:text-[#8D6E63] bg-white/60 hover:bg-white/80 p-1 rounded-full shadow-md transition duration-200"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5.373-10-7s4.477-7 10-7a9.99 9.99 0 016.829 2.684M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5.373-10-7s4.477-7 10-7a9.99 9.99 0 016.829 2.684M4.222 4.222l15.556 15.556" />
                </svg>
              )}
            </button>
            <small className="text-red-400 text-xs">{errors?.password?.message}</small>
          </div>

          <button className="w-full py-2 md:py-3 bg-[#6D4C41] text-white rounded-md font-semibold hover:bg-[#8D6E63] transition duration-300">
            Login
          </button>

          <p className="text-xs md:text-sm text-center">
            Don't have an account? <button onClick={switchToRegister} className='text-[#6D4C41] underline'>Register</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
