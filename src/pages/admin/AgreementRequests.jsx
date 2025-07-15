import { useEffect, useState } from "react";
import axios from "axios";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/agreements?status=pending")
      .then(res => setRequests(res.data));
  }, []);

  const handleAction = async (id, action) => {
    await axios.patch(`http://localhost:3000/agreements/${id}`, {
      status: "checked",
      promote: action === "accept"
    });
    setRequests(requests.filter(r => r._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Agreement Requests</h2>
      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th>User</th><th>Email</th><th>Floor</th><th>Block</th><th>Room</th><th>Rent</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r._id}>
              <td>{r.userName}</td>
              <td>{r.userEmail}</td>
              <td>{r.floor}</td>
              <td>{r.block}</td>
              <td>{r.apartmentNo}</td>
              <td>${r.rent}</td>
              <td>
                <button onClick={() => handleAction(r._id, "accept")} className="btn btn-success btn-sm mr-2">Accept</button>
                <button onClick={() => handleAction(r._id, "reject")} className="btn btn-error btn-sm">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementRequests;
