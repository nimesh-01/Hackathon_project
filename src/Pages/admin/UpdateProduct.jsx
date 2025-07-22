import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    asyncdeleteproduct,
    asyncupdateproduct,
} from "../../Store/action/Productaction";
import {
    asyncupdateprofile,
    cleanDeletedProductsFromAllCarts,
} from "../../Store/action/Useraction";
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.productreducer);
    const users = useSelector((state) => state.userreducer.users);
    const product = products?.find((p) => p.id === id);

    // ✅ FIXED: Handle both array and string
    const [imageList, setImageList] = useState(
        Array.isArray(product?.image) ? product.image : product?.image ? [product.image] : []
    );
    const [singleImage, setSingleImage] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: product?.title || "",
            type: product?.type || "",
            category: product?.category || "",
            price: product?.price || "",
            description: product?.description || "",
        },
    });

    console.log(product);
    const onSubmit = (data) => {
        
        const updatedProduct = {
            ...product,
            ...data,
            image: imageList,
        };

        dispatch(asyncupdateproduct(id, updatedProduct));
        toast.success("Product Updated", { autoClose: 1000 });
        navigate(`/product/${product.id}`);
    };

    const handleDelete = async () => {
        const updatedCart = {
            ...users,
            cart: (users.cart || []).filter((item) => item.productId !== id),
        };

        await dispatch(asyncupdateprofile(users.id, updatedCart));
        await dispatch(asyncdeleteproduct(id));
        cleanDeletedProductsFromAllCarts();
        toast.success("Product Deleted", { autoClose: 1000 });
        navigate("/products");
    };

    const addImage = () => {
        if (singleImage.trim()) {
            setImageList((prev) => [...prev, singleImage.trim()]);
            setSingleImage("");
        }
    };

    const removeImage = (index) => {
        setImageList((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-[#F5F5F5] min-h-screen px-4 py-8 flex justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-xl shadow-md w-full h-full max-w-6xl p-6 md:p-10 flex flex-col gap-6"
            >
                <h1 className="text-3xl font-bold text-[#4E342E] mb-2">Update Product</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        {/* Title */}
                        <div>
                            <label className="block font-semibold text-[#6D4C41] mb-1">Title</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                type="text"
                                className="w-full p-2 border border-[#A1887F] rounded"
                                placeholder="Product title"
                            />
                            <small className="text-red-500">{errors?.title?.message}</small>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block font-semibold text-[#6D4C41] mb-1 ">Type</label>
                            <select
                                {...register("type", { required: "Type is required" })}
                                className="w-full p-2 border border-[#A1887F] rounded bg-[#A1887F]"
                            >
                                <option value="mens">Mens</option>
                                <option value="womens">Womens</option>
                                <option value="kids">Kids</option>
                            </select>
                            <small className="text-red-500">{errors?.type?.message}</small>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block font-semibold text-[#6D4C41] mb-1 ">Category</label>
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full p-2 border border-[#A1887F] rounded bg-[#A1887F]"
                            >   
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="other">Other</option>
                            </select>
                            <small className="text-red-500">{errors?.category?.message}</small>
                        </div>
                        {/* Price */}
                        <div>
                            <label className="block font-semibold text-[#6D4C41] mb-1">Price</label>
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
                            <label className="block font-semibold text-[#6D4C41] mb-1">Description</label>
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
                            <label className="block font-semibold text-[#6D4C41] mb-1">Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={singleImage}
                                    onChange={(e) => setSingleImage(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1 p-2 border border-[#A1887F] rounded"
                                />
                                <button
                                    type="button"
                                    onClick={addImage}
                                    className="bg-[#6D4C41] text-white px-4 py-1 rounded hover:bg-[#5D4037]"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {imageList.map((url, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        src={`../..${url.startsWith(".") ? url.substring(1) : url}`}
                                        className="h-20 w-full object-cover border rounded"
                                        alt={`preview-${i}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-0 right-0 bg-[#6D4C41] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:opacity-100 opacity-0 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
                    <div className="flex gap-2 items-start">
                        <input type="checkbox" required />
                        <p className="text-sm text-[#6D4C41]">
                            I confirm that all product information is accurate.
                        </p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            type="submit"
                            className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-2 rounded w-full md:w-auto"
                        >
                            Update Product
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-[#EF5350] hover:bg-[#C62828] text-white px-6 py-2 rounded w-full md:w-auto"
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
