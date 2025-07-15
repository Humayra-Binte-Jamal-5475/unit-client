import { useEffect, useState } from "react";
import axios from "axios";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", description: "" });

  useEffect(() => {
    axios.get("http://localhost:3000/coupons").then(res => setCoupons(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/coupons", form);
    setCoupons([...coupons, form]);
    setModalOpen(false);
    setForm({ code: "", discount: "", description: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Coupons</h2>
      <button className="btn btn-primary mb-4" onClick={() => setModalOpen(true)}>Add Coupon</button>
      
      <table className="w-full bg-white border">
        <thead>
          <tr><th>Code</th><th>Discount</th><th>Description</th></tr>
        </thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>{c.discount}%</td>
              <td>{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="modal-box space-y-3">
            <input placeholder="Coupon Code" value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="input input-bordered w-full"
            />
            <input placeholder="Discount (%)" type="number" value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              className="input input-bordered w-full"
            />
            <textarea placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="textarea textarea-bordered w-full"
            />
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
