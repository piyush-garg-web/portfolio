import { motion } from "framer-motion";
import { useState } from "react";
import { revealVariants, motionConfig } from "../../utils/motion";

function InfoCard({ title, value, ...props }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={revealVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: motionConfig.hoverLiftSmall,
        scale: motionConfig.hoverScale,
        borderColor: "rgba(139, 92, 246, 0.3)",
        backgroundColor: "rgba(139, 92, 246, 0.05)",
        boxShadow: "0 12px 24px rgba(124, 58, 237, 0.1)",
      }}
      transition={{
        duration: motionConfig.normal,
        ease: motionConfig.ease,
      }}
      className="interactive-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-md transition-shadow duration-300 cursor-default"
      {...props}
    >
      {/* Glass reflection sheen sweep */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={hovered ? { x: "150%" } : { x: "-150%" }}
        transition={{ duration: 0.9, ease: motionConfig.ease }}
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