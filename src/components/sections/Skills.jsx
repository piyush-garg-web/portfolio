import { motion } from "framer-motion";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import SkillCard from "../ui/SkillCard";

import skills from "../../data/skills";
import { staggerContainerVariants, viewportConfig } from "../../utils/motion";

function Skills() {
  // Floating particles for Skills section
  const particles = [
    { size: 8, delay: 0, duration: 10, x: "15%", y: "20%" },
    { size: 6, delay: 1.5, duration: 12, x: "85%", y: "30%" },
    { size: 9, delay: 2.8, duration: 14, x: "30%", y: "75%" },
    { size: 7, delay: 1, duration: 9, x: "70%", y: "85%" },
    { size: 10, delay: 2, duration: 11, x: "55%", y: "15%" },
    { size: 5, delay: 0.5, duration: 8, x: "20%", y: "55%" },
  ];

  return (
    <Section id="skills" className="relative">
      {/* Large soft ambient glow behind heading */}
      <motion.div
        className="absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/30 blur-3xl pointer-events-none"
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
            x: [0, 30, -20, 0],
            y: [0, -30, 25, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.3, 1],
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
        eyebrow="SKILLS"
        title="Technologies I Work With"
        description="A collection of technologies, frameworks, databases, and tools that I use to design, develop, and deploy modern full-stack applications."
        showShimmer={true}
      />

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid gap-6 md:grid-cols-2"
      >
        <SkillCard
          title="Frontend"
          skills={skills.frontend}
          index={0}
        />

        <SkillCard
          title="Backend"
          skills={skills.backend}
          index={1}
        />

        <SkillCard
          title="Database"
          skills={skills.database}
          index={2}
        />

        <SkillCard
          title="AI"
          skills={skills.ai}
          index={3}
        />

        <SkillCard
          title="Tools"
          skills={skills.tools}
          index={4}
        />
      </motion.div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </Section>
  );
}

export default Skills;
