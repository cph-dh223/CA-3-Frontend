import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function ProtectedRoutes({ children, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) {
      return navigate("/login" );
    }
    else {
      console.log("navigate to /")
      return navigate("/");
    }
  }, [isLoggedIn]);

  return children;
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  isLoggedIn: PropTypes.bool,
};
