import { useState } from "react";
import axios from "axios";

const MakeAnnouncement = () => {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/announcements", {
      ...form,
      date: new Date()
    });
    setForm({ title: "", description: "" });
    alert("Announcement posted!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Make Announcement</h2>
      <input type="text" placeholder="Title" required value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input input-bordered w-full"
      />
      <textarea placeholder="Description" required value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="textarea textarea-bordered w-full"
      />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default MakeAnnouncement;
