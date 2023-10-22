import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ condition, redirectTo, children }) {
  if (condition) {
    console.log("protected routes featuring lanched routes")
    return <Navigate to={redirectTo} />;
  } 

  return children;
}

export default ProtectedRoute;