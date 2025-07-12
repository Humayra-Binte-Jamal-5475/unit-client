const CouponsSection = () => {
  const coupons = [
    {
      code: "UNITÉ20",
      description: "Get 20% off your first month!",
      expiry: "Valid until Aug 31, 2025",
      color: "#DAA49A",
    },
    {
      code: "FREEMAINT",
      description: "Free maintenance service for 1 month",
      expiry: "Limited time offer",
      color: "#A3B18A",
    },
    {
      code: "REFER10",
      description: "Refer a friend and both get 10% off",
      expiry: "No expiry",
      color: "#B35648",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-[#334155] mb-12">
        💳 Special Offers & Coupons
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {coupons.map((coupon, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-lg text-white p-6 relative overflow-hidden"
            style={{ backgroundColor: coupon.color }}
          >
            <div className="text-sm uppercase tracking-wide opacity-80">
              Coupon Code
            </div>
            <h3 className="text-2xl font-bold tracking-widest my-2">{coupon.code}</h3>
            <p className="mb-4 font-medium">{coupon.description}</p>
            <span className="text-sm italic opacity-80">{coupon.expiry}</span>
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




