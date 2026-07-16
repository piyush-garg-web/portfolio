import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import Button from "../common/Button";

import ProjectGallery from "./ProjectGallery";
import ProjectTech from "./ProjectTech";
import FeatureList from "./FeatureList";
import { revealVariants, viewportConfig } from "../../utils/motion";

function ProjectCard({ project, reverse }) {
  return (
   <motion.div
     variants={revealVariants}
     initial="hidden"
     whileInView="visible"
     viewport={viewportConfig}
     className={`grid items-center gap-14 lg:grid-cols-2 ${
      reverse ? "lg:[&>*:first-child]:order-2" : ""
    }`}
  >
      <ProjectGallery
  cover={project.cover}
  gallery={project.gallery}
/>

      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400"
        >
          Featured Project
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-4xl font-black text-white"
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-3 text-lg text-violet-400"
        >
          {project.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 leading-8 text-gray-400"
        >
          {project.description}
        </motion.p>

        <FeatureList
          features={project.features}
        />

        <ProjectTech tech={project.tech} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href={project.github}>
            <FaGithub size={18} />
            GitHub
          </Button>

          <Button
            href={project.live}
            variant="secondary"
          >
            <FiExternalLink size={18} />
            Live Demo
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;