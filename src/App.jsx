import React from 'react'
import { useEffect } from 'react'
import axios from "./api/Axiosconfig"
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './routes/Mainroutes';
import Nav from './components/Nav';
import { asynccurrentuser } from './Store/action/Useraction';
import { asyncloadproduct, asyncupdateproduct } from './Store/action/Productaction';
import { useState } from 'react';
// import EyeEffect from './Pages/EyeEffect';
import EyeIntro from "./Pages/EyeIntro";
import { div } from 'framer-motion/client';
const App = () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify([
      {
        "id": "1",
        "title": "Mens Hooded Sweatshirt",
        "type": "mens",
        "category": "top",
        "price": "4166",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": ["./src/assets/Mens Wear/Hoddie/img1.webp", "./src/assets/Mens Wear/Hoddie/img2.webp", "./src/assets/Mens Wear/Hoddie/Sweatshirt2.webp"],
        "rating": {
          "rate": 3.6,
          "count": 80
        }
      },
      {
        "id": "2",
        "title": "Mens Slim Fit Trousers",
        "type": "mens",
        "category": "bottom",
        "price": "2157",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": ["./src/assets/Mens Wear/Trouser1/img1.webp", "./src/assets/Mens Wear/Trouser1/img2.webp", "./src/assets/Mens Wear/Trouser1/img3.webp"],
        "rating": {
          "rate": 3.9,
          "count": 136
        }
      },
      {
        "id": "4",
        "title": "Kids Polo Shirt",
        "type": "kids",
        "category": "top",
        "price": "3422",
        "description": "Made from eco-friendly materials. Perfect for gifting as well.",
        "image": ["./src/assets/Kids Wear/Polo t-shirt/img1.webp", "./src/assets/Kids Wear/Polo t-shirt/img2.webp"],
        "rating": {
          "rate": 4.8,
          "count": 150
        }
      },
      {
        "id": "5",
        "title": "Kids Tank Top",
        "type": "kids",
        "category": "top",
        "price": "3157",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Tank+Top",
        "rating": {
          "rate": 4.4,
          "count": 255
        }
      },
      {
        "id": "7",
        "title": "Kids Sweater",
        "type": "kids",
        "category": "top",
        "price": "1529",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Sweater",
        "rating": {
          "rate": 3.7,
          "count": 395
        }
      },
      {
        "id": "8",
        "title": "Kids Hoodie",
        "type": "kids",
        "category": "top",
        "price": "724",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Hoodie",
        "rating": {
          "rate": 3.9,
          "count": 219
        }
      },
      {
        "id": "9",
        "title": "Womens High-Waisted Jeans",
        "type": "womens",
        "category": "bottom",
        "price": "426",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=High-Waisted+Jeans",
        "rating": {
          "rate": 4.3,
          "count": 191
        }
      },
      {
        "id": "10",
        "title": "Womens Leggings",
        "type": "womens",
        "category": "bottom",
        "price": "3316",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Leggings",
        "rating": {
          "rate": 4.2,
          "count": 296
        }
      },
      {
        "id": "13",
        "title": "Kids Cartoon T-Shirt",
        "type": "kids",
        "category": "top",
        "price": "565",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Cartoon+T-Shirt",
        "rating": {
          "rate": 4.7,
          "count": 437
        }
      },
      {
        "id": "14",
        "title": "Womens Mini Skirt",
        "type": "womens",
        "category": "bottom",
        "price": "4863",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Mini+Skirt",
        "rating": {
          "rate": 4.4,
          "count": 194
        }
      },
      {
        "id": "15",
        "title": "Mens Hooded Sweatshirt",
        "type": "mens",
        "category": "top",
        "price": "3350",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": ["./src/assets/Mens Wear/Sweatshirt1/Sweatshirt.webp", "./src/assets/Mens Wear/Sweatshirt1/Sweatshirt1.webp", "./src/assets/Mens Wear/Sweatshirt1/Sweatshirt2.webp"],
        "rating": {
          "rate": 3.5,
          "count": 217
        }
      },
      {
        "id": "16",
        "title": "Womens Off-Shoulder Top",
        "type": "womens",
        "category": "top",
        "price": "2065",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Off-Shoulder+Top",
        "rating": {
          "rate": 4.0,
          "count": 226
        }
      },
      {
        "id": "17",
        "title": "Kids Shorts",
        "type": "kids",
        "category": "bottom",
        "price": "1561",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Shorts",
        "rating": {
          "rate": 3.6,
          "count": 497
        }
      },
      {
        "id": "18",
        "title": "Mens Snapback Cap",
        "type": "mens",
        "category": "hat",
        "price": "3934",
        "description": "Made from eco-friendly materials. Perfect for gifting as well.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Snapback+Cap",
        "rating": {
          "rate": 5.0,
          "count": 457
        }
      },
      {
        "id": "19",
        "title": "Womens Leggings",
        "type": "womens",
        "category": "bottom",
        "price": "2146",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Leggings",
        "rating": {
          "rate": 4.8,
          "count": 373
        }
      },
      {
        "id": "20",
        "title": "Womens Palazzo Pants",
        "type": "womens",
        "category": "bottom",
        "price": "3693",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Palazzo+Pants",
        "rating": {
          "rate": 4.2,
          "count": 474
        }
      },
      {
        "id": "21",
        "title": "Mens Baseball Cap",
        "type": "mens",
        "category": "hat",
        "price": "3717",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Baseball+Cap",
        "rating": {
          "rate": 3.6,
          "count": 282
        }
      },
      {
        "id": "22",
        "title": "Womens Pleated Skirt",
        "type": "womens",
        "category": "bottom",
        "price": "2166",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Pleated+Skirt",
        "rating": {
          "rate": 3.9,
          "count": 228
        }
      },
      {
        "id": "23",
        "title": "Mens V-Neck Tee",
        "type": "mens",
        "category": "top",
        "price": "385",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=V-Neck+Tee",
        "rating": {
          "rate": 4.1,
          "count": 319
        }
      },
      {
        "id": "24",
        "title": "Womens Crop Top",
        "type": "womens",
        "category": "top",
        "price": "3662",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Crop+Top",
        "rating": {
          "rate": 4.6,
          "count": 71
        }
      },
      {
        "id": "25",
        "title": "Mens Jogger Pants",
        "type": "mens",
        "category": "bottom",
        "price": "467",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Jogger+Pants",
        "rating": {
          "rate": 4.3,
          "count": 240
        }
      },
      {
        "id": "26",
        "title": "Mens Hooded Sweatshirt",
        "type": "mens",
        "category": "top",
        "price": "3510",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Hooded+Sweatshirt",
        "rating": {
          "rate": 4.2,
          "count": 143
        }
      },
      {
        "id": "27",
        "title": "Womens Silk Blouse",
        "type": "womens",
        "category": "top",
        "price": "3580",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Silk+Blouse",
        "rating": {
          "rate": 3.7,
          "count": 237
        }
      },
      {
        "id": "28",
        "title": "Kids Hoodie",
        "type": "kids",
        "category": "top",
        "price": "4585",
        "description": "Made from eco-friendly materials. Perfect for gifting as well.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Hoodie",
        "rating": {
          "rate": 3.7,
          "count": 118
        }
      },
      {
        "id": "29",
        "title": "Womens Off-Shoulder Top",
        "type": "womens",
        "category": "top",
        "price": "3076",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Off-Shoulder+Top",
        "rating": {
          "rate": 4.5,
          "count": 452
        }
      },
      {
        "id": "30",
        "title": "Kids Cartoon T-Shirt",
        "type": "kids",
        "category": "top",
        "price": "4693",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Cartoon+T-Shirt",
        "rating": {
          "rate": 4.7,
          "count": 407
        }
      },
      {
        "id": "31",
        "title": "Womens Leggings",
        "type": "womens",
        "category": "bottom",
        "price": "3905",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Leggings",
        "rating": {
          "rate": 3.6,
          "count": 147
        }
      },
      {
        "id": "32",
        "title": "Womens Palazzo Pants",
        "type": "womens",
        "category": "bottom",
        "price": "3447",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Palazzo+Pants",
        "rating": {
          "rate": 3.9,
          "count": 368
        }
      },
      {
        "id": "33",
        "title": "Womens Palazzo Pants",
        "type": "womens",
        "category": "bottom",
        "price": "2433",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Palazzo+Pants",
        "rating": {
          "rate": 3.5,
          "count": 278
        }
      },
      {
        "id": "34",
        "title": "Mens Cargo Shorts",
        "type": "mens",
        "category": "bottom",
        "price": "3109",
        "description": "Made from eco-friendly materials. Perfect for gifting as well.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Cargo+Shorts",
        "rating": {
          "rate": 4.9,
          "count": 244
        }
      },
      {
        "id": "35",
        "title": "Womens Tank Top",
        "type": "womens",
        "category": "top",
        "price": "1901",
        "description": "Made from eco-friendly materials. Perfect for gifting as well.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Tank+Top",
        "rating": {
          "rate": 4.4,
          "count": 247
        }
      },
      {
        "id": "36",
        "title": "Kids Tank Top",
        "type": "kids",
        "category": "top",
        "price": "680",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Tank+Top",
        "rating": {
          "rate": 4.8,
          "count": 295
        }
      },
      {
        "id": "37",
        "title": "Womens Crop Top",
        "type": "womens",
        "category": "top",
        "price": "3909",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Crop+Top",
        "rating": {
          "rate": 4.4,
          "count": 176
        }
      },
      {
        "id": "38",
        "title": "Womens Palazzo Pants",
        "type": "womens",
        "category": "bottom",
        "price": "990",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Palazzo+Pants",
        "rating": {
          "rate": 3.8,
          "count": 455
        }
      },
      {
        "id": "39",
        "title": "Mens Slim Fit Trousers",
        "type": "mens",
        "category": "bottom",
        "price": "4831",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Slim+Fit+Trousers",
        "rating": {
          "rate": 4.7,
          "count": 464
        }
      },
      {
        "id": "40",
        "title": "Kids Overalls",
        "type": "kids",
        "category": "bottom",
        "price": "4965",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Overalls",
        "rating": {
          "rate": 3.8,
          "count": 449
        }
      },
      {
        "id": "41",
        "title": "Kids Hoodie",
        "type": "kids",
        "category": "top",
        "price": "1217",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Hoodie",
        "rating": {
          "rate": 4.9,
          "count": 182
        }
      },
      {
        "id": "42",
        "title": "Womens Peplum Top",
        "type": "womens",
        "category": "top",
        "price": "522",
        "description": "Made from eco-friendly materials. Perfect for gifting as well.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Peplum+Top",
        "rating": {
          "rate": 4.8,
          "count": 436
        }
      },
      {
        "id": "43",
        "title": "Womens Palazzo Pants",
        "type": "womens",
        "category": "bottom",
        "price": "2154",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Palazzo+Pants",
        "rating": {
          "rate": 4.9,
          "count": 414
        }
      },
      {
        "id": "44",
        "title": "Womens Mini Skirt",
        "type": "womens",
        "category": "bottom",
        "price": "2955",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Mini+Skirt",
        "rating": {
          "rate": 4.9,
          "count": 386
        }
      },
      {
        "id": "45",
        "title": "Womens Palazzo Pants",
        "type": "womens",
        "category": "bottom",
        "price": "1979",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Palazzo+Pants",
        "rating": {
          "rate": 4.8,
          "count": 205
        }
      },
      {
        "id": "46",
        "title": "Womens Leggings",
        "type": "womens",
        "category": "bottom",
        "price": "2601",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Leggings",
        "rating": {
          "rate": 4.4,
          "count": 366
        }
      },
      {
        "id": "47",
        "title": "Mens V-Neck Tee",
        "type": "mens",
        "category": "top",
        "price": "1004",
        "description": "Ideal for casual wear with excellent quality and finish.",
        "image": "https://dummyimage.com/300x400/000/fff&text=V-Neck+Tee",
        "rating": {
          "rate": 3.9,
          "count": 251
        }
      },
      {
        "id": "48",
        "title": "Mens Fedora Hat",
        "type": "mens",
        "category": "hat",
        "price": "570",
        "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Fedora+Hat",
        "rating": {
          "rate": 4.5,
          "count": 136
        }
      },
      {
        "id": "49",
        "title": "Mens Bucket Hat",
        "type": "mens",
        "category": "hat",
        "price": "3397",
        "description": "Classic look with modern appeal. Great for everyday use.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Bucket+Hat",
        "rating": {
          "rate": 4.2,
          "count": 129
        }
      },
      {
        "id": "50",
        "title": "Mens Hooded Sweatshirt",
        "type": "mens",
        "category": "top",
        "price": "4429",
        "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
        "image": "https://dummyimage.com/300x400/000/fff&text=Hooded+Sweatshirt",
        "rating": {
          "rate": 3.8,
          "count": 129
        }
      }
    ])); // or default product array
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([{
      "id": "aJTwaStvW1Ae4_errOmZn",
      "fname": "Nimesh",
      "lname": "solanki",
      "username": "nimesh0101",
      "email_id": "nimeshsolanki8269@gmail.com",
      "password": "111111",
      "isadmin": true,
      "cart": [
      ]
    },
    {
      "id": "wEtsulqwdbCYtWRuJV7ae",
      "fname": "Ronak",
      "lname": "gurjar",
      "username": "rounak01",
      "email_id": "r1@gmail.com",
      "password": "121212",
      "isadmin": false,
      "cart": []
    }
    ])); // or default user array
  }
  const dispatch = useDispatch();
  const data = useSelector((state) => state)
  useEffect(() => {
    dispatch(asyncloadproduct())
    dispatch(asynccurrentuser())
    dispatch(asyncupdateproduct())

  }, [])
  const [showMain, setShowMain] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center ">
      {!showMain && <EyeIntro onComplete={() => { console.log("Animation done"); setShowMain(true) }} />}

      {showMain && (
        <div className="text-white font-thin min-w-[90%] bg-[#293241]">
          <Nav />
          <Mainroutes />
        </div>
      )}
    </main>
  )
}

export default App