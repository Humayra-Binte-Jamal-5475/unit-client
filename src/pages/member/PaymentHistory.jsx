import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";

// Get token from localStorage or context
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchHistory = () =>
  axios.get("https://unit-app-server.vercel.app/member/payments", { headers: getAuthHeaders() }).then((r) => r.data);

export default function PaymentHistory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: fetchHistory,
  });

  console.log("Payment data response:", data); // ✅ This will help debug

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading payment history: {error.message}</p>;

  // ✅ Make sure we're only mapping if it's an array
  const payments = Array.isArray(data) ? data : data?.payments;

  if (!Array.isArray(payments) || payments.length === 0) {
    return <p>No payment history available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Paid</th>
          <th>Date</th>
          <th>Coupon</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p._id}>
            <td>{p.month}</td>
            <td>{p.amountPaid}</td>
            <td>{new Date(p.paidAt).toLocaleString()}</td>
            <td>{p.couponCode ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


