import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { asyncdeleteprofile, asyncupdateprofile } from "../../Store/action/Useraction";

const defaultImage = "https://via.placeholder.com/150/000000/FFFFFF?text=User";

const Profile = () => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.userreducer.users);
  const [currentTab, setCurrentTab] = useState("personal");
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImg, setProfileImg] = useState(user?.image || defaultImage);
  const [formData, setFormData] = useState(user);
  const [addressList, setAddressList] = useState(user?.address || []);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user")) || storedUser;
    setUser(saved);
    setFormData(saved);
    setProfileImg(saved?.image || defaultImage);
    setAddressList(saved?.address || []);
  }, [storedUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImg(reader.result);
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => setIsEditing(true);

  const handleSave = () => {
    const updated = { ...formData, image: profileImg, address: addressList };
    dispatch(asyncupdateprofile(updated.id, updated));
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setIsEditing(false);
    toast.success("Profile Updated", { autoClose: 800 });
  };

  const handleDelete = () => {
    dispatch(asyncdeleteprofile(user.id));
    localStorage.removeItem("user");
    toast.success("User Deleted", { autoClose: 800 });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitAddress = (data) => {
    const updatedList = [...addressList];
    if (editIndex !== null) {
      updatedList[editIndex] = data;
    } else {
      updatedList.push(data);
    }

    const updatedUser = { ...formData, address: updatedList };
    setAddressList(updatedList);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch(asyncupdateprofile(user.id, updatedUser));
    toast.success(editIndex !== null ? "Address Updated" : "Address Added", {
      autoClose: 800,
    });

    reset();
    setEditIndex(null);
    setShowForm(false);
  };

  const handleDeleteAddress = (idx) => {
    const updated = addressList.filter((_, i) => i !== idx);
    setAddressList(updated);
    const updatedUser = { ...user, address: updated };
    dispatch(asyncupdateprofile(user.id, updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Address Deleted", { autoClose: 800 });
  };

  const handleEditAddress = (idx) => {
    setEditIndex(idx);
    const editAddress = addressList[idx];
    for (let key in editAddress) {
      setValue(key, editAddress[key]);
    }
    setShowForm(true);
  };

  const resetForm = () => {
    reset();
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F5F5F5] py-10 px-4 md:px-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-xl overflow-hidden bg-white">
        {/* Left Panel */}
        <div className="md:w-[25%] bg-[#D7CCC8] px-6 py-8 flex flex-col items-center gap-6">
          <label htmlFor="imgUpload" className="cursor-pointer relative group text-center">
            <img
              src={profileImg}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              alt="profile"
            />
            <input
              id="imgUpload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <span className="text-sm text-[#6D4C41] underline mt-2 block">Change</span>
          </label>
          <button
            onClick={() => setCurrentTab("personal")}
            className={`w-full py-2 rounded-lg font-semibold ${
              currentTab === "personal"
                ? "bg-[#6D4C41] text-white"
                : "text-[#6D4C41] bg-[#F5F5F5]"
            }`}
          >
            Personal Settings
          </button>
          <button
            onClick={() => setCurrentTab("address")}
            className={`w-full py-2 rounded-lg font-semibold ${
              currentTab === "address"
                ? "bg-[#6D4C41] text-white"
                : "text-[#6D4C41] bg-[#F5F5F5]"
            }`}
          >
            Address
          </button>
        </div>

        {/* Right Panel */}
        <div className="md:w-[75%] p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#6D4C41] mb-2">
            {currentTab === "personal" ? "Personal Settings" : "Manage Addresses"}
          </h2>

          {/* PERSONAL SETTINGS */}
          {currentTab === "personal" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["fname", "lname", "username", "email_id", "password"].map((field) => (
                  <div key={field}>
                    <p className="text-[#6D4C41] font-semibold capitalize">
                      {field.replace("_", " ")}:
                    </p>
                    {isEditing ? (
                      <input
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full border-b-2 outline-none p-1 text-[#6D4C41] bg-transparent"
                      />
                    ) : (
                      <p className="border-b text-[#6D4C41] p-1">{user[field]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-[#6D4C41] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#8D6E63]"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-500"
                    >
                      Delete Profile
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSave}
                    className="bg-[#A1887F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#8D6E63]"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </>
          )}

          {/* ADDRESS SETTINGS */}
          {currentTab === "address" && (
            <>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="text-[#6D4C41] font-semibold flex gap-2 items-center"
              >
                <span className="text-xl">＋</span> ADD A NEW ADDRESS
              </button>

             {showForm && (
  <form
    onSubmit={handleSubmit(onSubmitAddress)}
    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F5F5] p-4 rounded-lg"
  >
    {/* Name */}
    <div className="flex flex-col">
      <input
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
        className="border p-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>

    {/* Phone */}
    <div className="flex flex-col">
      <input
        placeholder="10-digit mobile number"
        {...register("phone", {
          required: "Phone is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone must be 10 digits",
          },
        })}
        className="border p-2 rounded"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
      )}
    </div>

    {/* Pincode */}
    <div className="flex flex-col">
      <input
        placeholder="Pincode"
        {...register("pincode", { required: "Pincode is required" })}
        className="border p-2 rounded"
      />
      {errors.pincode && (
        <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
      )}
    </div>

    {/* Locality (optional) */}
    <div>
      <input
        placeholder="Locality"
        {...register("locality")}
        className="border p-2 rounded"
      />
    </div>

    {/* Address */}
    <div className="flex flex-col md:col-span-2">
      <input
        placeholder="Address (Area and Street)"
        {...register("address", { required: "Address is required" })}
        className="border p-2 rounded"
      />
      {errors.address && (
        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
      )}
    </div>

    {/* City */}
    <div className="flex flex-col">
      <input
        placeholder="City"
        {...register("city", { required: "City is required" })}
        className="border p-2 rounded"
      />
      {errors.city && (
        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
      )}
    </div>

    {/* State */}
    <div className="flex flex-col">
      <input
        placeholder="State"
        {...register("state", { required: "State is required" })}
        className="border p-2 rounded"
      />
      {errors.state && (
        <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
      )}
    </div>

    {/* Landmark (optional) */}
    <div>
      <input
        placeholder="Landmark (Optional)"
        {...register("landmark")}
        className="border p-2 rounded"
      />
    </div>

    {/* Alternate Phone (optional) */}
    <div>
      <input
        placeholder="Alternate Phone (Optional)"
        {...register("altPhone")}
        className="border p-2 rounded"
      />
    </div>

    {/* Address Type */}
    <div className="flex items-center gap-4 mt-2 col-span-2">
      <label>Address Type:</label>
      <label>
        <input
          type="radio"
          value="Home"
          {...register("type")}
          defaultChecked
        />{" "}
        Home
      </label>
      <label>
        <input type="radio" value="Work" {...register("type")} /> Work
      </label>
    </div>

    {/* Action Buttons */}
    <div className="col-span-2 flex gap-4 mt-4">
      <button
        type="submit"
        className="bg-[#6D4C41] text-white px-6 py-2 rounded-md hover:bg-[#8D6E63]"
      >
        Save
      </button>
      <button
        type="button"
        onClick={resetForm}
        className="border border-[#6D4C41] text-[#6D4C41] px-6 py-2 rounded-md hover:bg-[#EFEAE7]"
      >
        Cancel
      </button>
    </div>
  </form>
)}


              {/* Address Cards */}
              {addressList.map((addr, idx) => (
                <div key={idx} className="p-4 bg-[#FAFAFA] rounded shadow flex justify-between items-start mt-2">
                  <div className="text-[#6D4C41] font-medium">
                    <p>{addr.name} <span className="font-normal">{addr.phone}</span></p>
                    <p>{addr.address}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAddress(idx)}
                      className="text-sm px-3 py-1 bg-[#A1887F] text-white rounded hover:bg-[#8D6E63]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(idx)}
                      className="text-sm px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
