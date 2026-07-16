import { motion } from "framer-motion";
import { useState } from "react";

function InfoCard({ title, value, ...props }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -4,
        scale: 1.02,
        borderColor: "rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-md transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] cursor-default"
      {...props}
    >
      {/* Glass reflection sheen sweep */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={hovered ? { x: "150%" } : { x: "-150%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12"
      />

      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {value}
      </h3>
    </motion.div>
  );
}

export default InfoCard;