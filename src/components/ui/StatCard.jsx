import { motion } from "framer-motion";

function StatCard({ value, label, ...props }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.03,
        borderColor: "rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl cursor-default"
      {...props}
    >
      <h3 className="text-2xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        {label}
      </p>
    </motion.div>
  );
}

export default StatCard;