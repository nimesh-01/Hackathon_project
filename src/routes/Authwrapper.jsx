import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authwrapper = ({ children, requireAdmin = false }) => {
        const user = useSelector((state) => state.userreducer.users);
        const location = useLocation();

        if (!user) {
                // Not logged in
                return <Navigate to="/" state={{ from: location }} replace />;
        }

        if (requireAdmin && user.isadmin !== true && user.isadmin !== 'true') {

                // Logged in but not an admin
                return <Navigate to="/" state={{ from: location }} replace />;
        }

        return children;
};

export default Authwrapper;
