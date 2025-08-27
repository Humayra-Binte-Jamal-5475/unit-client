import { useEffect, useState } from "react";
import axios from "axios";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", description: "" });

  const fetchCoupons = async () => {
    const res = await axios.get("https://unit-app-server.vercel.app/coupons");
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://unit-app-server.vercel.app/coupons",
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setForm({ code: "", discount: "", description: "" });
      setModalOpen(false);
      fetchCoupons();
    } catch (err) {
      console.error("❌ Coupon submit failed:", err.response?.data || err.message);
      alert("Submit failed! Are you logged in as admin?");
    }
  };

  const toggleAvailability = async (id) => {
    try {
      await axios.patch(
        `https://unit-app-server.vercel.app/coupons/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchCoupons();
    } catch (err) {
      alert("Toggle failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center md:text-left">Manage Coupons</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary"
        >
          Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr className="text-center">
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Discount (%)</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Available</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {coupons.map((c) => (
              <tr key={c._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-2">{c.code}</td>
                <td className="px-4 py-2">{c.discount}</td>
                <td className="px-4 py-2">{c.description}</td>
                <td className="px-4 py-2">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className={`px-4 py-2 font-medium ${c.available ? "text-green-600" : "text-red-600"}`}>
                  {c.available ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => toggleAvailability(c._id)}
                  >
                    {c.available ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500 dark:text-gray-300">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-96 space-y-4 relative shadow-lg">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-3 top-2 text-lg hover:text-gray-500 dark:hover:text-gray-300"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold">Add New Coupon</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Coupon Code"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
              />
              <input
                type="number"
                required
                placeholder="Discount %"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <button type="submit" className="btn btn-success w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;




