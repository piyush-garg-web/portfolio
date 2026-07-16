import { motion } from "framer-motion";

function TechChip({ children, ...props }) {
  return (
    <motion.span
      whileHover={{
        y: -3,
        scale: 1.05,
        borderColor: "rgba(139, 92, 246, 0.3)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        color: "#ffffff",
        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl cursor-default"
      {...props}
    >
      {children}
    </motion.span>
  );
}

export default TechChip;