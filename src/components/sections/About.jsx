import { motion } from "framer-motion";

import about from "../../data/about";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import InfoCard from "../ui/InfoCard";
import { revealVariants, staggerContainerVariants, viewportConfig, motionConfig } from "../../utils/motion";

function About() {
  // Floating particles for About section
  const particles = [
    { size: 7, delay: 0, duration: 9, x: "10%", y: "15%" },
    { size: 5, delay: 1.2, duration: 11, x: "80%", y: "25%" },
    { size: 9, delay: 2.5, duration: 13, x: "35%", y: "70%" },
    { size: 6, delay: 0.8, duration: 8, x: "75%", y: "80%" },
    { size: 8, delay: 1.8, duration: 10, x: "50%", y: "45%" },
  ];

  return (
    <Section id="about" className="relative">
      {/* Soft violet ambient glow behind left content */}
      <motion.div
        className="absolute -left-40 top-1/4 h-[350px] w-[350px] rounded-full bg-violet-600/35 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating background particles */}
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

      <SectionHeading
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
        showShimmer={true}
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-6 relative"
        >
          {about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={revealVariants}
              className="text-lg leading-8 text-gray-400"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Right */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid gap-5 sm:grid-cols-2"
        >
          {about.highlights.map((item, index) => (
            <InfoCard
              key={item.title}
              title={item.title}
              value={item.value}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </Section>
  );
}

export default About;
