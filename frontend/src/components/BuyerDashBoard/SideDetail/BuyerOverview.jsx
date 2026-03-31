import React from 'react';
import StatCard from '../buyers/StatCard';
import OrderList from '../buyers/OrderList';
import RecommendedProducts from '../buyers/RecommendedProducts';
import { MdAddShoppingCart } from 'react-icons/md';
import { CgDollar } from 'react-icons/cg';
import { CiClock2 } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';

const BuyerOverview = () => {
  const stats = [
    { title: 'Total Orders', value: '127', icon: <MdAddShoppingCart />, color: 'blue' },
    { title: 'Wallet Balance', value: '$2,840', icon: <CgDollar />, color: 'green' },
    { title: 'Pending Orders', value: '8', icon: <CiClock2 />, color: 'yellow' },
    { title: 'Saved Items', value: '24', icon: <CiHeart />, color: 'red' },
  ];

  const orders = [
    { id: 1, name: 'Organic Vegetables', seller: 'Green Valley Farm', price: 45.99, status: 'Delivered' },
    { id: 2, name: 'Handwoven Textiles', seller: 'Local Artisans Guild', price: 65.0, status: 'Shipped' },
    { id: 3, name: 'Premium Coffee Beans', seller: 'Mountain Roasters', price: 32.99, status: 'Pending' },
  ];

  const products = [
    { id: 1, name: 'Fresh Fruit Basket', price: 29.99, seller: 'Organic Farm Direct', image: '/fruit.jpg' },
    { id: 2, name: 'Handwoven Textiles', price: 65, seller: 'Local Artisans', image: '/textiles.jpg' },
    { id: 3, name: 'Pure Honey Collection', price: 38.5, seller: 'Beekeepers Association', image: '/honey.jpg' },
    { id: 4, name: 'Wooden Furniture', price: 245, seller: 'Craft Workshop', image: '/furniture.jpg' },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-2 pt-4 pl-8">Trader Dashboard</h1>
      <div className="p-6 space-y-6 flex gap-4">
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <OrderList orders={orders} />
          </div>
          <RecommendedProducts products={products} />
        </div>
      </div>
    </>
  );
};

export default BuyerOverview;
