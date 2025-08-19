import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // If logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
