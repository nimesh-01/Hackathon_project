import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynccurrentuser } from './Store/action/Useraction';
import { asyncloadproduct, asyncupdateproduct } from './Store/action/Productaction';
import Mainroutes from './routes/Mainroutes';
import Nav from './components/Nav';
import ScrollToggleButton from "./Pages/Others/ScrollToggleButton";
import EyeIntro from "./Pages/Others/EyeIntro";
import Login from './Pages/IN_OUT/Login';
import Register from './Pages/IN_OUT/Register';

const App = () => {
    if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify([
    {
      "id": "1",
      "title": "Mens Hooded Sweatshirt",
      "type": "mens",
      "category": "top",
      "price": "766",
      "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
      "image": ["./assets/Menswear/Hoddie/img1.webp", "./assets/Menswear/Hoddie/img2.webp", "./assets/Menswear/Hoddie/img3.webp"],
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
      "price": "725",
      "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
      "image": ["./assets/Menswear/Trouser1/img1.webp", "./assets/Menswear/Trouser1/img2.webp", "./assets/Menswear/Trouser1/img3.webp"],
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
      "price": "322",
      "description": "Made from eco-friendly materials. Perfect for gifting as well.",
      "image": ["./assets/Kidswear/Polo t-shirt/img1.webp", "./assets/Kidswear/Polo t-shirt/img2.webp"],
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
      "price": "357",
      "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
      "image": ["./assets/Kidswear/Kids Tank Top/img1.webp", "/assets/Kidswear/Kids Tank Top/img2.webp"],
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
      "price": "1129",
      "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
      "image": ["./assets/Kidswear/Sweater/img1.webp"],
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
      "image": ["./assets/Kidswear/Hoddie/img1.webp", "./assets/Kidswear/Hoddie/img2.webp", "./assets/Kidswear/Hoddie/img3.webp"],
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
      "image": ["./assets/Womenswear/Jeans1/img1.webp", "./assets/Womenswear/Jeans1/img2.webp", "./assets/Womenswear/Jeans1/img3.webp"],
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
      "price": "316",
      "description": "Ideal for casual wear with excellent quality and finish.",
      "image": ["./assets/Womenswear/Leggings/img1.webp", "./assets/Womenswear/Leggings/img2.webp", "./assets/Womenswear/Leggings/img3.webp"],
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
      "image": ["./assets/Kidswear/Cartoon-tshirt/img1.webp", "./assets/Kidswear/Cartoon-tshirt/img2.webp"],
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
      "price": "463",
      "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
      "image": ["./assets/Womenswear/Skirt1/img1.webp", "./assets/Womenswear/Skirt1/img1.webp"],
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
      "price": "850",
      "description": "Ideal for casual wear with excellent quality and finish.",
      "image": ["./assets/Menswear/Sweatshirt1/Sweatshirt.webp", "./assets/Menswear/Sweatshirt1/Sweatshirt1.webp", "./assets/Menswear/Sweatshirt1/Sweatshirt2.webp"],
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
      "price": "355",
      "description": "Classic look with modern appeal. Great for everyday use.",
      "image": ["./assets/Womenswear/Top1/img1.webp", "./assets/Womenswear/Top1/img2.webp"],
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
      "price": "151",
      "description": "Classic look with modern appeal. Great for everyday use.",
      "image": ["./assets/Kidswear/Short/img.webp"],
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
      "price": "314",
      "description": "Made from eco-friendly materials. Perfect for gifting as well.",
      "image": ["./assets/Caps/Cap2/img.webp", "./assets/Caps/Cap2/img2.webp"],
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
      "price": "216",
      "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
      "image": ["./assets/Womenswear/Leggings/img1.webp", "./assets/Womenswear/Leggings/img2.webp", "./assets/Womenswear/Leggings/img3.webp"],
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
  "price": "393",
  "description": "Ideal for casual wear with excellent quality and finish.",
  "image": ["./assets/Womenswear/Plazzo1/img1.webp", "./assets/Womenswear/Plazzo1/img2.webp"],
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
  "price": "317",
  "description": "Ideal for casual wear with excellent quality and finish.",
  "image": ["./assets/Caps/Cap1/img1.webp"],
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
  "price": "216",
  "description": "Ideal for casual wear with excellent quality and finish.",
  "image": ["./assets/Womenswear/Skirt2/img1.webp", "./assets/Womenswear/Skirt2/img2.webp", "./assets/Womenswear/Skirt2/img3.webp"],
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
  "image": ["./assets/Menswear/V-neck t/img1.webp", "./assets/Menswear/V-neck t/img2.webp"],
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
  "price": "366",
  "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
  "image": ["./assets/Womenswear/Top2/img1.webp", "./assets/Womenswear/Top2/img2.webp"],
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
  "image": ["./assets/Menswear/Joggers1/img1.webp", "./assets/Menswear/Joggers1/img2.webp", "./assets/Menswear/Joggers1/img3.webp"],
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
  "price": "390",
  "description": "Classic look with modern appeal. Great for everyday use.",
  "image": ["./assets/Menswear/Sweatshirt2/img1.webp", "./assets/Menswear/Sweatshirt2/img2.webp", "./assets/Menswear/Sweatshirt2/img3webp"],
  "rating": {
    "rate": 4.2,
    "count": 143
  }
},
{
  "id": "28",
  "title": "Kids Hoodie",
  "type": "kids",
  "category": "top",
  "price": "485",
  "description": "Made from eco-friendly materials. Perfect for gifting as well.",
  "image": ["./assets/Kidswear/Hoddie2/img1.webp", "./assets/Kidswear/Hoddie2/img2.webp"],
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
  "price": "306",
  "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
  "image": ["./assets/Womenswear/Top3/img1.webp", "./assets/Womenswear/Top3/img2.webp", "./assets/Womenswear/Top3/img3.webp"],
  "rating": {
    "rate": 4.5,
    "count": 452
  }
},
{
  "id": "30",
  "title": "Kids T-Shirt",
  "type": "kids",
  "category": "top",
  "price": "463",
  "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
  "image": ["./assets/Kidswear/T-shirt/img1.webp", "./assets/Kidswear/T-shirt/img2.webp"],
  "rating": {
    "rate": 4.7,
    "count": 407
  }
},
{
  "id": "31",
  "title": "Womens trouser",
  "type": "womens",
  "category": "bottom",
  "price": "395",
  "description": "Ideal for casual wear with excellent quality and finish.",
  "image": ["./assets/Womenswear/Trouser/img1.webp", "./assets/Womenswear/Trouser/img2.webp", "./assets/Womenswear/Trouser/img3.webp"],
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
  "price": "347",
  "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
  "image": ["./assets/Womenswear/Plazzo2/img1.webp", "./assets/Womenswear/Plazzo2/img2.webp", "./assets/Womenswear/Plazzo2/img3.webp"],
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
  "price": "433",
  "description": "Classic look with modern appeal. Great for everyday use.",
  "image": ["./assets/Womenswear/Plazzo3/img1.webp", "./assets/Womenswear/Plazzo3/img2.webp"],
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
  "price": "709",
  "description": "Made from eco-friendly materials. Perfect for gifting as well.",
  "image": ["./assets/Menswear/Short1/img1.webp", "./assets/Menswear/Short1/img2.webp", "./assets/Menswear/Short1/img3.webp"],
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
  "price": "901",
  "description": "Made from eco-friendly materials. Perfect for gifting as well.",
  "image": ["./assets/Womenswear/Top4/img1.webp", "./assets/Womenswear/Top4/img2.webp"],
  "rating": {
    "rate": 4.4,
    "count": 247
  }
},
{
  "id": "37",
  "title": "Womens Crop Top",
  "type": "womens",
  "category": "top",
  "price": "509",
  "description": "Ideal for casual wear with excellent quality and finish.",
  "image": ["./assets/Womenswear/Top5/img1.webp", "./assets/Womenswear/Top5/img2.webp", "./assets/Womenswear/Top5/img3.webp"],
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
  "price": "600",
  "description": "Soft fabric for breathable comfort. Durable stitching and perfect fit.",
  "image": ["./assets/Womenswear/Plazzo4/img1.webp", "./assets/Womenswear/Plazzo4/img2.webp", "./assets/Womenswear/Plazzo4/img3.webp"],
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
  "price": "431",
  "description": "Trendy design suitable for all seasons. Lightweight and easy to maintain.",
  "image": ["./assets/Menswear/Trouser2/img1.webp", "./assets/Menswear/Trouser2/img2.webp", "./assets/Menswear/Trouser2/img3.webp"],
  "rating": {
    "rate": 4.7,
    "count": 464
  }
},
  ]));
}
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([{
      "id": "aJTwaStvW1Ae4_errOmZn",
      "fname": "Nimesh",
      "lname": "solanki",
      "username": "nimesh01",
      "email_id": "nimesh01@gmail.com",
      "password": "111111",
      "isadmin": true,
      "image": "./assets/Profile_img/nimesh_profileimg.jpg",
      "cart": []
    },
    {
      "id": "wEtsulqwdbCYtWRuJV7ae",
      "fname": "Harsh",
      "lname": "Sharma",
      "username": "Harsh_sharma",
      "email_id": "sheryians@gmail.com",
      "password": "123456",
      "isadmin": false,
      "image": "./assets/Profile_img/Sheryians.png",
      "cart": []
    }
    ])); // or default user array
  }
  const dispatch = useDispatch();

  const [showMain, setShowMain] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    dispatch(asyncloadproduct());
    dispatch(asynccurrentuser());
    dispatch(asyncupdateproduct());
  }, []);

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <main className="min-h-screen w-[100vw] flex items-center justify-center">
      {!showMain && <EyeIntro onComplete={() => setShowMain(true)} />}

      {showMain && (
        <div className="text-[] font-thin min-w-[100%] relative">
          <Nav openLogin={() => setShowLogin(true)} />
          <Mainroutes
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showRegister={showRegister}
            setShowRegister={setShowRegister}
          />
          <ScrollToggleButton />

          {(showLogin || showRegister) && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
              <div className="absolute inset-0" onClick={closeModal}></div>
              <div className="relative z-50 max-h-[90vh] max-w-[90vw] overflow-y-auto">
                {showLogin && (
                  <Login
                    onClose={closeModal}
                    switchToRegister={() => {
                      setShowLogin(false);
                      setShowRegister(true);
                    }}
                  />
                )}
                {showRegister && (
                  <Register
                    onClose={closeModal}
                    switchToLogin={() => {
                      setShowRegister(false);
                      setShowLogin(true);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default App;
