import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const fetchProfile = () => axios.get("/member/profile", { headers }).then(r => r.data);
const fetchCoupons = () => axios.get("/coupons", { headers }).then(r => r.data);
const postPayment = (payload) => axios.post("/payments", payload, { headers }).then(r => r.data);

const MakePayment = () => {
  const { data: pf } = useQuery(["memberProfile"], fetchProfile);
  const { data: coupons } = useQuery(["coupons"], fetchCoupons);
  const mutation = useMutation(postPayment);

  const handlePay = (e) => {
    e.preventDefault();
    const amt = pf.agreement.rent;
    const cpf = e.target.coupon.value;
    mutation.mutate({
      amount: amt,
      month: e.target.month.value,
      couponCode: cpf || undefined,
    }, { onSuccess: () => alert("Payment success!") });
  };

  if (!pf?.agreement) return <p>No active agreement.</p>;

  return (
    <form onSubmit={handlePay}>
      <p>Email: {pf.user.email}</p>
      <p>Floor: {pf.agreement.floor}, Block: {pf.agreement.block}, Apartment: {pf.agreement.apartmentNo}</p>
      <p>Rent: {pf.agreement.rent}</p>
      <input type="month" name="month" required />
      <select name="coupon">
        <option value="">None</option>
        {coupons?.map(c => <option key={c._id} value={c.code}>{c.code} - {c.discount}%</option>)}
      </select>
      <button type="submit" disabled={mutation.isLoading}>Pay</button>
    </form>
  );
};
export default MakePayment;
