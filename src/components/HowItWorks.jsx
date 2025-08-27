import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { text: "Browse apartments", color: "#B35648" },
    { text: "Apply for agreement", color: "#A3B18A" },
    { text: "Admin approves request", color: "#DAA49A" },
    { text: "Make secure payment", color: "#B35648" },
    { text: "Enjoy living at Unité", color: "#A3B18A" },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: i * 0.2,
              }}
              whileHover={{ scale: 1.15 }}
            >
              <div
                className="w-14 h-14 rounded-full text-white flex items-center justify-center font-bold mb-3 shadow-lg"
                style={{ backgroundColor: step.color }}
              >
                {i + 1}
              </div>
              <p className="font-medium">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;




