import React from 'react';

const Transactions = () => {
  const tx = [
    { id: 1, date: '2025-11-20', amount: 120.0, status: 'Completed' },
    { id: 2, date: '2025-11-22', amount: 45.5, status: 'Refunded' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <ul className="space-y-2">
          {tx.map((t) => (
            <li key={t.id} className="flex justify-between">
              <div>
                <div className="font-medium">Transaction #{t.id}</div>
                <div className="text-xs text-gray-500">{t.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${t.amount}</div>
                <div className="text-xs text-gray-500">{t.status}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
