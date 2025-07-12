import React, { useContext, useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const FoodDetails = () => {
  const food = useLoaderData();
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    additionalNotes,
    donorName,
    donorEmail,
    status
  } = food;

  const isExpired = new Date(expiredDateTime) < new Date();
  const requestDate = new Date().toISOString();
  const [isLoading, setIsLoading] = useState(false);
  const handleRequest = async () => {
  setIsLoading(true);

  try {
    if (!user) throw new Error("User not logged in");

    // Get Firebase ID token from the current user
    const idToken = await user.getIdToken();

    const requestData = {
      foodId: _id,
      foodName,
      foodImage,
      donorEmail,
      donorName,
      userEmail: user.email,
      requestDate,
      pickupLocation,
      expiredDateTime,
      additionalNotes: notes,
    };

    // Send token in Authorization header
    await axios.post('https://food-loop-server-nu.vercel.app/requests', requestData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    await axios.patch(`https://food-loop-server-nu.vercel.app/foods/${_id}`, { status: 'requested' });
    Swal.fire('Food Requested!', '', 'success');
    document.getElementById('request_modal').checked = false;
    navigate('/my-requests');
  } catch (err) {
    console.error(err);
    Swal.fire('Something went wrong', err.message, 'error');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={foodImage} alt={foodName} className="w-full rounded-xl shadow-lg mb-6" />

      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">{foodName}</h1>
        <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {foodQuantity}</p>
        <p className="text-gray-600 mb-1"><strong>Pickup Location:</strong> {pickupLocation}</p>
        <p className="text-gray-600 mb-1"><strong>Expires At:</strong> {expiredDateTime}</p>
        <p className="text-gray-600 mb-1"><strong>Status:</strong>
          <span className={`ml-1 font-semibold ${status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </span>
        </p>
        <p className="text-gray-700 mt-4"><strong>Additional Notes:</strong> {additionalNotes || "None"}</p>
      </div>

      <div className="mt-6">
        {!isExpired && status === 'available' && (
          <label htmlFor="request_modal" className="btn btn-success">Request</label>
        )}
        {isExpired && (
          <p className="text-red-500 font-semibold">This food item has expired.</p>
        )}
      </div>

      {/* Modal toggle */}
      <input type="checkbox" id="request_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-2xl">
          <h3 className="text-xl font-bold mb-4 text-green-600">Request Food</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Food Name</label>
              <input disabled value={foodName} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Food ID</label>
              <input disabled value={_id} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Food Image</label>
              <input disabled value={foodImage} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Donor Name</label>
              <input disabled value={donorName} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Donor Email</label>
              <input disabled value={donorEmail} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Your Email</label>
              <input disabled value={user?.email} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Pickup Location</label>
              <input disabled value={pickupLocation} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Expire Date</label>
              <input disabled value={expiredDateTime} className="input input-bordered w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="label font-medium">Request Date</label>
              <input disabled value={requestDate} className="input input-bordered w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="label font-medium">Additional Notes</label>
              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="request_modal" className="btn">Cancel</label>
            <button disabled={isLoading} onClick={handleRequest} className="btn btn-success">
  {isLoading ? "Requesting..." : "Request"}
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;


