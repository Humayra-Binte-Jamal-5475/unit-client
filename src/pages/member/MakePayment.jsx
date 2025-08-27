import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import CheckoutForm from "./CheckoutForm";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const fetchProfile = () =>
  axios.get("https://unit-app-server.vercel.app/member/profile", { headers: headers() }).then((r) => r.data);

export default function MakePayment() {
  const { data: pf, isLoading } = useQuery({
    queryKey: ["memberProfile"],
    queryFn: fetchProfile,
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showStripeModal, setShowStripeModal] = useState(false);

  const handleApplyCoupon = async () => {
    try {
      const res = await axios.post(
        "https://unit-app-server.vercel.app/member/apply-coupon",
        { code: coupon, originalRent: pf.rent },
        { headers: headers() }
      );

      setDiscount(res.data.discount);
      setFinalAmount(res.data.finalRent);
      setCouponError("");
    } catch (err) {
      setDiscount(0);
      setFinalAmount(null);
      setCouponError("Invalid coupon code");
    }
  };

  if (isLoading) return <Loading />;
  if (!pf) return <p>No active agreement found.</p>;

  const user = {
    name: pf.name,
    email: pf.email,
    photoURL: pf.photoURL,
  };

  const agreement = {
    floor: pf.floor,
    block: pf.block,
    apartmentNo: pf.apartmentNo,
    rent: pf.rent,
  };

  return (
    <>
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Floor:</strong> {agreement.floor}</p>
        <p><strong>Block:</strong> {agreement.block}</p>
        <p><strong>Apartment:</strong> {agreement.apartmentNo}</p>
        <p><strong>Rent:</strong> ৳{agreement.rent}</p>

        <label>
          <strong>Month:</strong>
          <input
            type="month"
            name="month"
            required
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </label>

        <div className="my-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button type="button" onClick={handleApplyCoupon} disabled={!coupon}>
            Apply Coupon
          </button>
          {couponError && <p style={{ color: "red" }}>{couponError}</p>}
          {discount > 0 && (
            <p style={{ color: "green" }}>
              ✅ Coupon applied: {discount}% off. New Rent: ₹{finalAmount}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowStripeModal(true)}
          disabled={!selectedMonth}
        >
          Pay Now
        </button>
      </div>

      {/* Stripe Modal */}
      {showStripeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-red-600 text-xl"
              onClick={() => setShowStripeModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
            <CheckoutForm
              amount={finalAmount ?? pf.rent}
              month={selectedMonth}
              couponCode={discount ? coupon : null}
              discount={discount}
            />
          </div>
        </div>
      )}
    </>
  );
}




