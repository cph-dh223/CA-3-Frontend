import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoutes({isLoggedIn, children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])
    if (isLoggedIn) return (<>{children}</>);
}

export default ProtectedRoutes;

ProtectedRoutes.protoTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool
}