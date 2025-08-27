import { useEffect, useState } from "react";
import axios from "axios";

const CouponsSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Predefined colors for the first 3 coupons
  const colors = ["#DAA49A", "#A3B18A", "#B35648"];

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("https://unit-app-server.vercel.app/coupons");
        // Limit to first 3 coupons
        setCoupons(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching coupons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-600 text-lg">Loading coupons...</div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-[#334155] mb-12">
        💳 Special Offers & Coupons
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {coupons.map((coupon, idx) => (
          <div
            key={coupon._id || idx}
            className="rounded-xl shadow-lg text-white p-6 relative overflow-hidden"
            style={{ backgroundColor: colors[idx] || "#475569" }}
          >
            <div className="text-sm uppercase tracking-wide opacity-80">
              Coupon Code
            </div>
            <h3 className="text-2xl font-bold tracking-widest my-2">{coupon.code}</h3>
            <p className="mb-4 font-medium">{coupon.description}</p>
            <span className="text-sm italic opacity-80">
              {coupon.expiry || "Limited time"}
            </span>
            <div className="absolute -bottom-5 -right-5 text-[7rem] font-bold text-white/10">
              🎁
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponsSection;






