import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/*
  ApartmentsPage (client‑side pagination)
  --------------------------------------
  • Fetches ALL apartments from Express `/apartments` (optionally rent‑filtered)
  • Paginates locally: 6 items per page
  • Uses Mongo `_id` instead of custom id
*/

const LIMIT = 6;

const ApartmentsPage = () => {
  const [apartments, setApartments] = useState([]);   // full dataset
  const [page, setPage]             = useState(1);    // 1‑based page index
  const [minRent, setMinRent]       = useState("");
  const [maxRent, setMaxRent]       = useState("");
  const [loading, setLoading]       = useState(false);

  const [user, setUser] = useState(null);
  const navigate        = useNavigate();

  /* ---------- Firebase auth watcher ---------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), setUser);
    return unsub;
  }, []);

  /* ---------- Fetch apartments whenever filters change ---------- */
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (minRent) params.append("min", minRent);
        if (maxRent) params.append("max", maxRent);

        const res = await fetch(`http://localhost:3000/apartments?${params}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setApartments(data);
        setPage(1);                 // reset to first page each search
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [minRent, maxRent]);

  /* ---------- Apply for agreement ---------- */
  const applyForAgreement = async (aptId) => {
    if (!user) return navigate("/auth/login");
    try {
      const token = await user.getIdToken();
      const res   = await fetch("http://localhost:3000/agreements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ aptId }),
      });
      if (!res.ok) throw new Error("Request failed");
      alert("Agreement request submitted! (status: pending)");
    } catch (err) {
      alert(err.message);
    }
  };

  /* ---------- Client‑side pagination helpers ---------- */
  const startIdx            = (page - 1) * LIMIT;
  const displayedApartments = apartments.slice(startIdx, startIdx + LIMIT);
  const hasNext             = startIdx + LIMIT < apartments.length;

  /* ---------- UI ---------- */
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Search */}
      <div className="flex flex-wrap gap-4 items-end mb-8">
        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="input input-bordered w-32"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="input input-bordered w-32"
        />
        <button className="btn btn-primary" onClick={() => {/* fetch re‑runs via deps */}}>
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : displayedApartments.length === 0 ? (
        <p className="text-center">No apartments found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {displayedApartments.map((apt) => (
            <div key={apt._id} className="card shadow-lg">
              <img
                src={apt.image}
                alt={apt.apartmentNo}
                className="h-40 w-full object-cover"
              />
              <div className="card-body">
                <h3 className="font-bold text-lg mb-1">
                  {apt.block} — Apt {apt.apartmentNo}
                </h3>
                <p>Floor {apt.floor}</p>
                <p className="font-semibold">৳ {apt.rent}</p>
                <button
                  className="btn btn-accent mt-2"
                  onClick={() => applyForAgreement(apt._id)}
                >
                  Agreement
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}

    </main>
  );
};

export default ApartmentsPage;




