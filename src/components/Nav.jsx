import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asynclogoutuser } from '../Store/action/Useraction'
import { useEffect } from 'react'
const Nav = () => {
    const dispatch = useDispatch();
    const user = useSelector((state => state.userreducer.users))

    return (
        <nav className='flex justify-center items-center gap-x-10 p-5'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            {user ? (<>{user?.isadmin && (user[0]?.isadmin || user?.isadmin) && <NavLink to="/admin/create-product">Create product</NavLink>}
                <NavLink to={`/user-profile`}>
                    <img className='w-[40px] h-[40px] rounded-[50%] ' src="https://tse4.mm.bing.net/th?id=OIP.tgmmCh4SA36j0dMT0ay9_AHaHa&pid=Api&P=0&h=220" alt="" /></NavLink>
                <NavLink to={'/cart'}> <img className='w-[40px] h-[40px]' src="https://pngimg.com/d/shopping_cart_PNG4.png" alt="" /></NavLink>
                <button onClick={() => dispatch(asynclogoutuser())} className=' duration-200 px-4 py-2   rounded-[5px] font-bold text-xs bg-[#ee6c4d]  cursor-pointer login-button'  >Logout</button>
            </>) : (<> <NavLink to="/login">Login</NavLink></>)}


        </nav>
    )
}

export default Nav