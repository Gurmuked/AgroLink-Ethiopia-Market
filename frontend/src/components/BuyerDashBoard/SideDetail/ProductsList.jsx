import React, { useEffect, useState } from 'react';
import ProductCard from '../buyers/ProductCard';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Browse Products</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4">
          {products.length === 0 && <p>No products available.</p>}
          {products.map((p) => (
            <ProductCard key={p._id} product={{ id: p._id, name: p.name, seller: p.seller, price: p.price, image: p.image }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
