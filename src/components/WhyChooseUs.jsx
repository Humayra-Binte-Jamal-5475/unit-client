import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    { title: "Secure Payments", desc: "Pay rent online with Stripe integration.", icon: "💳" },
    { title: "Community Announcements", desc: "Stay updated with building news.", icon: "📢" },
    { title: "Easy Agreements", desc: "Apply & track your agreements seamlessly.", icon: "📝" },
    { title: "Member Benefits", desc: "Exclusive discounts & coupon system.", icon: "🎁" },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#334155] mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className="card bg-white shadow-lg p-6 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
