import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [imageUrls, setImageUrls] = useState([]);
  const [singleImage, setSingleImage] = useState("");

  const addImageUrl = () => {
    if (singleImage.trim()) {
      setImageUrls((prev) => [...prev, singleImage.trim()]);
      setSingleImage("");
      clearErrors("imageUrls");
    }
  };

  const removeImage = (index) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    if (updatedImages.length === 0) {
      setError("imageUrls", { message: "At least one image is required" });
    }
  };

  const generateRandomRating = () => ({
    rate: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    count: Math.floor(Math.random() * 900 + 100), // 100 to 999
  });

  const onSubmit = (data) => {
    if (imageUrls.length === 0) {
      setError("imageUrls", { message: "At least one image is required" });
      return;
    }

    const newProduct = {
      id: nanoid(),
      title: data.title,
      type: data.type,
      category: data.category,
      price: data.price,
      description: data.description,
      image: imageUrls,
      rating: generateRandomRating(),
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]));

    toast.success("Product Created!", { autoClose: 1000 });
    reset();
    setImageUrls([]);
    navigate('/products')
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen px-4 py-8 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-md h-full w-full max-w-6xl p-6 md:p-10 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-[#4E342E] mb-2">Upload Product</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-[#6D4C41] mb-1">Title</label>
              <input
                {...register("title", { required: "Product title is required" })}
                type="text"
                className="w-full p-2 border border-[#A1887F] rounded"
                placeholder="Product title"
              />
              <small className="text-red-500">{errors?.title?.message}</small>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-[#6D4C41] mb-1">Type</label>
              <select
                {...register("type", { required: "Type is required" })}
                className="w-full p-2 border border-[#A1887F] rounded outline-none"
              >
                <option disabled selected value="">Select Type</option>
                <option className="bg-[#A1887F]" value="mens">Mens</option>
                <option className="bg-[#A1887F]" value="womens">Womens</option>
                <option className="bg-[#A1887F]" value="kids">Kids</option>
              </select>
              <small className="text-red-500">{errors?.type?.message}</small>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-[#6D4C41] mb-1 ">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-2 border border-[#A1887F] rounded outline-none"
              >
                <option disabled selected value="">Select Category</option>
                <option className="bg-[#A1887F] " value="top">Top</option>
                <option className="bg-[#A1887F] " value="bottom">Bottom</option>
                <option className="bg-[#A1887F] " value="other">Other</option>
              </select>
              <small className="text-red-500">{errors?.category?.message}</small>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-[#6D4C41] mb-1">Price</label>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                className="w-full p-2 border border-[#A1887F] rounded"
                placeholder="₹ Price"
              />
              <small className="text-red-500">{errors?.price?.message}</small>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#6D4C41] mb-1">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={4}
                className="w-full p-2 border border-[#A1887F] rounded resize-none"
                placeholder="Product description..."
              ></textarea>
              <small className="text-red-500">{errors?.description?.message}</small>
            </div>

            {/* Image URLs */}
            <div>
              <label className="block text-sm font-semibold text-[#6D4C41] mb-1">Product Images (URL)</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={singleImage}
                  onChange={(e) => setSingleImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-grow border border-[#D7CCC8] p-2 rounded outline-none"
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="bg-[#A1887F] hover:bg-[#8D6E63] text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              <div className="grid grid-cols-5 gap-3 mt-3">
                {imageUrls.map((url, i) => {
               
                  const previewUrl = `${url}`;
                  return (
                    <div key={i} className="relative">
                      <img src={previewUrl} alt="preview" className="w-full h-15 object-cover rounded-md border" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-1 -right-1 bg-[#6D4C41] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Error for imageUrls */}
              <small className="text-red-500">{errors?.imageUrls?.message}</small>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2 items-start">
            <input type="checkbox" required />
            <p className="text-sm text-[#6D4C41]">
              I have read and accept the terms and conditions and the personal data processing policy.
            </p>
          </div>

          <button
            type="submit"
            className="bg-[#6D4C41] hover:bg-[#8D6E63] text-white py-2 px-6 rounded-md font-semibold w-full md:w-auto"
          >
            Upload Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
