import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  
  if (!userInfo) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
