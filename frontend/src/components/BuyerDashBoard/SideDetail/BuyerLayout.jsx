import React from 'react';
import Sidebar from '../buyers/Sidebar';
import { Outlet } from 'react-router-dom';

const BuyerLayout = () => {
  return (
    <div className="flex min-h-screen bg-green-50 py-16">
      <Sidebar />
      <main className="flex-1 ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default BuyerLayout;
