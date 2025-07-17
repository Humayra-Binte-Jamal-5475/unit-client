import { useEffect, useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

useEffect(() => {
  fetch("http://localhost:3000/announcements")
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch announcements");
      return res.json();
    })
    .then(setAnnouncements)
    .catch(console.error);
}, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      {announcements.length === 0 ?(
        <p>No announcements found.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li key={a._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold text-lg">{a.title}</h3>
              <p>{a.message}</p>
              <p className="text-sm text-gray-500">{new Date(a.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
