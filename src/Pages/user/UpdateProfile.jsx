import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { asyncupdateprofile } from '../../Store/action/Useraction';
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userreducer.users);
  const user = [users]?.find((u) => u.id == id);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fname: user?.fname,
      lname: user?.lname,
      username: user?.username,
      email_id: user?.email_id,
      password: user?.password,
    }
  });

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
  }, [user, reset]);

  const updatehandler = (newdata) => {
    const updatedUser = { ...user, ...newdata };
    dispatch(asyncupdateprofile(id, updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUser));
    toast.success("Profile Updated", { autoClose: 800 });
    navigate(-1);
  };

  return (
    <div className="flex justify-center py-10 bg-[#F5F5F5] min-h-screen">
      <form
        onSubmit={handleSubmit(updatehandler)}
        className="bg-white w-[90%] max-w-[600px] p-10 rounded-xl shadow-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-[#6D4C41]">Update Profile</h2>

        <div className="flex gap-4">
          <input {...register("fname")} placeholder="First Name" className="w-1/2 px-4 py-2 border-b outline-none" />
          <input {...register("lname")} placeholder="Last Name" className="w-1/2 px-4 py-2 border-b outline-none" />
        </div>

        <input {...register("username")} placeholder="Username" className="w-full px-4 py-2 border-b outline-none" />
        <input {...register("email_id")} placeholder="Email ID" className="w-full px-4 py-2 border-b outline-none" />
        <input {...register("password")} placeholder="Password" type="password" className="w-full px-4 py-2 border-b outline-none" />

        <input type="submit" value="Save" className="bg-[#D7CCC8] text-[#6D4C41] px-6 py-2 rounded-lg font-bold hover:bg-[#BCAAA4] cursor-pointer transition" />
      </form>
    </div>
  );
};

export default UpdateProfile;
