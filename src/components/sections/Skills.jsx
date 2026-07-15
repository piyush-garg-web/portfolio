import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import SkillCard from "../ui/SkillCard";

import skills from "../../data/skills";

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="SKILLS"
        title="Technologies I Work With"
        description="A collection of technologies, frameworks, databases, and tools that I use to design, develop, and deploy modern full-stack applications."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SkillCard
          title="Frontend"
          skills={skills.frontend}
        />

        <SkillCard
          title="Backend"
          skills={skills.backend}
        />

        <SkillCard
          title="Database"
          skills={skills.database}
        />

        <SkillCard
          title="AI"
          skills={skills.ai}
        />

        <SkillCard
          title="Tools"
          skills={skills.tools}
        />
      </div>
    </Section>
  );
}

export default Skills;