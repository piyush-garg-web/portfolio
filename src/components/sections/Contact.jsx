import { motion } from "framer-motion";

import Section from "../layout/Section";
import ContactCard from "../contact/ContactCard";
import { revealVariants, viewportConfig } from "../../utils/motion";

function Contact() {
  // Floating particles for Contact section
  const particles = [
    { size: 7, delay: 0, duration: 8, x: "15%", y: "20%" },
    { size: 5, delay: 1.2, duration: 10, x: "85%", y: "30%" },
    { size: 8, delay: 2.3, duration: 12, x: "30%", y: "75%" },
  ];

  return (
    <Section id="contact" className="relative">
      {/* Soft violet ambient glow behind content */}
      <motion.div
        className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/35 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles in the background */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/30 blur-sm pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -25, 20, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <ContactCard />
      </motion.div>

      {/* Gradient transition into Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </Section>
  );
}

export default Contact;
