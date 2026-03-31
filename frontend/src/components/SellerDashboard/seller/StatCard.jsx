import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";

export default function StatCard({ title, value, icon: Icon, change, positive }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? <GoArrowUpRight size={16} /> : <GoArrowDownRight size={16} />}
          {change}
        </p>
      </div>
      <div className="bg-green-100 p-3 rounded-lg">
        <Icon className="text-green-600" size={28} />
      </div>
    </div>
  );
}
