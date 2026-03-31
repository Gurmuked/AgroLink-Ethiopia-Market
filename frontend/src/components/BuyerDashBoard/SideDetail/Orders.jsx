import React from 'react';
import OrderList from '../buyers/OrderList';

const Orders = () => {
  const orders = [
    { id: 1, name: 'Organic Vegetables', seller: 'Green Valley Farm', price: 45.99, status: 'Delivered' },
    { id: 2, name: 'Handwoven Textiles', seller: 'Local Artisans Guild', price: 65.0, status: 'Shipped' },
    { id: 3, name: 'Premium Coffee Beans', seller: 'Mountain Roasters', price: 32.99, status: 'Pending' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
