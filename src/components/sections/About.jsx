import { motion } from "framer-motion";

import about from "../../data/about";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import InfoCard from "../ui/InfoCard";
import { revealVariants, staggerContainerVariants, viewportConfig } from "../../utils/motion";

function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-6"
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
          {about.highlights.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              value={item.value}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

export default About;