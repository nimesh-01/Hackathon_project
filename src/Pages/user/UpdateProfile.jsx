import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { asyncupdateprofile } from '../../Store/action/Useraction'
import { toast } from "react-toastify"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const UpdateProfile = () => {
    
    const { id } = (useParams())    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const users = useSelector((state) => state.userreducer.users)
    const user = [users]?.find((u) => u.id == id)
    useEffect(() => {
    if (user) {
        reset({
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            email_id: user.email_id,
            password: user.password,
        });
    }
}, [user]);
        const { register, handleSubmit, reset, formState: { errors }, } = useForm({
            defaultValues: {
                fname: user?.fname,
                lname: users?.lname,
                username: user?.username,
                email_id: user?.email_id,
                password: user?.password,
            }
        })
           const updatehandler = (newdata) => {
                toast.success("Profile Updated", {
                    autoClose: 800,
                })
                dispatch(asyncupdateprofile(id, newdata))
                navigate(-1)
            }
  return (
    <div className='flex justify-center '>
                <form onSubmit={handleSubmit(updatehandler)} className='flex flex-col items-center w-[100%] rounded-[20px] p-[20px] py-[50px] duration-500  gap-[40px]  hover: login ' >
                    <div className=' flex justify-evenly'>
                        <input {...register("fname")} className='border-b outline-none w-[40%] pl-[5px] pb-[5px]' type="text" placeholder='First Name...' />
                        <input {...register("lname")} className='border-b outline-none w-[40%] pl-[5px] pb-[5px]' type="text" placeholder='Last Name ...' />

                    </div>
                    <input {...register("username")} className='border-b outline-none w-[80%] pl-[5px] pb-[5px]' type="text" placeholder='Username...' />

                    <input {...register("email_id")} className='border-b outline-none w-[80%] pl-[5px] pb-[5px]' type="email" placeholder='Email ID...' />

                    <input {...register("password")} className='border-b outline-none w-[80%] pl-[5px] pb-[5px]' type="password" placeholder='Password...' />

                    <input type="submit" className='px-10 py-2 duration-200 rounded-[10px] font-bold text-xl bg-[rgba(205, 200, 200, 0.55)] cursor-pointer login-buttons' value="Save" />
 </form>
            </div>
  )
}

export default UpdateProfile