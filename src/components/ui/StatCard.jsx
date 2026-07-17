import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function StatCard({ value, label, delay = 0, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  
  // Parse the numeric value (handle cases like "246+")
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = numericValue / (duration / 16); // 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  // Get the suffix (like "+")
  const suffix = value.replace(/\d/g, "");

  return (
    <motion.div
  ref={ref}
  animate={{
    y: [0, -3, 0],
  }}
  transition={{
    duration: 4 + delay,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    y: -6,
    scale: 1.04,
    borderColor: "rgba(139, 92, 246, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 8px 24px rgba(124, 58, 237, 0.15)",
  }}
  whileTap={{ scale: 0.98 }}
  className="relative overflow-hidden cursor-default rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl"
  {...props}
>
      {/* Subtle glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white">
          {isInView ? count : 0}{suffix}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default StatCard;