
export default function OrdersTab() {
  const orders = [
    { id: "ORD12345", buyer: "Abebe", seller: "Mekdes", total: "5000 ETB", status: "holding" },
    { id: "ORD67890", buyer: "Teshome", seller: "Alemu", total: "3200 ETB", status: "released" },
  ];

  return (
    <div className="bg-white p-5 mt-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Order Overview</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Order ID</th>
              <th className="p-2">Buyer</th>
              <th className="p-2">Seller</th>
              <th className="p-2">Total</th>
              <th className="p-2">Escrow Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.buyer}</td>
                <td className="p-2">{order.seller}</td>
                <td className="p-2">{order.total}</td>
                <td className="p-2 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
