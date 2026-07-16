import { motion } from "framer-motion";

import about from "../../data/about";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import InfoCard from "../ui/InfoCard";

function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

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
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {about.highlights.map((item) => (
            <InfoCard
              key={item.title}
              variants={itemVariants}
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