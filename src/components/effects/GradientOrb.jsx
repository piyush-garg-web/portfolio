import { motion } from "framer-motion";

function GradientOrb({
  className = "",
  color = "bg-violet-600",
  delay = 0,
  parallaxX,
  parallaxY,
}) {
  const orbContent = (
    <motion.div
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 25, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration: 22,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      }}
      className={`
        w-full
        h-full
        rounded-full
        blur-[120px]
        opacity-30
        ${color}
      `}
    />
  );

  if (parallaxX && parallaxY) {
    return (
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className={`absolute ${className}`}
      >
        {orbContent}
      </motion.div>
    );
  }

  return (
    <div className={`absolute ${className}`}>
      {orbContent}
    </div>
  );
}

export default GradientOrb;