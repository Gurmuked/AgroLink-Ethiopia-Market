const OrderList = ({ orders }) => (
  <div className="bg-white p-4 rounded-xl shadow flex-1">
    <h3 className="font-semibold mb-3">Recent Orders</h3>
    {orders.map((o) => (
      <div
        key={o.id}
        className="flex justify-between items-center border-b py-2 text-sm"
      >
        <div>
          <p className="font-medium">{o.name}</p>
          <p className="text-gray-500">{o.seller}</p>
        </div>
        <div className="text-right">
          <p>${o.price}</p>
          <span
            className={`text-xs px-2 py-1 rounded ${
              o.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : o.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {o.status}
          </span>
        </div>
      </div>
    ))}
  </div>
);
export default OrderList;
