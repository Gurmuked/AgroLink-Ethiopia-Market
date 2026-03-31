// Deprecated: dashboard UI moved to `components/BuyerDashBoard/SideDetail` + nested routes.
// This file now redirects to the canonical nested buyer route to avoid duplicated UI.
import React from 'react';
import { Navigate } from 'react-router-dom';

const BuyerDashboard = () => <Navigate to="/buyer-dashboard" replace />;

export default BuyerDashboard;
