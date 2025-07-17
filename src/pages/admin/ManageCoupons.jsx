import { useEffect, useState } from "react";
import axios from "axios";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", description: "" });

  useEffect(() => {
    axios.get("http://localhost:3000/coupons")
      .then(res => setCoupons(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/coupons", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setForm({ code: "", discount: "", description: "" });
      setModalOpen(false);
      const res = await axios.get("http://localhost:3000/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("❌ Coupon submit failed:", err.response?.data || err.message);
      alert("Submit failed! Are you logged in as admin?");
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Coupons</h2>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary">Add Coupon</button>
      </div>

      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th>Code</th><th>Discount (%)</th><th>Description</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>{c.discount}</td>
              <td>{c.description}</td>
              <td>{new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md w-96 space-y-4 relative">
            <button onClick={() => setModalOpen(false)} className="absolute right-3 top-2 text-lg">✖</button>
            <h3 className="text-lg font-bold">Add New Coupon</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required placeholder="Coupon Code" className="input input-bordered w-full"
                value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
              <input type="number" required placeholder="Discount %" className="input input-bordered w-full"
                value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
              <textarea placeholder="Description" className="textarea textarea-bordered w-full"
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
              <button type="submit" className="btn btn-success w-full">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;


