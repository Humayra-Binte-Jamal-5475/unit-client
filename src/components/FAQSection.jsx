import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      q: "How do I apply for an apartment?",
      a: "Browse apartments, click Agreement, and submit your request.",
    },
    {
      q: "How do payments work?",
      a: "Payments are handled securely via Stripe.",
    },
    {
      q: "What happens after my agreement is approved?",
      a: "You’ll be promoted to a Member role and can access Member Dashboard.",
    },
    {
      q: "Can I use discount coupons?",
      a: "Yes! Apply coupons at checkout when making payments.",
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-lg bg-base-100"
            >
              <div className="collapse collapse-arrow">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-lg hover:text-primary transition-colors duration-300">
                  {f.q}
                </div>
                <div className="collapse-content text-base-content/70 leading-relaxed">
                  {f.a}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

