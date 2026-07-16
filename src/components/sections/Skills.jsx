import { motion } from "framer-motion";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import SkillCard from "../ui/SkillCard";

import skills from "../../data/skills";
import { staggerContainerVariants, viewportConfig } from "../../utils/motion";

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="SKILLS"
        title="Technologies I Work With"
        description="A collection of technologies, frameworks, databases, and tools that I use to design, develop, and deploy modern full-stack applications."
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
    </Section>
  );
}

export default Skills;