import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { getAuth } from 'firebase/auth';  // Added import

const auth = getAuth(); // Initialize Firebase Auth

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    if (!user) return;

    try {
      const token = await auth.currentUser.getIdToken();

      const res = await axios.get(`https://food-loop-server-nu.vercel.app/requests?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(res.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const handleUpdate = async (id, currentNotes = '') => {
    const { value: newNotes } = await Swal.fire({
      title: 'Update Notes',
      input: 'textarea',
      inputLabel: 'Your new notes:',
      inputValue: currentNotes,
      showCancelButton: true,
      confirmButtonText: 'Update',
      inputPlaceholder: 'Enter new notes...',
    });

    if (newNotes && newNotes.trim()) {
      try {
        const token = await auth.currentUser.getIdToken();
        await axios.patch(
          `https://food-loop-server-nu.vercel.app/requests/${id}`,
          { additionalNotes: newNotes.trim() },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchFoods();
        Swal.fire('Updated!', 'Your request was updated.', 'success');
      } catch (error) {
        console.error('Error updating notes:', error);
        Swal.fire('Error', 'Failed to update notes.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be cancelled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = await auth.currentUser.getIdToken();
        await axios.delete(`https://food-loop-server-nu.vercel.app/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchFoods();
        Swal.fire('Cancelled!', 'The request has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting request:', error);
        Swal.fire('Error', 'Failed to delete request.', 'error');
      }
    }
  };

  useEffect(() => {
    if (user?.email) fetchFoods();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-green-700">Manage My Foods</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food._id}>
                <td>
                  <img src={food.foodImage} alt="" className="w-16 h-16 object-cover rounded" />
                </td>
                <td>{food.foodName}</td>
                <td>{food.foodQuantity}</td>
                <td>{food.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning mr-2"
                    onClick={() => handleUpdate(food._id, food.additionalNotes)}
                  >
                    Update
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(food._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {foods.length === 0 && <p className="text-center mt-4">No foods added yet.</p>}
      </div>
    </div>
  );
};

export default MyFoods;

