const orders = [
  { id: "ORD-001", customer: "Sarah Johnson", product: "Tomatoes", amount: "₦4,000", status: "Pending" },
  { id: "ORD-002", customer: "Mike Chen", product: "Sweet Corn", amount: "₦6,000", status: "Shipped" },
  { id: "ORD-003", customer: "Emma Davis", product: "Lettuce", amount: "₦3,500", status: "Completed" },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-gray-700 font-semibold mb-2">Recent Orders</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left py-2">Order ID</th>
            <th className="text-left">Customer</th>
            <th className="text-left">Product</th>
            <th className="text-right">Amount</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-b">
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.product}</td>
              <td className="text-right">{o.amount}</td>
              <td
                className={`text-center ${
                  o.status === "Pending"
                    ? "text-yellow-500"
                    : o.status === "Shipped"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                {o.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
