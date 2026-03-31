import React from "react";
import Sidebar from "../components/SellerDashboard/seller/Sidebar";
import StatCard from "../components/SellerDashboard/seller/StatCard";
//import RevenueChart from "../components/seller/RevenueChart";
import TopProducts from "../components/SellerDashboard/seller/TopProducts";
import RecentOrders from "../components/SellerDashboard/seller/RecentOrders";
import QuickActions from "../components/SellerDashboard/seller/QuickActions";
import { GiShoppingBag } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { BiDollar } from "react-icons/bi";

export default function SellerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 py-16">
      {/* 🧭 Sidebar on the left */}
      <Sidebar />

      {/* 🧠 Dashboard content */}
      <main className="flex-1 ml-72 ">
        <h1 className="text-2xl font-bold mb-2 pt-4 pl-8">Framer Dashboard</h1>

        {/* Top Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6 pl-8">
          <StatCard title="Total Sales" value="₦2,450,000" icon={BiDollar} change="+12.5%" positive />
          <StatCard title="Active Products" value="127" icon={GiShoppingBag} change="+8 this week" positive />
          <StatCard title="Pending Orders" value="24" icon={GoClock} change="Requires attention" positive={false} />
        </div>

        {/* Middle Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 pl-8">
          {/* <RevenueChart /> */}
          <TopProducts />
          <QuickActions />
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-3 gap-4 pl-8">
          <div className="md:col-span-2">
            <RecentOrders />
          </div>

        </div>
      </main>
    </div>
  );
}

