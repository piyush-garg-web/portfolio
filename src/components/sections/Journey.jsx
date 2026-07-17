import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";

import journey from "../../data/journey";

import JourneyCard from "../journey/JourneyCard";
import TimelineLine from "../journey/TimelineLine";
import { revealVariants, viewportConfig } from "../../utils/motion";

function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const particles = [
    { size: 8, delay: 0, duration: 12, x: "15%", y: "20%" },
    { size: 5, delay: 2, duration: 14, x: "85%", y: "30%" },
    { size: 9, delay: 3.5, duration: 16, x: "30%", y: "75%" },
    { size: 7, delay: 1.5, duration: 11, x: "70%", y: "85%" },
    { size: 10, delay: 2.8, duration: 13, x: "55%", y: "15%" },
    { size: 6, delay: 0.5, duration: 10, x: "20%", y: "55%" },
  ];

  return (
    <Section id="journey" className="relative overflow-hidden">
      {/* Soft violet ambient glow */}
      <motion.div
        className="absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full bg-violet-600/30 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-40 top-1/2 h-[380px] w-[380px] rounded-full bg-fuchsia-600/25 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating background particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-500/35 to-fuchsia-500/25 blur-sm pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -20, 18, 0],
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      <div ref={containerRef} className="relative z-10">
        <SectionHeading
          eyebrow="My Journey"
          title="Learning, Building & Growing"
          description="My journey from an Information Technology student to a Full Stack Developer building production-ready applications while continuously improving problem-solving skills."
          showShimmer={true}
        />

        <div className="relative mt-24">
          <TimelineLine scrollYProgress={scrollYProgress} />

          <div className="space-y-24">
            {journey.map((item, index) => (
              <motion.div
                key={item.title}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ ...viewportConfig, margin: "-100px" }}
                transition={{ delay: index * 0.15 }}
                className="relative flex items-center justify-center"
              >
                <JourneyCard
                  item={item}
                  index={index}
                  reverse={index % 2 !== 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-0" />
    </Section>
  );
}

export default Journey;
