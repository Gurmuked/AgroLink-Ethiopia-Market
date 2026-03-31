const Topbar = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Search products..."
        className="border rounded-md px-3 py-1 w-1/3 focus:outline-green-600"
      />
      <div className="flex items-center gap-3">
        <img
          src="/user.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full border"
        />
        <div>
          <h4 className="text-sm font-semibold">John Doe</h4>
          <p className="text-xs text-gray-500">Premium Buyer</p>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
