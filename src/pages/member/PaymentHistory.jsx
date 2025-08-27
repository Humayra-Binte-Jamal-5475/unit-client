import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchHistory = () =>
  axios
    .get("https://unit-app-server.vercel.app/member/payments", { headers: getAuthHeaders() })
    .then((r) => r.data);

export default function PaymentHistory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: fetchHistory,
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading payment history: {error.message}</p>;

  const payments = Array.isArray(data) ? data : data?.payments;

  if (!Array.isArray(payments) || payments.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-300 mt-6">No payment history available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Month</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Paid</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Coupon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {payments.map((p, idx) => (
              <tr
                key={p._id}
                className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}
              >
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{p.month}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">${p.rent}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{new Date(p.paidAt).toLocaleString()}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{p.couponCode ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



