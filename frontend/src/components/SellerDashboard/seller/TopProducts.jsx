const products = [
  { name: "Fresh Tomatoes", sold: "246 kg", revenue: "₦89,000", change: "+15%" },
  { name: "Sweet Corn", sold: "180 kg", revenue: "₦72,000", change: "+10%" },
  { name: "Lettuce", sold: "120 bundles", revenue: "₦36,000", change: "+8%" },
  { name: "Carrots", sold: "95 kg", revenue: "₦28,500", change: "+22%" },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-gray-700 font-semibold mb-2">Top Selling Products</h3>
      <ul>
        {products.map((p, i) => (
          <li key={i} className="flex justify-between py-2 border-b border-gray-100">
            <span>{p.name}</span>
            <div className="text-right">
              <p className="text-gray-800 font-medium">{p.revenue}</p>
              <p className="text-green-500 text-sm">{p.change}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
