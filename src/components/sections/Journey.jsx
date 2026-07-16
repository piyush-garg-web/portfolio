import { motion } from "framer-motion";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";

import journey from "../../data/journey";

import JourneyCard from "../journey/JourneyCard";
import TimelineDot from "../journey/TimelineDot";
import TimelineLine from "../journey/TimelineLine";
import { revealVariants, viewportConfig } from "../../utils/motion";

function Journey() {
  return (
    <Section id="journey">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="flex flex-col items-center text-center"
      >
        <SectionHeading
          eyebrow="My Journey"
          title="Learning, Building & Growing"
          description="My journey from an Information Technology student to a Full Stack
          Developer building production-ready applications while continuously
          improving problem-solving skills."
        />
      </motion.div>

      <div className="relative mt-24">
        <TimelineLine />

        <div className="space-y-20">
          {journey.map((item, index) => (
            <motion.div
              key={item.title}
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center lg:justify-start"
            >
              {/* Timeline dot positioned to align with cards */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 lg:left-0 lg:translate-x-0">
                <TimelineDot />
              </div>

              <JourneyCard
                item={item}
                reverse={index % 2 !== 0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Journey;