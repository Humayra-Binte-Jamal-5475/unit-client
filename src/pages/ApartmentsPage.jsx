import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const LIMIT = 6;

const ApartmentsPage = () => {
  const [apartments, setApartments] = useState([]);
  const [page, setPage]             = useState(1);
  const [minRent, setMinRent]       = useState("");
  const [maxRent, setMaxRent]       = useState("");
  const [loading, setLoading]       = useState(false);

  const [user, setUser] = useState(null);
  const navigate        = useNavigate();

  // Watch Firebase auth state
  useEffect(() => onAuthStateChanged(getAuth(), setUser), []);

  // Fetch apartments with rent filter
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const params = {};
        if (minRent) params.min = minRent;
        if (maxRent) params.max = maxRent;

        const res = await axios.get("https://unit-app-server.vercel.app/apartments", {
          params,
          signal: ctrl.signal,
        });

        setApartments(res.data);
        setPage(1);
      } catch (e) {
        if (e.name !== "CanceledError") console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [minRent, maxRent]);

  // Apply for an apartment agreement
  const apply = async (apt) => {
    if (!user) return navigate("/auth/login");
    try {
      const token = await user.getIdToken();

      await axios.post(
        "https://unit-app-server.vercel.app/agreements",
        {
          aptId: apt._id,
          userName: user.displayName,
          userEmail: user.email,
          floor: apt.floor,
          block: apt.block,
          apartmentNo: apt.apartmentNo,
          rent: apt.rent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Agreement request submitted! (pending)");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      alert(message);
    }
  };

  // Pagination logic
  const totalPages          = Math.max(1, Math.ceil(apartments.length / LIMIT));
  const startIdx            = (page - 1) * LIMIT;
  const displayedApartments = apartments.slice(startIdx, startIdx + LIMIT);

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
        <button className="btn btn-primary">Search</button>
      </div>

      {/* Listings */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : displayedApartments.length === 0 ? (
        <p className="text-center">No apartments found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {displayedApartments.map((apt) => (
            <div key={apt._id} className="card shadow-lg">
              <img src={apt.image} alt={apt.apartmentNo} className="h-40 w-full object-cover" />
              <div className="card-body">
                <h3 className="font-bold text-lg mb-1">
                  {apt.block} — Apt {apt.apartmentNo}
                </h3>
                <p>Floor {apt.floor}</p>
                <p className="font-semibold">৳ {apt.rent}</p>
                <button className="btn btn-accent mt-2" onClick={() => apply(apt)}>
                  Agreement
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10 flex-wrap">
        <button className="btn" disabled={page === 1}          onClick={() => setPage(1)}>First</button>
        <button className="btn" disabled={page === 1}          onClick={() => setPage(p => p - 1)}>Prev</button>
        <span className="btn btn-ghost pointer-events-none">{page} / {totalPages}</span>
        <button className="btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        <button className="btn" disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</button>
      </div>
    </main>
  );
};

export default ApartmentsPage;






