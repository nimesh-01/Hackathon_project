import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { asyncupdateprofile } from '../Store/action/Useraction';

const Productdetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        productreducer: { products },
        userreducer: { users }
    } = useSelector(state => state);

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [hoverImage, setHoverImage] = useState(null);

    // Load product from Redux store
    useEffect(() => {
        if (products && products.length > 0) {
            const found = products.find(p => p.id === id);
            if (!found) {
                navigate('/not-found'); // or navigate('/')
            } else {
                setProduct(found);
                setSelectedImage(found.image[0]);
            }
        }
    }, [products, id, navigate]);

    const getSizeOptions = () => {
        if (!product) return [];
        const { type, category } = product;

        if (type === 'mens' || type === 'womens') {
            if (category === 'top') return ['S', 'M', 'L', 'XL', '2XL'];
            if (category === 'bottom') return ['28', '30', '32', '36', '38', '40'];
        } else if (type === 'kids') {
            if (category === 'top') return ['XS', 'S', 'M', 'L'];
            if (category === 'bottom') return ['24', '26', '28', '30'];
        }

        return ['Free Size'];
    };

    const sizeOptions = getSizeOptions();

    const addtocarthandler = () => {
        if (!users) return;

        if (!selectedSize) {
            toast.error("Please select a size before adding to cart", { autoClose: 800 });
            return;
        }

        toast.success("Product Added", { autoClose: 800 });

        const updatedUser = {
            ...users,
            cart: [...users.cart]
        };

        const index = updatedUser.cart.findIndex(item => item.productId === id && item.size === selectedSize);

        if (index === -1) {
            updatedUser.cart.push({ productId: id, quantity: 1, size: selectedSize });
        } else {
            updatedUser.cart[index].quantity += 1;
        }

        dispatch(asyncupdateprofile(updatedUser.id, updatedUser));
    };

    if (!product) {
        return <p className="text-center text-xl mt-20">Loading product details...</p>;
    }

    return (
        <div className="min-w-full min-h-screen flex justify-center bg-[#F5F5F5]">
            <div className="w-[80%] h-full mt-10 mb-20 flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-xl p-10">

                {/* Left: Image + Thumbnails */}
                <div className="w-full md:w-[50%] flex flex-col items-center gap-4 relative">
                    <div className="relative w-full max-h-[400px] aspect-[4/3]">
                        <img
                            src={`.${selectedImage}`}
                            alt="Selected"
                            className={`rounded-xl w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${hoverImage ? 'opacity-0' : 'opacity-100'}`}
                        />

                        <img
                            src={`.${hoverImage || selectedImage}`}
                            alt="Hovered"
                            className={`rounded-xl w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${hoverImage ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-4">
                        {product.image.map((img, idx) => (
                            <img
                                key={idx}
                                src={`.${img}`}
                                alt={`Thumbnail ${idx}`}
                                onClick={() => setSelectedImage(img)}
                                onMouseEnter={() => setHoverImage(img)}
                                onMouseLeave={() => setHoverImage(null)}
                                className={`h-20 w-20 object-cover rounded-lg border-2 cursor-pointer ${selectedImage === img ? 'border-[#6D4C41]' : 'border-transparent'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="w-full md:w-[50%] flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="md:text-4xl text-3xl font-bold text-[#6D4C41]">{product.title}</h2>
                        <div className="flex items-center gap-2 text-yellow-500 font-semibold">
                            ⭐ {product.rating.rate}
                            <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[#6D4C41]">₹{product.price}</span>
                            <span className="line-through text-gray-400">₹{parseInt(product.price) + 100}</span>
                        </div>

                        <div className="text-[#6D4C41]">
                            <p><span className="font-bold">Type:</span> {product.type}</p>
                            <p><span className="font-bold">Category:</span> {product.category}</p>
                        </div>

                        <p className="text-gray-700"><span className="font-semibold text-lg">About this item:</span><br />{product.description}</p>

                        {/* Size selection */}
                        <div>
                            <p className="font-semibold text-lg text-[#6D4C41] mt-4 mb-2">Select Size:</p>
                            <div className="flex flex-wrap gap-3">
                                {sizeOptions.map((size, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border-2 font-semibold ${selectedSize === size
                                            ? 'bg-[#6D4C41] text-white border-[#6D4C41]'
                                            : 'text-[#6D4C41] border-[#6D4C41] hover:bg-[#D7CCC8]'
                                            } transition`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cart & Admin Buttons */}
                    <div className="flex gap-4 mt-6">
                        {users && (
                            <>
                                <button
                                    onClick={addtocarthandler}
                                    className="bg-[#6D4C41] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#8D6E63] transition"
                                >
                                    Add To Cart
                                </button>
                                <NavLink
                                    to="/cart"
                                    className="bg-[#FFA000] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#FFB300] transition text-center"
                                >
                                    Go to Cart
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Admin-only update product button */}
                    {users?.isadmin && (
                        <Link
                            to={`/admin/update-product/${product.id}`}
                            className="mt-4 text-center px-4 py-2 bg-[#D7CCC8] text-[#6D4C41] rounded-lg font-bold hover:bg-[#BCAAA4] transition"
                        >
                            Update Product
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Productdetail;
