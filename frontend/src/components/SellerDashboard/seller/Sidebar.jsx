import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  CreditCard,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const SellerSidebar = () => {
  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/seller-dashboard" },
    { name: "Manage Products", icon: <Package size={18} />, path: "/seller-dashboard/products" },
    { name: "Add Product", icon: <PlusCircle size={18} />, path: "/seller-dashboard/add-product" },
    { name: "Orders", icon: <ShoppingCart size={18} />, path: "/seller-dashboard/orders" },
    { name: "Transactions", icon: <CreditCard size={18} />, path: "/seller/transactions" },
    { name: "Profile", icon: <User size={18} />, path: "/seller/profile" },
    { name: "Settings", icon: <Settings size={18} />, path: "/seller/settings" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-5 flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 overflow-y-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center text-white font-bold">
          AG
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">AgriMarket</h1>
          <p className="text-xs text-gray-500">Seller Portal</p>
        </div>
      </div>

        <ul className="space-y-3">
          {menu.map((item) => (
            <li
              key={item.name}
              className= "flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 cursor-pointer"
            >
              <Link to={item.path} className="flex items-center gap-3 w-full">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

      <button className="flex items-center gap-3 text-red-600 mt-auto px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default SellerSidebar;
