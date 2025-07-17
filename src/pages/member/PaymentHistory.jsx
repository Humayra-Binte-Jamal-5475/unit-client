import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchHistory = () => axios.get("/member/payments", { headers }).then(r => r.data);

export default function PaymentHistory() {
  const { data, isLoading } = useQuery(["paymentHistory"], fetchHistory);
  if (isLoading) return <p>Loading...</p>;
  return (
    <table>
      <thead><tr><th>Month</th><th>Paid</th><th>Date</th><th>Coupon</th></tr></thead>
      <tbody>
        {data.map(p => (
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
