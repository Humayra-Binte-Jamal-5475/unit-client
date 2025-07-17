import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const MakeAnnouncement = () => {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.post(
        "http://localhost:3000/announcements",
        {
          title: form.title,
          content: form.description, // must match backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({ title: "", description: "" });
      alert("✅ Announcement posted!");
    } catch (err) {
      console.error("Announcement error:", err);
      alert("❌ Failed to post announcement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Make Announcement</h2>
      <input
        type="text"
        placeholder="Title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="textarea textarea-bordered w-full"
      />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default MakeAnnouncement;

