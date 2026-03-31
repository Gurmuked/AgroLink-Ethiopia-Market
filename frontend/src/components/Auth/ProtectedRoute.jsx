import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Props: allowedRoles: array of roles that may access this route (optional)
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      setAuthorized(false);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid token');
      const payload = JSON.parse(atob(parts[1]));
      // Check expiry if present
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        setAuthorized(false);
        return;
      }

      // Role check using stored user (login flow stores user object in localStorage)
      const user = JSON.parse(userStr);
      if (allowedRoles && allowedRoles.length > 0) {
        if (!user || !user.user_type || !allowedRoles.includes(user.user_type)) {
          setAuthorized(false);
          return;
        }
      }

      setAuthorized(true);
    } catch (err) {
      setAuthorized(false);
    }
  }, [allowedRoles]);

  if (authorized === null) return <div className="p-4">Checking authentication…</div>;
  if (!authorized) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
