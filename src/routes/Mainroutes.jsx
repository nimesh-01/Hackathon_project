import React, { lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Home = lazy(() => import("../Pages/Home"))
const FashionHome = lazy(() => import("../Pages/FashionHome"))

const Products = lazy(() => import("../Pages/Products"))
const Login = lazy(() => import("../Pages/Login"))
const Register = lazy(() => import("../Pages/Register"))
const UpdateProduct = lazy(() => import('../Pages/admin/UpdateProduct'))
const CreateProduct = lazy(() => import('../Pages/admin/CreateProduct'))
const Productdetail = lazy(() => import('../Pages/Productdetail'))
const Profile = lazy(() => import('../Pages/user/Profile'))
const UpdateProfile = lazy(() => import('../Pages/user/UpdateProfile'))
const Pagenotfound = lazy(() => import('../Pagenotfound'))
const Authwrapper = lazy(() => import('./Authwrapper'))
const Cart = lazy(() => import('../Pages/Cart'))
const Mainroutes = () => {
    const user = useSelector((state) => state.userreducer)
    const navigate = useNavigate();
    console.log(user);

    return (
        <Routes>
            <Route path='/' element={<FashionHome />} />
            <Route path='/products' element={<Products />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/admin/create-product' element={<Authwrapper> <CreateProduct /></Authwrapper>} />
            <Route path='/admin/update-product/:id' element={<Authwrapper> <UpdateProduct /> </Authwrapper>} />

            <Route path='/user-profile' element={<Authwrapper> <Profile /> </Authwrapper>} >
                <Route path='update-profile/:id' element={<Authwrapper> <UpdateProfile /> </Authwrapper>} />
            </Route>
            <Route path='/cart' element={<Authwrapper> <Cart /> </Authwrapper>} />



            <Route path='/product/:id' element={<Productdetail />} />

            <Route path='*' element={<Pagenotfound />} />




        </Routes>
    )
}

export default Mainroutes