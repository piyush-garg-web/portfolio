import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import TimelineDot from "./TimelineDot";
import { motionConfig, slideLeftVariants, slideRightVariants } from "../../utils/motion";

function JourneyCard({ item, reverse, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });
  const lightX = useTransform(springX, [-1, 1], [30, 70]);
  const lightY = useTransform(springY, [-1, 1], [30, 70]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      variants={reverse ? slideRightVariants : slideLeftVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="relative grid grid-cols-[32px_minmax(0,1fr)] items-center gap-4 md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] md:gap-8"
    >
      <div className={`hidden md:block ${reverse ? "order-3" : "order-1"}`} />

      <div className="relative z-10 order-1 flex h-full items-center justify-center md:order-2">
        <TimelineDot index={index} />
      </div>

      <div className={`relative order-2 ${reverse ? "md:order-1" : "md:order-3"}`}>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.15 + index * 0.05 }}
          className={`absolute top-1/2 hidden h-px w-8 md:block ${
            reverse
              ? "right-[-2rem] origin-right bg-gradient-to-l from-violet-400/70 to-transparent"
              : "left-[-2rem] origin-left bg-gradient-to-r from-violet-400/70 to-transparent"
          }`}
        />

        <motion.div
          ref={cardRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            resetMouse();
          }}
          onMouseMove={handleMouseMove}
          animate={{ y: [0, -4, 0] }}
          transition={{
            y: {
              duration: 7 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: motionConfig.hoverScale,
            borderColor: "rgba(139, 92, 246, 0.38)",
            boxShadow: "0 24px 60px rgba(88, 28, 135, 0.2), 0 12px 30px rgba(0, 0, 0, 0.18)",
          }}
          className="interactive-card gpu-layer relative overflow-hidden rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow] duration-500 md:p-8"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(139, 92, 246, 0.16), transparent 58%)`,
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              opacity: hovered ? [0.2, 0.35, 0.2] : [0.12, 0.2, 0.12],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(255,255,255,0.03) 40%, rgba(236,72,153,0.08) 100%)",
            }}
          />

          <motion.div
            initial={{ x: "-140%" }}
            animate={{ x: "140%" }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 4.5 + index * 0.4,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12"
          />

          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: hovered ? 0.9 : 0.55 }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), transparent 28%, transparent 70%, rgba(139,92,246,0.12))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 backdrop-blur-md shadow-[0_8px_24px_rgba(124,58,237,0.16)]">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                {item.year}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold leading-tight text-white md:text-[1.75rem]">
              {item.title}
            </h3>

            <p className="mt-3 text-sm font-medium tracking-[0.08em] text-violet-300/90 uppercase">
              {item.location}
            </p>

            <p className="mt-5 text-base leading-8 text-gray-300 md:text-[1.02rem]">
              {item.description}
            </p>
          </div>

          <motion.div
            className="absolute -inset-4 rounded-[2rem] bg-violet-600/18 blur-2xl pointer-events-none -z-10"
            animate={{
              opacity: hovered ? 0.45 : 0.18,
              scale: hovered ? 1.04 : 1,
            }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default JourneyCard;
