import { CiSquarePlus } from "react-icons/ci";
import { GiBanknote } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

export default function QuickActions() {
  const actions = [
    { icon: CiSquarePlus, label: "Add Product", color: "bg-green-100 text-green-600" },
    { icon: GiBanknote, label: "Withdraw Funds", color: "bg-orange-100 text-orange-600" },
    { icon: FaUser, label: "Update Profile", color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-gray-700 font-semibold mb-3">Quick Actions</h3>
      <div className="flex flex-col gap-2">
        {actions.map((a, i) => (
          <button
            key={i}
            className={`flex items-center gap-3 ${a.color} px-3 py-2 rounded-lg hover:opacity-80 transition`}
          >
            <a.icon size={18} /> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
