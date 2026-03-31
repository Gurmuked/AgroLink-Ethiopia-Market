import React from 'react';

const Reviews = () => {
  const reviews = [
    { id: 1, product: 'Fresh Fruit Basket', rating: 5, note: 'Excellent quality' },
    { id: 2, product: 'Pure Honey Collection', rating: 4, note: 'Tastes great' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="border rounded p-3">
              <div className="font-medium">{r.product} — {r.rating} ⭐</div>
              <div className="text-sm text-gray-600">{r.note}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
