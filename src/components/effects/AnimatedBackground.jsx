import { motion } from "framer-motion";

function AnimatedBackground({ parallaxX, parallaxY }) {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[#030712]" />

      {/* Slow subtle lighting shift */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 85% 65%, rgba(37, 99, 235, 0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 35% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.05) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-15 pointer-events-none"
      />

      {/* Grid */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          x: parallaxX,
          y: parallaxY,
        }}
      />
    </>
  );
}

export default AnimatedBackground;