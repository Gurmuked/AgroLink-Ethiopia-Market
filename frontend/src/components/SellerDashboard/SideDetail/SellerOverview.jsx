import React from 'react';
import StatCard from '../seller/StatCard';
import TopProducts from '../seller/TopProducts';
import RecentOrders from '../seller/RecentOrders';
import QuickActions from '../seller/QuickActions';
import { GiShoppingBag } from 'react-icons/gi';
import { GoClock } from 'react-icons/go';
import { BiDollar } from 'react-icons/bi';

export default function SellerOverview() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2 pt-4 pl-8">Framer Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6 pl-8">
        <StatCard title="Total Sales" value="₦2,450,000" icon={BiDollar} change="+12.5%" positive />
        <StatCard title="Active Products" value="127" icon={GiShoppingBag} change="+8 this week" positive />
        <StatCard title="Pending Orders" value="24" icon={GoClock} change="Requires attention" positive={false} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6 pl-8">
        <TopProducts />
        <QuickActions />
      </div>
      <div className="grid md:grid-cols-3 gap-4 pl-8">
        <div className="md:col-span-2">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
