import { motion } from "framer-motion";
import { useState } from "react";

function JourneyCard({ item, reverse }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: reverse ? 60 : -60,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full lg:w-[45%] ${
        reverse ? "lg:ml-auto" : ""
      }`}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          y: -6,
          scale: 1.015,
          borderColor: "rgba(139, 92, 246, 0.35)",
          backgroundColor: "rgba(139, 92, 246, 0.06)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(124,58,237,0.1)] cursor-default"
      >
        {/* Glass reflection sheen sweep */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={hovered ? { x: "150%" } : { x: "-150%" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -z-5 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12"
        />

        <p className="text-sm font-semibold text-violet-400">
          {item.year}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {item.title}
        </h3>

        <p className="mt-1 text-sm text-violet-300">
          {item.location}
        </p>

        <p className="mt-5 leading-7 text-gray-400">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default JourneyCard;