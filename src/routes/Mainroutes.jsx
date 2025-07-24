import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FashionHome = lazy(() => import("../Pages/Home/FashionHome"));
const Products = lazy(() => import("../Pages/Products/Products"));

const Mens = lazy(() => import("../Pages/Products_type/Mens"));
const Womens = lazy(() => import("../Pages/Products_type/Womens"));
const Kids = lazy(() => import("../Pages/Products_type/Kids"));

const UpdateProduct = lazy(() => import('../Pages/admin/UpdateProduct'));
const CreateProduct = lazy(() => import('../Pages/admin/CreateProduct'));
const Productdetail = lazy(() => import('../Pages/Products/Productdetail'));

const Profile = lazy(() => import('../Pages/user/Profile'));
const Checkout = lazy(() => import('../Pages/Cart/Checkout'));

const Pagenotfound = lazy(() => import('../Pages/Others/Pagenotfound'));

const PrivacyPolicy = lazy(() => import('../Pages/information_pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../Pages/information_pages/TermsAndConditions '));
const Cart = lazy(() => import('../Pages/Cart/Cart'));
const About = lazy(() => import('../Pages/About/About'));

import Authwrapper from './Authwrapper';

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
      <Route path='/about' element={<About />} />
      <Route path='/product/:id' element={<Productdetail />} />

      {/* Admin Routes */}
      <Route
        path='/admin/create-product'
        element={<Authwrapper requireAdmin={true}><CreateProduct /></Authwrapper>}
      />

      <Route
        path='/admin/update-product/:id'
        element={<Authwrapper requireAdmin={true}><UpdateProduct /></Authwrapper>}
      />

      {/* User Routes */}
      <Route path='/user-profile' element={<Authwrapper><Profile /></Authwrapper>} />
      <Route path='/cart' element={<Authwrapper><Cart /></Authwrapper>} />
      <Route path='/checkout' element={<Authwrapper><Checkout /></Authwrapper>} />

      {/* Privacy Routes */}
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route path='/terms-condition' element={<TermsAndConditions />} />

      {/* Fallback */}
      <Route path='*' element={<Pagenotfound />} />
    </Routes>
  );
};

export default Mainroutes;
