import { motion } from "framer-motion";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../projects/ProjectCard";

import projects from "../../data/projects";
import { revealVariants, viewportConfig } from "../../utils/motion";

function Projects() {
  // Floating particles for Projects section
  const particles = [
    { size: 8, delay: 0, duration: 9, x: "10%", y: "15%" },
    { size: 6, delay: 1.2, duration: 11, x: "85%", y: "25%" },
    { size: 9, delay: 2.5, duration: 13, x: "35%", y: "70%" },
    { size: 7, delay: 0.8, duration: 8, x: "70%", y: "80%" },
  ];

  return (
    <Section id="projects" className="relative">
      {/* Soft violet ambient glow behind heading */}
      <motion.div
        className="absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full bg-violet-600/35 blur-3xl pointer-events-none"
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

      {/* Gentle moving spotlight behind project showcase */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-violet-600/15 via-fuchsia-600/10 to-transparent blur-3xl pointer-events-none"
        animate={{
          x: ["-45%", "-55%", "-45%"],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
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

      <SectionHeading
        eyebrow="PROJECTS"
        title="Featured Projects"
        description="Production-ready applications that demonstrate my ability to design, build, and deploy scalable full-stack software with modern technologies."
        showShimmer={true}
      />

      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: index * 0.15 }}
            className={
              index % 2 === 1
                ? "lg:[&>div]:grid-flow-col-dense"
                : ""
            }
          >
            <ProjectCard
              project={project}
              reverse={index % 2 === 1}
              index={index}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient transition into Contact section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </Section>
  );
}

export default Projects;
