const StatCard = ({ title, value, icon, color }) => (
  <div className={`p-4 rounded-xl shadow bg-${color}-50 flex-1`}>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
      <div className={`p-2 bg-${color}-100 rounded-full`}>{icon}</div>
    </div>
  </div>
);

export default StatCard;
