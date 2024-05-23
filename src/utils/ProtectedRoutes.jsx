import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoutes({isLoggedIn}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])
    if (isLoggedIn) return (<Outlet/>);
    else{
        return null;
    }
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {

    isLoggedIn: PropTypes.bool
}