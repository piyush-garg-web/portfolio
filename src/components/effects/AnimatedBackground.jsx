import { motion } from "framer-motion";

function AnimatedBackground({ parallaxX, parallaxY }) {
  return (
    <>
      {/* Base background */}
      <div className="absolute inset-0 -z-30 bg-[#030712]" />

      {/* Aurora gradient mesh - extremely slow movement */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(92, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 30%, rgba(124, 58, 237, 0.07) 0%, transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 30%, rgba(92, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-25 pointer-events-none"
      />

      {/* Floating blurred gradient orbs - global floating system with different timings */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[10%] top-[20%] -z-20 h-[380px] w-[380px] rounded-full bg-violet-600/07 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 52,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute right-[15%] bottom-[25%] -z-20 h-[320px] w-[320px] rounded-full bg-blue-600/05 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -18, 0],
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute left-[40%] top-[60%] -z-20 h-[280px] w-[280px] rounded-full bg-fuchsia-600/04 blur-[90px]"
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 -z-15 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid with parallax */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          x: parallaxX,
          y: parallaxY,
        }}
      />

      {/* Soft radial lighting that follows parallax */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          x: parallaxX,
          y: parallaxY,
          background: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.02) 0%, transparent 60%)",
        }}
      />
    </>
  );
}

export default AnimatedBackground;