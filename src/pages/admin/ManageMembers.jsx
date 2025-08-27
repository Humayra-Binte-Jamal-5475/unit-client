import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const token = await user.getIdToken();

        const res = await axios.get(
          "https://unit-app-server.vercel.app/admin/members",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMembers(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch members:", err);
      }
    };

    fetchMembers();
  }, []);

  const handleRemove = async (id) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.patch(
        `https://unit-app-server.vercel.app/admin/members/${id}`,
        { role: "user" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      console.error("❌ Failed to update role:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Members</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-left">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {members.map((user) => (
              <tr key={user._id} className="text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-6 py-4">{user.name || "N/A"}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemove(user._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500 dark:text-gray-300">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;


