import React from 'react'
import { FaUsers, FaShoppingCart, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";


export const Sidebar = () => {


  const menu = [
    { name: "Dashboard", icon: <MdDashboard size={20} /> },
    { name: "User Approve", icon: <FaUsers size={20} /> },
    { name: "Order List", icon: <FaShoppingCart size={20} /> },
    { name: "Help Users", icon: <FaQuestionCircle size={20} /> },
  ];


  return (
     <aside className="w-72 bg-white border-r border-gray-200 h-[90vh] p-5 flex flex-col fixed">
         <div className="mb-6 flex items-center gap-3">
           <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center text-white font-bold">
             AG
           </div>
           <div>
             <h1 className="text-lg font-semibold text-gray-800">AgriMarket</h1>
             <p className="text-xs text-gray-500">Admin Portal</p>
           </div>
         </div>
         <ul className="space-y-3">
           {menu.map((item) => (
             <li
               key={item.name}
               className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 cursor-pointer"
             >
               {item.icon}
               <span>{item.name}</span>
             </li>
           ))}
         </ul>
 
       <button className="flex items-center gap-3 text-red-600 mt-auto px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50">
         <FaSignOutAlt size={18} /> Logout
       </button>
     </aside>
   );
 };
 
 export default Sidebar;
 
