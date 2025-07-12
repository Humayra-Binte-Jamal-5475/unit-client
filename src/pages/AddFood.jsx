import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const AddFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "",
    expiredDateTime: "",
    additionalNotes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFood = {
      ...formData,
      donorName: user?.displayName || "Unknown Donor",
      donorEmail: user?.email || "No Email",
      donorImage: user?.photoURL || "",
      status: "available"
    };

    try {
      const res = await axios.post("https://food-loop-server-nu.vercel.app/foods", newFood);

      if (res.data.insertedId) {
        Swal.fire("Food added successfully!", "", "success").then(() => {
          navigate("/available-foods");
        });
      }
    } catch (error) {
      console.error("Error adding food:", error);
      Swal.fire("Failed to add food", error.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Add Food</h2>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <input name="foodName" placeholder="Food Name" required onChange={handleChange} className="input input-bordered w-4xl" />
        <input name="foodImage" placeholder="Food Image URL" required onChange={handleChange} className="input input-bordered w-4xl" />
        <input name="foodQuantity" placeholder="Quantity (e.g., 3 large pizzas)" required onChange={handleChange} className="input input-bordered w-4xl" />
        <input name="pickupLocation" placeholder="Pickup Location" required onChange={handleChange} className="input input-bordered w-4xl" />
        <input type="datetime-local" name="expiredDateTime" required onChange={handleChange} className="input input-bordered w-4xl" />
        <textarea name="additionalNotes" placeholder="Additional Notes" onChange={handleChange} className="textarea textarea-bordered w-4xl" />
        <button type="submit" className="btn btn-success">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;


