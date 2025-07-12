import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { getAuth } from 'firebase/auth'; // Add this

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (user?.email) {
        try {
          const auth = getAuth(); // Get Firebase auth instance
          const token = await auth.currentUser.getIdToken(); // 🔑 Get Firebase JWT

          const res = await axios.get(`https://food-loop-server-nu.vercel.app/requests/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setMyRequests(res.data);
        } catch (err) {
          console.error("Error fetching requests:", err);
        }
      }
    };

    fetchRequests();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">My Requested Foods</h2>
      {myRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myRequests.map(item => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <figure><img src={item.foodImage} alt={item.foodName} className='h-50 w-1/2 object-cover rounded-2xl'/></figure>
              <div className="card-body">
                <h2 className="card-title justify-center">{item.foodName}</h2>
                <p><strong>Pickup:</strong> {item.pickupLocation}</p>
                <p><strong>Expires:</strong> {item.expiredDateTime}</p>
                <p><strong>Request Date:</strong> {item.requestDate}</p>
                <p><strong>Donor:</strong> {item.donorName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;

