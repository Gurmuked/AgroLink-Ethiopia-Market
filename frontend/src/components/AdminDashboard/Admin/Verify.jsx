import React, {useEffect, useState} from "react";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/verify-user/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Approve failed');
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Approve failed');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/reject-user/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Reject failed');
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Reject failed');
    }
  };

  if (loading) return <div className="p-4">Loading users…</div>;

  return (
    <div className="bg-white p-5 mt-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Pending User Verification</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Phone</th>
              <th className="p-2">ID File</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.filter(u => u.verification_status === 'pending' || u.is_verified === false).map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.username || user.name || user.email}</td>
                <td className="p-2 capitalize">{user.user_type || '—'}</td>
                <td className="p-2">{user.phone || '—'}</td>

                <td className="p-2">
                  {user.id_file ? (
                    <a href={user.id_file} target="_blank" rel="noreferrer" className="text-blue-600 underline">View File</a>
                  ) : (
                    <span className="text-gray-500">No Document</span>
                  )}
                </td>

                <td className="p-2">
                  <span className={`${user.is_verified ? 'text-green-600' : 'text-red-500'} font-bold`}>{user.verification_status || (user.is_verified ? 'approved' : 'pending')}</span>
                </td>

                <td className="p-2 space-x-2">
                  <button onClick={() => handleApprove(user._id)} className="px-3 py-1 bg-green-600 text-white rounded-lg">Approve</button>
                  <button onClick={() => handleReject(user._id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
