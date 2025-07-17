import React from 'react'
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { asyncdeleteprofile } from '../../Store/action/Useraction';
import { toast } from "react-toastify"

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var newuser = useSelector((state) => state.userreducer.users)
    // const user = [users];
  const  user = newuser && (newuser[0] || newuser)
    console.log(user);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {
            fname: user?.fname,
            lname: user?.lname,
            username: user?.username,
            email_id: user?.email_id,
            password: user?.password,
        }
    })

    const updateprofile = () => {
        navigate(`/user-profile/update-profile/${user.id}`)
    }

    const deleteprofile = () => {
        dispatch(asyncdeleteprofile(user.id))
        toast.success("User Deleted", {
            autoClose: 800,
        })
        navigate("/products")
    }

    return (
        <div className='min-w-[100%]  flex justify-center flex-col items-center '>
            <div className='w-[80%] flex flex-col gap-2 mt-5 mb-10 rounded-[10px] bg-slate-900 px-20 py-10 product'>
                <h1 className='text-4xl w-[100%] text-slate-200 font-bold tracking-[2px] text-center'>Profile</h1>
                <div className='text-2xl font-semibold tracking-[1px] text-slate-200'>Name : <span className='text-xl tracking-[0px] font-thin  px-1 border-b'>{user.fname}{user.lname}</span></div>
                <div className='text-2xl font-semibold tracking-[1px] text-slate-200'>Username : <span className='text-xl tracking-[0px] font-thin  px-1 border-b'>{user.username}</span></div>
                <div className='text-2xl font-semibold tracking-[1px] text-slate-200'>Email Id : <span className='text-xl tracking-[0px] font-thin  px-1 border-b'>{user.email_id}</span></div>
                <div className='text-2xl font-semibold tracking-[1px] text-slate-200'>Password : <span className='text-xl tracking-[0px] font-thin  px-1 border-b'>{user.password}</span></div>
                <div className='flex gap-10'>
                    <button onClick={updateprofile} className='mt-5 cursor-pointer block rounded-[10px] bg-blue-400 text-gray-800 font-semibold p-2 duration-200 delete-button'>Update Profile</button>
                    <button onClick={deleteprofile} type="button" className='mt-5 cursor-pointer block rounded-[10px] bg-red-400 duration-200 text-gray-800 font-semibold p-2 update-button'>Delete Profile</button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile