import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import ContactInfo from "./ContactInfo";
import ContactSocials from "./ContactSocials";
import ContactCTA from "./ContactCTA";

import contact from "../../data/contact";
import { motionConfig } from "../../utils/motion";

function ContactCard() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  // Cursor reactive lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const lightX = useTransform(springX, [-1, 1], [25, 75]);
  const lightY = useTransform(springY, [-1, 1], [25, 75]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      animate={{ y: [0, -6, 0] }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        },
        duration: motionConfig.normal,
        ease: motionConfig.ease,
      }}
      whileHover={{
        scale: motionConfig.hoverScale,
        borderColor: "rgba(139, 92, 246, 0.3)",
      }}
      className="interactive-card gpu-layer relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-xl shadow-black/15 transition-[border-color,box-shadow] duration-500 cursor-default"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-[-2px] rounded-3xl pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.3) 90deg, transparent 180deg, rgba(236,72,153,0.2) 270deg, transparent 360deg)",
          opacity: 0.3,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-[2px] rounded-3xl bg-black/60 pointer-events-none" />

      {/* Cursor reactive lighting */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(139, 92, 246, 0.15), transparent 60%)`,
        }}
      />

      {/* Soft moving light reflection */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 6,
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent pointer-events-none transform -skew-x-12"
      />

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/18 via-fuchsia-500/10 to-transparent blur-xl pointer-events-none"
        animate={{
          opacity: hovered ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400"
        >
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.2 }}
          className="mt-4 text-4xl font-black text-white"
        >
          Let's Build Something Amazing Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.3 }}
          className="mt-5 max-w-2xl leading-8 text-gray-400"
        >
          {contact.availability}
        </motion.p>

        <div className="mt-10">
          <ContactCTA />
        </div>

        <div className="mt-12">
          <ContactInfo />
        </div>

        <div className="mt-12">
          <ContactSocials />
        </div>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute -inset-5 rounded-[40px] bg-violet-600/20 blur-xl pointer-events-none -z-10"
        animate={{
          opacity: hovered ? 0.7 : 0,
          scale: hovered ? 1.15 : 0.9,
        }}
        transition={{
          duration: motionConfig.normal,
          ease: motionConfig.ease,
        }}
      />
    </motion.div>
  );
}

export default ContactCard;
