import React, { useState } from 'react';
import Sidebar from '../seller/Sidebar';
import { useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameToSend = name;
    const priceToSend = price;
    const imageToSend = image;
    const descToSend = description;

    setLoading(true);
    setMessage('Adding product...');
    // Clear fields immediately to show responsiveness
    setName('');
    setPrice('');
    setImage('');
    setDescription('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in as a seller to add a product.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: nameToSend,
          price: Number(priceToSend),
          image: imageToSend,
          description: descToSend,
        }),
      });
      const data = await res.json();
      setMessage(data.message || 'Product added.');
      if (res.ok) {
        // Redirect to seller dashboard
        setTimeout(() => navigate('/seller-dashboard'), 900);
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 py-16">
      <Sidebar />
      <main className="flex-1 ml-72 p-6">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
          {message && <div className="mb-4 text-sm text-gray-700">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded-md" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full border p-2 rounded-md" placeholder="/images/my.jpg or https://..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded-md" rows={4} />
            </div>

            <div>
              <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellerAddProduct;
