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
        "https://unit-app-server.vercel.app/announcements",
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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Make Announcement</h2>
      <input
        type="text"
        placeholder="Title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input input-bordered w-full  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <textarea
        placeholder="Description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="textarea textarea-bordered w-full  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default MakeAnnouncement;

