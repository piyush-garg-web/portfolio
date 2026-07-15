import { motion } from "framer-motion";

import about from "../../data/about";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import InfoCard from "../ui/InfoCard";

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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-8 text-gray-400"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
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