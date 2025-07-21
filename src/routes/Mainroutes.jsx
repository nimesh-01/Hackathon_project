import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = lazy(() => import("../Pages/Home"));
const FashionHome = lazy(() => import("../Pages/FashionHome"));
const Products = lazy(() => import("../Pages/Products"));

const Mens = lazy(() => import("../Pages/Products_type/Mens"));
const Womens = lazy(() => import("../Pages/Products_type/Womens"));
const Kids = lazy(() => import("../Pages/Products_type/Kids"));

const UpdateProduct = lazy(() => import('../Pages/admin/UpdateProduct'));
const CreateProduct = lazy(() => import('../Pages/admin/CreateProduct'));
const Productdetail = lazy(() => import('../Pages/Productdetail'));
const Profile = lazy(() => import('../Pages/user/Profile'));
const UpdateProfile = lazy(() => import('../Pages/user/UpdateProfile'));
const Pagenotfound = lazy(() => import('../Pagenotfound'));
const Authwrapper = lazy(() => import('./Authwrapper'));
const Cart = lazy(() => import('../Pages/Cart'));

const Mainroutes = ({ showLogin, setShowLogin, showRegister, setShowRegister }) => {
  const user = useSelector((state) => state.userreducer);
  console.log(user);

  return (
    <Routes>
      <Route path='/' element={<FashionHome
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      />} />

      <Route path='/products' element={<Products />} />
      <Route path='/products/mens-wear' element={<Mens />} />
      <Route path='/products/womens-wear' element={<Womens />} />
      <Route path='/products/kids-wear' element={<Kids />} />


      <Route path='/product/:id' element={<Productdetail />} />

      {/* Admin Routes */}
      <Route path='/admin/create-product' element={<Authwrapper><CreateProduct /></Authwrapper>} />
      <Route path='/admin/update-product/:id' element={<Authwrapper><UpdateProduct /></Authwrapper>} />

      {/* User Routes */}
      <Route path='/user-profile' element={<Authwrapper><Profile /></Authwrapper>}>
        <Route path='update-profile/:id' element={<Authwrapper><UpdateProfile /></Authwrapper>} />
      </Route>
      <Route path='/cart' element={<Authwrapper><Cart /></Authwrapper>} />

      {/* Fallback */}
      <Route path='*' element={<Pagenotfound />} />
    </Routes>
  );
};

export default Mainroutes;
