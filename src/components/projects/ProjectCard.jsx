import { Github, ExternalLink } from "lucide-react";

import Button from "../common/Button";

import ProjectGallery from "./ProjectGallery";
import ProjectTech from "./ProjectTech";
import FeatureList from "./FeatureList";

function ProjectCard({ project }) {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-2">
      <ProjectGallery cover={project.cover} />

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          Featured Project
        </p>

        <h3 className="mt-3 text-4xl font-black text-white">
          {project.title}
        </h3>

        <p className="mt-3 text-lg text-violet-400">
          {project.subtitle}
        </p>

        <p className="mt-6 leading-8 text-gray-400">
          {project.description}
        </p>

        <FeatureList
          features={project.features}
        />

        <ProjectTech tech={project.tech} />

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={project.github}>
            <Github size={18} />
            GitHub
          </Button>

          <Button
            href={project.live}
            variant="secondary"
          >
            <ExternalLink size={18} />
            Live Demo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;