import { useEffect, useState } from "react";
import axios from "axios";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users?role=member")
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRemove = async (id) => {
    await axios.patch(`http://localhost:3000/users/${id}`, { role: "user" });
    setMembers(members.filter(m => m._id !== id));
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
          {members.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleRemove(user._id)} className="btn btn-sm bg-red-500 text-white">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMembers;
