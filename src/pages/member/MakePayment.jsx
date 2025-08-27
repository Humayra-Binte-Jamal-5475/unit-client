import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import CheckoutForm from "./CheckoutForm";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const fetchProfile = () =>
  axios
    .get("https://unit-app-server.vercel.app/member/profile", { headers: headers() })
    .then((r) => r.data);

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
    } catch {
      setDiscount(0);
      setFinalAmount(null);
      setCouponError("Invalid coupon code");
    }
  };

  if (isLoading) return <Loading />;
  if (!pf) return <p className="text-center text-gray-500 dark:text-gray-300 mt-6">No active agreement found.</p>;

  const user = { name: pf.name, email: pf.email, photoURL: pf.photoURL };
  const agreement = { floor: pf.floor, block: pf.block, apartmentNo: pf.apartmentNo, rent: pf.rent };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white text-gray-800 dark:bg-gray-800 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Payment Details</h2>

        <div className="space-y-1">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Floor:</strong> {agreement.floor}</p>
          <p><strong>Block:</strong> {agreement.block}</p>
          <p><strong>Apartment:</strong> {agreement.apartmentNo}</p>
          <p><strong>Rent:</strong> ৳{agreement.rent}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="flex flex-col text-gray-700 dark:text-gray-200">
            <span className="font-medium">Select Month</span>
            <input
              type="month"
              required
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </label>

          <label className="flex flex-col text-gray-700 dark:text-gray-200">
            <span className="font-medium">Coupon Code</span>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!coupon}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </label>
          {couponError && <p className="text-red-500">{couponError}</p>}
          {discount > 0 && (
            <p className="text-green-500">
              ✅ Coupon applied: {discount}% off. New Rent: ৳{finalAmount}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowStripeModal(true)}
          disabled={!selectedMonth}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Pay Now
        </button>
      </div>

      {/* Stripe Modal */}
      {showStripeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-red-600 text-xl"
              onClick={() => setShowStripeModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Complete Your Payment</h2>
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





