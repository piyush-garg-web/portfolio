import { motion } from "framer-motion";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../projects/ProjectCard";

import projects from "../../data/projects";

function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="PROJECTS"
        title="Featured Projects"
        description="Production-ready applications that demonstrate my ability to design, build, and deploy scalable full-stack software with modern technologies."
      />

      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={
              index % 2 === 1
                ? "lg:[&>div]:grid-flow-col-dense"
                : ""
            }
          >
            <ProjectCard
              project={project}
              reverse={index % 2 === 1}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default Projects;