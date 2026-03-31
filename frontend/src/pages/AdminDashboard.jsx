import Sidebar from "../components/AdminDashboard/Admin/Sidebar";
import ComplaintsTab from "../components/AdminDashboard/Admin/Complaint";
import OrdersTab from "../components/AdminDashboard/Admin/OrderTab";
import UsersTab from "../components/AdminDashboard/Admin/Verify";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1  ml-[290px]">
        <h1 className="text-2xl font-bold mb-2 pt-4 pl-8">Admin Dashboard</h1>
        
        <div className="p-6 space-y-6">
              <ComplaintsTab/>
          <div className="flex gap-4">
            <OrdersTab />
          </div>
          <UsersTab />
        </div>
      </main>
    </div>
  );
}
