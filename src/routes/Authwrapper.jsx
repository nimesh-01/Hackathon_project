import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const Authwrapper = (props) => {
    
        const user = useSelector((state => state.userreducer.users))
        console.log(user);
    
        return user && props.children 
    
}

export default Authwrapper