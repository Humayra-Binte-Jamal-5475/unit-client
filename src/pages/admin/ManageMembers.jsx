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

        const res = await axios.get("http://localhost:3000/admin/members", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
        `http://localhost:3000/admin/members/${id}`,
        { role: "user" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the user from local list
      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      console.error("❌ Failed to update role:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Members</h2>
      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((user) => (
            <tr key={user._id}>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleRemove(user._id)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMembers;

