import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();

        const res = await axios.get("http://localhost:3000/agreements?status=pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch agreements:", err);
      }
    };

    fetchAgreements();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      await axios.patch(`http://localhost:3000/agreements/${id}`, {
        status: "checked",
        promote: action === "accept", // true for Accept, false for Reject
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the updated item from the list
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error("❌ Failed to update agreement:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Agreement Requests</h2>
      <table className="w-full bg-white border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">User</th>
            <th className="p-2">Email</th>
            <th className="p-2">Floor</th>
            <th className="p-2">Block</th>
            <th className="p-2">Room</th>
            <th className="p-2">Rent</th>
            <th className="p-2">Request Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r._id} className="border-t">
              <td className="p-2">{r.userName}</td>
              <td className="p-2">{r.userEmail}</td>
              <td className="p-2">{r.floor}</td>
              <td className="p-2">{r.block}</td>
              <td className="p-2">{r.apartmentNo}</td>
              <td className="p-2">${r.rent}</td>
              <td className="p-2">
                {new Date(r.requestDate || r.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleAction(r._id, "accept")}
                  className="btn btn-success btn-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(r._id, "reject")}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center text-gray-500 py-6">
                No pending agreement requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementRequests;

